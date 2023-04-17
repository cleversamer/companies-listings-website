import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useImportRecordsExcelMutation,
  useImportRecordsPDFMutation,
} from "../../../../Features/admin/records";
import { hideLoader, showLoader } from "../../../../Features/loader";
import { closeModal } from "../../../../Features/modal";
import Button from "../../../common/button/Button";
import Modal from "../../../common/Modal/Modal";
import { notify } from "../../../../utils/responseMsg";
import "./uploadModal.css";
import { validateFiles } from "../../../../utils/validation";
import InputField from "../../../common/input/Input";

const UploadModal = ({ uploadTitle, htmlFor, fileType }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.value);
  const [importExcel] = useImportRecordsExcelMutation();
  const [importPdf] = useImportRecordsPDFMutation();
  const [files, setFiles] = useState();
  const [list, setList] = useState();
  const [drag, setDrag] = useState(false);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    setList(Array.from(files));
    setFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = () => {
    setDrag(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    setFiles(e.dataTransfer.files);
    setList(Array.from(e.dataTransfer.files));
  };

  const handleSubmit = () => {
    handleImport();
  };

  const handleImport = async () => {
    dispatch(showLoader(true));
    try {
      const formData = new FormData();
      const errors = validateFiles(files, fileType);
      if (errors) {
        notify("error", errors);
        dispatch(hideLoader());
      } else {
        for (let i = 0; i < files.length; i++)
          formData.append("file", files[i]);

        const data =
          fileType === "excel"
            ? await importExcel(formData).unwrap()
            : await importPdf(formData).unwrap();

        notify("success", data.message);

        setTimeout(() => {
          dispatch(closeModal());
          setFiles(null);
        }, 1500);

        dispatch(showLoader(false));
      }
    } catch (error) {
      notify("error", error?.response?.data?.message || error.message);
      dispatch(hideLoader());
    }
  };

  const handleContent = () => {
    if (files) {
      return (
        <>
          <div className="files">
            <ul>
              {list?.map((file, index) => {
                const fileSizeInBytes = file.size;
                const fileSizeInMB = (
                  fileSizeInBytes /
                  (1024 * 1024)
                ).toLocaleString(undefined, { maximumFractionDigits: 3 });

                return (
                  <li key={index}>
                    <div>
                      {fileType === "excel" ? (
                        <img src="images/xls.png" alt="public/xls.png" />
                      ) : (
                        <img src="images/pdf.png" alt="public/pdf.png" />
                      )}
                      <span>{file.name}</span>
                    </div>

                    <div>
                      <span>{fileSizeInMB} MB</span>
                      <img src="images/right.png" alt="images/right.png" />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="text-center mt-1">
            <Button
              type="button"
              btnClass="second-primary"
              style={{ margin: "0 10px" }}
              onClick={() => handleSubmit()}
            >
              Upload
            </Button>

            <Button
              type="button"
              btnClass="second-primary"
              onClick={() => {
                setFiles(null);
                dispatch(closeModal());
              }}
            >
              Cancel
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <InputField
          type="file"
          htmlFor={htmlFor}
          value=""
          multiple
          onChange={(e) => handleFileSelect(e)}
        >
          <div
            className={`file-choose ${drag ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <img className="img-fluid" src="images/file.png" alt="file.png" />
            <span>Choose Files or Drag and Drop</span>
          </div>
        </InputField>
      );
    }
  };

  return (
    <>
      <Modal
        width={"600px"}
        show={modal === 1}
        headerTitle={uploadTitle}
        hideClose={files && true}
      >
        {handleContent()}
      </Modal>
    </>
  );
};

export default UploadModal;

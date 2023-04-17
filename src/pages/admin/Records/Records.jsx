import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../Features/modal";
import Button from "../../../components/common/button/Button";
import UploadModal from "../../../components/admin/Record/UploadModal/UploadModal";
import Entry from "../../../components/entry/entry";
import Search from "../../../components/search/Search";
import Pagenation from "../../../components/pagenation/Pagenation";
import "./record.css";
import RecordTable from "../../../components/admin/Record/Table/RecordTable";
import { oldData } from "../../../Features/filter";
import RecordModal from "../../../components/admin/Record/recordModal/RecordModal";
import AddNew from "../../../components/common/button/AddNew";
import DeleteModal from "../../../components/deleteModal/DeleteModal";
import { Helmet } from "react-helmet-async";
import { limit } from "../../../utils/filter";
import {
  useDeleteRecordMutation,
  useGetRecordsQuery,
} from "../../../Features/admin/records";

const Records = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const [htmlFor, setHtmlFor] = useState(null);
  const [uploadTitle, setUploadTitle] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [edit, setEdit] = useState();
  const [userId, setUserId] = useState();
  const [deleteRecord] = useDeleteRecordMutation();
  // options for select entry
  const options = ["10", "20", "40", "50", "80", "100"];
  const searchOptions = ["rgn", "owner", "comp", "phas", "fg", "type", "bs"];
  const [itemSelected, setItemSelected] = useState({
    id: "",
    rgn: "",
    owner: "",
    comp: "",
    phas: "",
    type: "",
    fg: "",
    bs: "",
    bua_from: "",
    bua_to: "",
    dp_from: "",
    dp_to: "",
    ga_from: "",
    ga_to: "",
    utp_from: "",
    utp_to: "",
    ys_from: "",
    ys_to: "",
    ra_from: "",
    ra_to: "",
    dly_from: "",
    dly_to: "",
  });

  // Get All Records
  const { data, isLoading } = useGetRecordsQuery({
    page: filter.page || 1,
    limit: filter.limit || 10,
    searchBy: filter.searchBy || "",
    searchValue: filter.searchValue || "",
    orderBy: filter.orderBy || "createdAt",
    sort: filter.sort || "DESC",
  });

  useEffect(() => {
    dispatch(
      oldData({
        limit: limit || 10,
        page: 1,
        searchBy: "",
        searchValue: "",
        orderBy: "createdAt",
        sort: "DESC",
      })
    );
  }, []);

  const resetForm = () => {
    setItemSelected({
      id: "",
      rgn: "",
      owner: "",
      comp: "",
      phas: "",
      type: "",
      fg: "",
      bs: "",
      bua_from: "",
      bua_to: "",
      dp_from: "",
      dp_to: "",
      ga_from: "",
      ga_to: "",
      utp_from: "",
      utp_to: "",
      ys_from: "",
      ys_to: "",
      ra_from: "",
      ra_to: "",
      dly_from: "",
      dly_to: "",
    });
  };

  const handleUploadModal = (htmlFor, uploadTitle, type) => {
    setHtmlFor(htmlFor);
    setUploadTitle(uploadTitle);
    dispatch(openModal(1));
    setFileType(type);
  };

  return (
    <>
      <Helmet>
        <title>Records</title>
      </Helmet>

      <DeleteModal
        id={userId}
        headerTitle={"Delete Record"}
        deleteRequest={deleteRecord}
      />

      <UploadModal
        htmlFor={htmlFor}
        uploadTitle={uploadTitle}
        fileType={fileType}
      />

      <RecordModal
        edit={edit}
        itemSelected={itemSelected}
        setItemSelected={setItemSelected}
      />

      <div className="record-page mt-4 mb-3">
        <div className="container">
          <AddNew modal={2} setEdit={setEdit} resetForm={resetForm} />

          <div className="data-deta">
            <Entry options={options} />

            <Search options={searchOptions} />

            <div>
              <Button
                type="button"
                btnClass="second-primary"
                style={{ margin: "0 10px" }}
                onClick={() => {
                  handleUploadModal("file-excel", "Import Excel", "excel");
                }}
              >
                Import EXCEL
              </Button>

              <Button
                type="button"
                btnClass="second-primary"
                onClick={() => {
                  handleUploadModal("file-pdf", "Import PDF", "pdf");
                }}
              >
                Import PDF
              </Button>
            </div>
          </div>

          <RecordTable
            isLoading={isLoading}
            data={data?.records}
            itemSelected={itemSelected}
            setItemSelected={setItemSelected}
            setEdit={setEdit}
            setUserId={setUserId}
          />
          {data?.pagenation.hasPagenation && (
            <Pagenation pagenation={data?.pagenation} />
          )}
        </div>
      </div>
    </>
  );
};

export default Records;

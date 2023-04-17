import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../common/Modal/Modal";
import InputField from "../../../common/input/Input";
import Button from "../../../common/button/Button";
import "./recordModal.css";
import { hideLoader, showLoader } from "../../../../Features/loader";
import { closeModal } from "../../../../Features/modal";
import { validateRecordForm } from "../../../../utils/validation";
import { notify } from "../../../../utils/responseMsg";
import {
  useCreateRecordMutation,
  useUpdateRecordMutation,
} from "../../../../Features/admin/records";

const RecordModal = ({ itemSelected, setItemSelected, edit }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.value);
  const [createRecord] = useCreateRecordMutation();
  const [editRecord] = useUpdateRecordMutation();
  const {
    id,
    rgn,
    owner,
    comp,
    phas,
    type,
    fg,
    bs,
    bua_from,
    bua_to,
    dp_from,
    dp_to,
    ga_from,
    ga_to,
    utp_from,
    utp_to,
    ys_from,
    ys_to,
    ra_from,
    ra_to,
    dly_from,
    dly_to,
  } = itemSelected;

  const handleChange = (e) => {
    setItemSelected({ ...itemSelected, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoader(true));

    try {
      const errors = validateRecordForm(itemSelected, edit);
      if (errors) {
        notify("error", errors);
        dispatch(hideLoader());
      } else {
        if (edit) {
          var response = await editRecord({
            recordId: id,
            formdata: itemSelected,
          }).unwrap();
        } else {
          var response = await createRecord(itemSelected).unwrap();
        }

        notify("success", response.message);
        dispatch(hideLoader());
        dispatch(closeModal());
      }
    } catch (error) {
      notify("error", error?.response?.data?.message || error.message);
      dispatch(hideLoader());
    }
  };

  const resetForm = () => {
    setItemSelected({
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

  return (
    <Modal
      width="550px"
      top={true}
      headerTitle={edit ? "Edit Record" : "Add New Record"}
      show={modal === 2}
    >
      <div className="edit-record">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <InputField
              name="rgn"
              value={rgn}
              onChange={(e) => handleChange(e)}
            >
              Rgn
            </InputField>

            <InputField
              name="owner"
              value={owner}
              onChange={(e) => handleChange(e)}
            >
              Owner
            </InputField>

            <InputField
              name="comp"
              value={comp}
              onChange={(e) => handleChange(e)}
            >
              Comp
            </InputField>

            <InputField
              name="phas"
              value={phas}
              onChange={(e) => handleChange(e)}
            >
              Phas
            </InputField>

            <InputField
              name="type"
              value={type}
              onChange={(e) => handleChange(e)}
            >
              type
            </InputField>

            <InputField name="bs" value={bs} onChange={(e) => handleChange(e)}>
              Bs
            </InputField>

            <InputField name="fg" value={fg} onChange={(e) => handleChange(e)}>
              Fg
            </InputField>

            <InputField
              name="bua_from"
              value={bua_from}
              onChange={(e) => handleChange(e)}
            >
              Bua_from
            </InputField>

            <InputField
              name="bua_to"
              value={bua_to}
              onChange={(e) => handleChange(e)}
            >
              Bua_to
            </InputField>

            <InputField
              name="ga_from"
              value={ga_from}
              onChange={(e) => handleChange(e)}
            >
              Ga_from
            </InputField>

            <InputField
              name="ga_to"
              value={ga_to}
              onChange={(e) => handleChange(e)}
            >
              Ga_to
            </InputField>

            <InputField
              name="ra_from"
              value={ra_from}
              onChange={(e) => handleChange(e)}
            >
              Ra_from
            </InputField>

            <InputField
              name="ra_to"
              value={ra_to}
              onChange={(e) => handleChange(e)}
            >
              Ra_to
            </InputField>

            <InputField
              name="utp_from"
              value={utp_from}
              onChange={(e) => handleChange(e)}
            >
              UTP_from
            </InputField>

            <InputField
              name="utp_to"
              value={utp_to}
              onChange={(e) => handleChange(e)}
            >
              UTP_to
            </InputField>

            <InputField
              name="dp_from"
              value={dp_from}
              onChange={(e) => handleChange(e)}
            >
              Dp_from
            </InputField>

            <InputField
              name="dp_to"
              value={dp_to}
              onChange={(e) => handleChange(e)}
            >
              Dp_to
            </InputField>

            <InputField
              name="ys_from"
              value={ys_from}
              onChange={(e) => handleChange(e)}
            >
              Ys_from
            </InputField>

            <InputField
              name="ys_to"
              value={ys_to}
              onChange={(e) => handleChange(e)}
            >
              Ys_to
            </InputField>

            <InputField
              name="dly_from"
              value={dly_from}
              onChange={(e) => handleChange(e)}
            >
              dly_from
            </InputField>

            <InputField
              name="dly_to"
              value={dly_to}
              onChange={(e) => handleChange(e)}
            >
              dly_to
            </InputField>
          </div>

          <div className="text-center mt-2 mb-1">
            <Button
              type={"submit"}
              btnClass="second-primary"
              style={{ margin: "0 15px" }}
            >
              Save
            </Button>

            <Button type={"button"} btnClass="cancel-btn" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RecordModal;

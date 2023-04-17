import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../common/Modal/Modal";
import InputField from "../../../common/input/Input";
import Button from "../../../common/button/Button";
import { closeModal } from "../../../../Features/modal";
import { notify } from "../../../../utils/responseMsg";
import { validateCountryForm } from "../../../../utils/validation";
import { hideLoader, showLoader } from "../../../../Features/loader";
import {
  useCreateCountryMutation,
  useEditCountryMutation,
} from "../../../../Features/admin/Country";

const CountryModal = ({ formData, setFormData, edit }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.value);
  const [createCountry] = useCreateCountryMutation();
  const [editCountry] = useEditCountryMutation();
  const { id, name } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleSubmit = async () => {
    dispatch(showLoader(true));

    try {
      const errors = validateCountryForm(formData);
      if (errors) {
        notify("errors", message);
      }

      if (edit) {
        var { message } = await editCountry({
          userId: id,
          form: formData,
        }).unwrap();
      } else {
        var { message } = await createCountry(formData).unwrap();
      }

      notify("success", message);

      setTimeout(() => {
        dispatch(closeModal());
      }, 300);

      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      notify("error", error?.response?.data?.message || error.message);
    }
  };

  return (
    <Modal
      width="400px"
      headerTitle={edit ? "Edit Country" : "Add New Country"}
      show={modal == 1}
    >
      <form>
        <InputField
          defaultValue={name}
          style={{ padding: "8px", marginTop: "10px" }}
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
        >
          Name
        </InputField>

        <div className="text-center" style={{ padding: "10px 0" }}>
          <Button
            type={"button"}
            btnClass="second-primary"
            style={{ margin: "0 10px" }}
            onClick={handleSubmit}
          >
            Save
          </Button>

          <Button
            type="button"
            btnClass="cancel-btn"
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CountryModal;

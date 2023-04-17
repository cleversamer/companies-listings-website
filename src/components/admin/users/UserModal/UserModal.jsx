import { useDispatch, useSelector } from "react-redux";
import InputField from "../../../common/input/Input";
import Modal from "../../../common/Modal/Modal";
import Button from "../../../common/button/Button";
import Countries from "../Countries/Countries";
import { notify } from "../../../../utils/responseMsg";
import { hideLoader, showLoader } from "../../../../Features/loader";
import { validateUserForm } from "../../../../utils/validation";
import { closeModal } from "../../../../Features/modal";
import { formatDate } from "../../../../utils/date";
import "./userModal.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  useCreateUserMutation,
  useEditUserMutation,
} from "../../../../Features/admin/users";

const UserModal = ({ edit, formData, setFormData }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.value);
  const [createUser] = useCreateUserMutation();
  const [editUser] = useEditUserMutation();
  const { id, user_name, company_name, expire_date, expire_message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "role" && e.target.value === "user") {
      setShowUserForm(true);
    } else if (e.target.name === "role" && e.target.value === "admin") {
      setShowUserForm(false);
    }
  };

  const handleSubmit = async (e) => {
    dispatch(showLoader(true));

    try {
      e.preventDefault();
      const errors = validateUserForm(formData, edit);
      if (errors) {
        notify("error", errors);
        dispatch(hideLoader());
      } else {
        if (edit) {
          var response = await editUser({
            userId: id,
            formData: {
              user_name: formData.user_name,
              company_name: formData.company_name,
              whats_app: formData.whats_app,
              countries: formData.countries,
              verify_date: formData.verify_date,
              is_active: formData.is_active,
              expire_date: formData.expire_date,
              expire_message: formData.expire_message,
            },
          }).unwrap();
        } else {
          var response = await createUser(formData).unwrap();
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
    setFormData({
      id: "",
      user_name: "",
      whats_app: "",
      company_name: "",
      expire_date: "",
      expire_message: "",
    });

    setShowUserForm(true);
  };

  return (
    <Modal
      top={"30px"}
      width={"500px"}
      headerTitle={edit ? "edit User" : "Add New User"}
      show={modal === 1}
    >
      <div className="user-form">
        <form onSubmit={handleSubmit}>
          <InputField
            value={user_name}
            type="text"
            name="user_name"
            onChange={(e) => handleChange(e)}
          >
            UserName
          </InputField>

          <div className="phone-info">
            <label htmlFor="whatsapp-input">WhatsApp</label>

            <PhoneInput
              country={"eg"}
              value={formData.whats_app}
              onChange={(e) => setFormData({ ...formData, whats_app: e })}
            />
          </div>

          <InputField
            value={company_name}
            type="text"
            name="company_name"
            onChange={(e) => handleChange(e)}
          >
            Company Name
          </InputField>

          <div>
            <label>Countries</label>

            <Countries
              formData={formData}
              setFormData={setFormData}
              edit={edit}
            />
          </div>

          <InputField
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
          >
            {edit ? "New Password" : "Password"}
          </InputField>

          <>
            <InputField
              value={formatDate(expire_date)}
              type="date"
              name="expire_date"
              onChange={(e) => handleChange(e)}
            >
              Expired Date
            </InputField>

            <InputField
              value={expire_message}
              type="text"
              name="expire_message"
              onChange={(e) => handleChange(e)}
            >
              Expire Message
            </InputField>
          </>

          <div className="text-center mt-2">
            <Button
              btnClass="second-primary"
              type="submit"
              style={{ margin: "0 10px" }}
            >
              Save
            </Button>

            <Button btnClass={"cancel-btn"} type="Reset" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UserModal;

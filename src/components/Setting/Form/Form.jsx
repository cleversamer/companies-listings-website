import { useState } from "react";
import InputField from "../../../components/common/input/Input";
import Button from "../../../components/common/button/Button";
import { hideLoader, showLoader } from "../../../Features/loader";
import { notify } from "../../../utils/responseMsg";
import { validateUpdatePasswordForm } from "../../../utils/validation";
import { useUpdatePasswordMutation } from "../../../Features/setting";
import { useDispatch } from "react-redux";
import "./form.css";

const Form = () => {
  const dispatch = useDispatch();
  const [updatePassword] = useUpdatePasswordMutation();
  const [formData, setFormData] = useState({
    password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    dispatch(showLoader(true));

    try {
      e.preventDefault();

      const errors = validateUpdatePasswordForm(formData);

      if (errors) {
        notify("error", errors);
      } else {
        const data = await updatePassword(formData).unwrap();
        notify("success", data.message);
      }

      dispatch(hideLoader());
      setFormData({
        password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      if (error.status === 401) {
        localStorage.clear();
        return (window.location.href = "/auth/sign");
      }

      notify("error", error.data.message);
      dispatch(hideLoader());
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <InputField
          type="password"
          name="password"
          value={formData.password}
          handleChange={handleChange}
        >
          old Password
        </InputField>

        <InputField
          type="password"
          name="new_password"
          value={formData.new_password}
          handleChange={handleChange}
        >
          new Password
        </InputField>

        <InputField
          type="password"
          name="confirm_password"
          value={formData.confirm_password}
          handleChange={handleChange}
        >
          confirm New Password
        </InputField>

        <div className="text-center">
          <Button type="submit" btnClass={"second-primary"}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;

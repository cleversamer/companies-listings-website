import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../Features/modal.js";
import { hideLoader, showLoader } from "../../../Features/loader";
import { validateResetPasswordForm } from "../../../utils/validation";
import Button from "../../common/button/Button";
import InputField from "../../common/input/Input";
import { notify } from "../../../utils/responseMsg";
import { resetPassword } from "../../../api/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ResetPassword = ({ setHeaderTitle, setReset }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    whats_app: "",
    code: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();

      const errors = validateResetPasswordForm(formData);

      if (errors) {
        notify("error", errors);
      } else {
        dispatch(showLoader(true));
        const { data } = await resetPassword(formData);
        notify("success", data.message);

        dispatch(hideLoader());

        setTimeout(() => {
          dispatch(closeModal());
          setReset(false);
        }, 1500);
      }
    } catch (error) {
      dispatch(showLoader(true));
      notify("error", error?.response?.data?.message || error.message);
      dispatch(hideLoader());
    }
  };

  return (
    <form action="post" onSubmit={handleResetPassword}>
      <div className="phone-info">
        <label htmlFor="whatsapp-input">WhatsApp</label>

        <PhoneInput
          country={"eg"}
          value={formData.whats_app}
          onChange={(e) => setFormData({ ...formData, whats_app: e })}
        />
      </div>

      <InputField
        type="text"
        name="code"
        placeholder={"code here"}
        onChange={(e) => handleChange(e)}
      >
        Code
      </InputField>

      <InputField
        type="password"
        name="password"
        placeholder={"new Password"}
        onChange={(e) => handleChange(e)}
      >
        new Password
      </InputField>

      <InputField
        type="password"
        name="confirm_password"
        placeholder={"confirm new Password"}
        onChange={(e) => handleChange(e)}
      >
        confirm new Password
      </InputField>

      <div className="text-center">
        <Button type={"submit"} btnClass={"second-primary"}>
          send
        </Button>
        <Button
          style={{ margin: "0 10px" }}
          type={"button"}
          btnClass="second-primary"
          onClick={() => {
            setHeaderTitle("Forget Password");
            setReset(false);
          }}
        >
          Back
        </Button>
      </div>
    </form>
  );
};

export default ResetPassword;

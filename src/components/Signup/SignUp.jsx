import { useState } from "react";
import { useDispatch } from "react-redux";
import InputField from "../common/input/Input";
import Button from "../common/button/Button";
import { hideLoader, showLoader } from "../../Features/loader";
import { validateSignupForm } from "../../utils/validation";
import { notify } from "../../utils/responseMsg";
import { signup } from "../../api/auth";
import "./signup.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SignUp = ({ setActive }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    user_name: "",
    whats_app: "",
    company_name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const errors = validateSignupForm(formData);

      if (errors) {
        notify("error", errors);
      } else {
        dispatch(showLoader(true));
        const { data } = await signup(formData);
        notify("success", data.message);
        dispatch(hideLoader());
        setActive(1);
        setFormData({
          user_name: "",
          whats_app: "",
          company_name: "",
          password: "",
        });
      }
    } catch (error) {
      dispatch(showLoader(true));
      notify("error", error?.response?.data?.message || error.message);
      dispatch(hideLoader());
    }
  };

  return (
    <div className="Sign-up">
      <h2>Sign-Up</h2>

      <div className="form">
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="user_name"
            value={formData.user_name}
            placeholder={"username"}
            onChange={(e) => handleChange(e)}
          >
            username
          </InputField>

          <div className="phone-info">
            <label htmlFor="whatsapp-input">whatsapp</label>

            <PhoneInput
              country={"eg"}
              value={formData.whats_app}
              onChange={(e) => setFormData({ ...formData, whats_app: e })}
            />
          </div>

          <InputField
            type="text"
            name="company_name"
            value={formData.company_name}
            placeholder={"company name"}
            onChange={(e) => handleChange(e)}
          >
            company name
          </InputField>

          <InputField
            type="password"
            name="password"
            value={formData.password}
            placeholder={"password"}
            onChange={(e) => handleChange(e)}
          >
            password
          </InputField>

          <Button type="submit" btnClass={"second-primary"}>
            SignUp
          </Button>
        </form>

        <div className="sign-now">
          <span>
            Have an Account ?<span onClick={() => setActive(1)}>SignIn</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

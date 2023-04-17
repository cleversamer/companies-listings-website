import { useState } from "react";
import InputField from "../../common/input/Input";
import Button from "../../common/button/Button";
import { useDispatch } from "react-redux";
import { openModal } from "../../../Features/modal";
import { notify } from "../../../utils/responseMsg";
import { validateSigninForm } from "../../../utils/validation";
import { signin } from "../../../api/auth";
import { showLoader, hideLoader } from "../../../Features/loader";
import { login } from "../../../Features/auth";
import "./signin.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SignIn = ({ setActive }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    whats_app: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const errors = validateSigninForm(formData);

      if (errors) {
        notify("error", errors);
      } else {
        dispatch(showLoader(true));

        const { data } = await signin(formData);

        if (!data.user.is_active || !data.user.has_countries) {
          sessionStorage.setItem(
            "token",
            JSON.stringify({
              token: data.token,
              refreshToken: data.refreshToken,
            })
          );
          sessionStorage.setItem("user", JSON.stringify(data.user));
        } else {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");

          localStorage.setItem(
            "token",
            JSON.stringify({
              token: data.token,
              refreshToken: data.refreshToken,
            })
          );

          localStorage.setItem("user", JSON.stringify(data.user));

          dispatch(
            login({
              accessToken: data.token,
              refreshToken: data.refreshToken,
              role: data.user.role,
              whats_app: data.user.whats_app,
              has_countries: data.user.has_countries,
              is_active: data.user.is_active,
              is_expired: data.user.is_expired,
              isAuthenticated: data.user.is_expired,
            })
          );
        }

        if (!data.user.is_active) {
          dispatch(openModal(1));
        } else if (data.user.is_active && !data.user.has_countries) {
          window.location.href = "/auth/countries";
        } else {
          window.location.href = "/record";
        }

        dispatch(hideLoader());
        notify("success", data.message);
      }
    } catch (error) {
      dispatch(showLoader(true));
      console.log(error);
      notify("error", error?.response?.data?.message || error.message);
      dispatch(hideLoader());
    }
  };

  return (
    <div className="Sign-in">
      <h2>Sign-In</h2>

      <div className="form">
        <form method="post" onSubmit={handleSubmit}>
          <div className="phone-info">
            <label htmlFor="whatsapp-input">whatsapp</label>

            <PhoneInput
              country={"eg"}
              value={formData.whats_app}
              onChange={(e) => setFormData({ ...formData, whats_app: e })}
            />
          </div>

          <InputField
            type="password"
            name="password"
            placeholder={"password"}
            onChange={(e) => handleChange(e)}
          >
            password
          </InputField>

          <Button type="submit" btnClass={"second-primary"}>
            SignIn
          </Button>
        </form>

        <div className="sign-now">
          <span>
            Don't Have an Account ?
            <span onClick={() => setActive(2)}>SignUp Now</span>
          </span>
        </div>

        <div className="forget-now">
          <span onClick={() => dispatch(openModal(2))}>forget passsword?</span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

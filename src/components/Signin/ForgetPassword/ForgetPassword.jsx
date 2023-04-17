import { useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../../Features/loader";
import Button from "../../common/button/Button";
import { notify } from "../../../utils/responseMsg";
import { validateforgetPasswordForm } from "../../../utils/validation";
import { forgetPassword } from "../../../api/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ForgetPassword = ({ setHeaderTitle, setReset }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    whats_app: "",
  });

  const handleForgetPassword = async (e) => {
    try {
      e.preventDefault();

      const errors = validateforgetPasswordForm(formData);

      if (errors) {
        notify("error", errors);
      } else {
        dispatch(showLoader(true));
        const { data } = await forgetPassword(formData);
        notify("success", data.message);

        dispatch(hideLoader());

        setTimeout(() => {
          setReset(true);
          setHeaderTitle("Reset Password");
        }, 2000);
      }
    } catch (error) {
      dispatch(showLoader(true));
      notify("error", error?.response?.data?.message || error.message);
      dispatch(hideLoader());
    }
  };

  return (
    <>
      <form action="post" onSubmit={handleForgetPassword}>
        <div className="phone-info">
          <label htmlFor="whatsapp-input">WhatsApp</label>

          <PhoneInput
            country={"eg"}
            value={formData.whats_app}
            onChange={(e) => setFormData({ ...formData, whats_app: e })}
          />
        </div>

        <div className="text-center">
          <Button
            style={{ margin: "0 10px" }}
            type={"submit"}
            btnClass={"second-primary"}
          >
            Send Code
          </Button>
        </div>
      </form>

      <div className="got-code text-center">
        <span
          onClick={() => {
            setHeaderTitle("Reset Password");
            setReset(true);
          }}
        >
          Click here if you got the code!
        </span>
      </div>
    </>
  );
};

export default ForgetPassword;

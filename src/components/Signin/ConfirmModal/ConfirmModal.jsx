import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resendVerifyCode, verifyCode } from "../../../api/auth";
import { showLoader, hideLoader } from "../../../Features/loader";
import { notify } from "../../../utils/responseMsg";
import { validateVerifyCodeForm } from "../../../utils/validation";
import Button from "../../common/button/Button";
import InputField from "../../common/input/Input";
import Modal from "../../common/Modal/Modal";
import "./confirmModal.css";

function ConfirmModal() {
  const user = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null;

  const modal = useSelector((state) => state.modal.value);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    code: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    dispatch(showLoader(true));

    try {
      e.preventDefault();
      const errors = validateVerifyCodeForm(formData);

      if (errors) {
        notify("error", errors);
      }

      const { data } = await verifyCode(formData);
      const user = JSON.parse(sessionStorage.getItem("user"));

      sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          is_active: true,
        })
      );

      dispatch(hideLoader());
      notify("success", data.message);

      setTimeout(() => {
        window.location.href = "/auth/countries";
      }, 400);
    } catch (error) {
      notify("error", error?.response?.data?.message || error.message);
      dispatch(hideLoader());
    }
  };

  const handleResendCode = async () => {
    try {
      dispatch(showLoader(true));
      const { data } = await resendVerifyCode();
      notify("success", data.message);
      dispatch(hideLoader());
    } catch (error) {
      notify("error", error?.response?.data?.message || error.message);
      dispatch(hideLoader());
    }
  };

  let stars = [];

  for (let i = 0; i < user?.whats_app.length - 5; i++) {
    stars.push(i);
  }

  return (
    <Modal
      center={true}
      headerTitle={"Confirm SignIn"}
      width={"400px"}
      show={modal == 1}
    >
      <div className="confirm-form text-center">
        <form action="post" onSubmit={handleSubmit}>
          <span>
            Write The Code We Sent In {user?.whats_app.slice(0, 2)}
            {stars.map((star) => `*`)}
            {user?.whats_app.slice(9)}
          </span>

          <InputField
            type="text"
            name="code"
            placeholder={"code here"}
            onChange={(e) => handleChange(e)}
          />

          <Button
            style={{ margin: "0 10px" }}
            btnClass={"second-primary"}
            type={"submit"}
          >
            Send
          </Button>

          <Button
            btnClass={"second-primary"}
            type={"button"}
            onClick={handleResendCode}
          >
            ReSend
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default ConfirmModal;

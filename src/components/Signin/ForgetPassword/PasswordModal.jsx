import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../common/Modal/Modal";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import "./password.css";

const PasswordModal = () => {
  const modal = useSelector((state) => state.modal.value);
  const [headerTitle, setHeaderTitle] = useState("Forget Password");
  const [reset, setReset] = useState(false);

  return (
    <Modal
      center={true}
      headerTitle={headerTitle}
      width={"450px"}
      show={modal == 2}
    >
      <div className="password-form">
        {reset ? (
          <ResetPassword setReset={setReset} setHeaderTitle={setHeaderTitle} />
        ) : (
          <ForgetPassword setReset={setReset} setHeaderTitle={setHeaderTitle} />
        )}
      </div>
    </Modal>
  );
};

export default PasswordModal;

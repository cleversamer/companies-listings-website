import { useState } from "react";
import ConfirmModal from "../../components/Signin/ConfirmModal/ConfirmModal";
import PasswordModal from "../../components/Signin/ForgetPassword/PasswordModal";
import SignIn from "../../components/Signin/Form/SignIn";
import SignUp from "../../components/Signup/SignUp";
import { Helmet } from "react-helmet-async";
import "./sign.css";

const Sign = () => {
  const [active, setActive] = useState(1);

  return (
    <>
      <Helmet>
        <title>Sign</title>
      </Helmet>

      <ConfirmModal />

      <PasswordModal />

      <div className="sign-page">
        <div className="sign-info">
          <div className="left-side">
            <img
              src="/images/Marketing consulting-amico.png"
              alt="images/Marketing consulting-amico.png"
            />
          </div>

          <div className="right-side">
            <div className="right-side-info">
              {active === 1 ? (
                <SignIn setActive={setActive} />
              ) : (
                <SignUp setActive={setActive} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign;

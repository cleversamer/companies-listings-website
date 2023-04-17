import SignIn from "../../../components/admin/Sign/Sign";
import PasswordModal from "../../../components/Signin/ForgetPassword/PasswordModal";

const Signin = () => {
  return (
    <div className="admin-sign">
      <SignIn />
      <PasswordModal />
    </div>
  );
};

export default Signin;

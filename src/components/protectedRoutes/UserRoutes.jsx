import { isUserAdmin, isAuthenticated } from "../../utils/isAuth";
import { Navigate } from "react-router-dom";

const UserProtected = ({ children }) => {
  if (isUserAdmin()) {
    return <Navigate to="/records" />;
  } else if (!isUserAdmin() && !isAuthenticated()) {
    sessionStorage.clear();
    localStorage.clear();
    return <Navigate to="/auth/sign" />;
  }

  return children;
};

export default UserProtected;

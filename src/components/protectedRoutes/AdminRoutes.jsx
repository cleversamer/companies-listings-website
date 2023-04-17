import { isUserAdmin, isAuthenticated } from "../../utils/isAuth";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  if (!isUserAdmin() && isAuthenticated()) {
    return <Navigate to="/record" />;
  } else if (!isUserAdmin() && !isAuthenticated()) {
    sessionStorage.clear();
    localStorage.clear();
    return <Navigate to="/auth/sign" />;
  }

  return children;
};

export default AdminRoutes;

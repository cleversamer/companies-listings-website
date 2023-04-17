import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import ScrollToTop from "./utils/ScrollToTop";
import Loader from "./components/common/loader/Loader";
import ResponseMsg from "./components/common/ResponseMsg/ResponseMsg";

import Layout from "./Layout/Layout";
import Pending from "./pages/admin/pending/Pending";
import Records from "./pages/admin/Records/Records";
import User from "./pages/admin/User/User";
import Countries from "./pages/admin/Country/Country";
import Settings from "./pages/setting/Settings";

import Country from "./pages/Country/Country";
import Record from "./pages/Record/Record.jsx";
import Sign from "./pages/Sign/Sign";
import Type from "./pages/admin/Type/Type";

import OverLay from "./components/overlay/OverLay";

import Error404 from "./pages/Error404/Error404";
import Signin from "./pages/admin/Sign/Signin";
import AdminSetting from "./pages/admin/settings/AdminSetting";

import AdminRoutes from "./components/protectedRoutes/AdminRoutes";
import UserProtected from "./components/protectedRoutes/UserRoutes";

import { isAuthenticated, isUserAdmin } from "./utils/isAuth";

import { notify } from "./utils/responseMsg";

import { login } from "./Features/auth";

import { baseURL } from "./utils/apiRoutes";

import ClosedMessage from "./components/ClosedMessage/ClosedMessage";
import { closeSite, openSite } from "./Features/site";

import io from "socket.io-client";

const socket = io(baseURL);

function App() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.loader.value);
  const { show: showOverLay } = useSelector((state) => state.sidebar);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const isClosed = useSelector((state) => state.site.isClosed);

  useEffect(() => {
    if (user && token) {
      dispatch(
        login({
          accessToken: token.token,
          refreshToken: token.refreshToken,
          user_name: user.user_name,
          role: user.role,
          whats_app: user.whats_app,
          has_countries: user.has_countries,
          is_active: user.is_active,
          is_expired: user.is_expired,
          isAuthenticated: user.is_expired,
        })
      );
    }
  }, [user, token]);

  useEffect(() => {
    const site = localStorage.getItem("isClosed");
    if (site && site === "true") {
      dispatch(closeSite());
    } else {
      dispatch(openSite());
    }
  }, []);

  useEffect(() => {
    const handleMessage = (data) => {
      if (user.role === "user") {
        notify("error", data);
      }
    };

    const handleClose = (data) => {
      localStorage.setItem("isClosed", "true");
      dispatch(closeSite());
    };

    const handleOpen = (data) => {
      if (user.role === "user") {
        window.location.reload();
      }

      localStorage.setItem("isClosed", "false");
      dispatch(openSite());
    };

    socket.on("close-message", handleMessage);
    socket.on("close", handleClose);
    socket.on("open", handleOpen);

    return () => {
      socket.off("close-message", handleMessage);
      socket.off("close", handleClose);
      socket.off("open", openSite);
    };
  }, []);

  const SystemLayout = (Component) => {
    return (
      <Layout>
        <Component />
      </Layout>
    );
  };

  const adminRoutes = (component) => (
    <AdminRoutes>{SystemLayout(component)}</AdminRoutes>
  );

  const userProtectedRoutes = (component) => (
    <UserProtected>{SystemLayout(component)}</UserProtected>
  );

  return (
    <div className="App">
      <ScrollToTop />
      {show && <Loader />}
      {showOverLay && <OverLay />}
      {isClosed == true && user && user.role === "user" && <ClosedMessage />}
      <ResponseMsg />

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/record" />
            ) : (
              <Navigate to="/auth/sign" replace />
            )
          }
        />

        {/* Admin Routes  */}
        <Route path="/admin/sign" element={<Signin />} />
        <Route path="/records" element={adminRoutes(Records)} />
        <Route path="/users" element={adminRoutes(User)} />
        <Route path="/Pending-Requests" element={adminRoutes(Pending)} />
        <Route path="/countries" element={adminRoutes(Countries)} />
        <Route path="/type" element={adminRoutes(Type)} />
        <Route path="/admin/settings" element={adminRoutes(AdminSetting)} />

        {/* User Routes  */}
        <Route path="/record" element={userProtectedRoutes(Record)} />
        <Route path="/settings" element={userProtectedRoutes(Settings)} />

        {/* Auth Routes  */}
        <Route
          path="/auth/sign"
          element={
            !isAuthenticated() && !isUserAdmin() ? (
              <Sign />
            ) : (
              <Navigate to="/record" />
            )
          }
        />
        <Route
          path="/auth/countries"
          element={
            !isAuthenticated() && !isUserAdmin() ? (
              <Country />
            ) : (
              <Navigate to="/record" />
            )
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;

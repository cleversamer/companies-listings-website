import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { logout } from "./auth";
import { apiRoutes, baseURL } from "../utils/apiRoutes";

let authToken = sessionStorage.getItem("token")
  ? JSON.parse(sessionStorage.getItem("token"))
  : null;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${authToken?.token}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authToken) {
    authToken = sessionStorage.getItem("token")
      ? JSON.parse(sessionStorage.getItem("token"))
      : null;
    req.headers.Authorization = `Bearer ${authToken.token}`;
  }

  const user = jwtDecode(authToken.token);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  axios
    .post(`${apiRoutes.auth}/refreshToken`, {
      refresh_token: authToken.refreshToken,
    })
    .then((response) => {
      sessionStorage.setItem(
        "token",
        JSON.stringify({ ...authToken, token: response.data.token })
      );
      req.headers.Authorization = `Bearer ${response.data.token}`;
    })
    .catch((error) => {
      if (error.response.status == 401) {
        logout();
      }
    });
});

export default axiosInstance;

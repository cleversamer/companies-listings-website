import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { logout } from "./auth";
import { apiRoutes, baseURL } from "../utils/apiRoutes";

let authToken = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

let isClosed = localStorage.getItem("isClosed")
  ? JSON.parse(localStorage.getItem("isClosed"))
  : null;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers) => {
      if (!authToken) {
        authToken = localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token"))
          : null;
      }

      const user = jwtDecode(authToken?.token);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (isClosed === null) {
        axios
          .get(`${baseURL}${apiRoutes.settings}`)
          .then((response) => {
            const is_closed = response.data.is_closed;
            localStorage.setItem("isClosed", is_closed);
            if (is_closed === true) {
              window.location.reload();
            }
          })
          .catch((err) => {});
      }
      if (isExpired) {
        try {
          const response = await axios.post(`${apiRoutes.auth}/refreshToken`, {
            refresh_token: authToken.refreshToken,
          });
          authToken.token = response.data.token;
          localStorage.setItem("token", JSON.stringify(authToken));
        } catch (error) {
          if (error.response.status === 401) {
            logout();
          }
        }
      }

      const newHeaders = new Headers(headers);
      newHeaders.set("Authorization", `Bearer ${authToken?.token}`);
      return newHeaders;
    },
  }),
  endpoints: (builder) => ({}),
});

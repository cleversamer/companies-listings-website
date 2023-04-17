import axios from "axios";
import axiosInstance from "./axiosInstance";
import { apiRoutes } from "../utils/apiRoutes";

export const signup = async (form) =>
  await axios.post(`${apiRoutes.auth}/sign-up`, form);

export const signin = async (form) =>
  await axios.post(`${apiRoutes.auth}/sign-in`, form);

export const adminSignin = async (form) =>
  await axios.post(`${apiRoutes.auth}/admin/sign`, form);

export const verifyCode = async (form) =>
  await axiosInstance.post(`${apiRoutes.auth}/verify`, form);

export const resendVerifyCode = async () =>
  await axiosInstance.post(`${apiRoutes.auth}/verify/Resend`, {});

export const getCountries = async () =>
  await axiosInstance.get(apiRoutes.getAllCountries);

export const chooseCountries = async (form) =>
  await axiosInstance.post(apiRoutes.addUserCountry, { countries: form });

export const forgetPassword = async (form) =>
  await axios.post(`${apiRoutes.auth}/forgetPassword`, form);

export const resetPassword = async (form) =>
  await axios.post(`${apiRoutes.auth}/resetPassword`, form);

export const logout = (role) => {
  sessionStorage.clear();
  localStorage.clear();

  if (role === "admin") {
    window.location.href = "/admin/sign";
  } else {
    window.location.href = "/auth/sign";
  }
};

export const refreshToken = async () =>
  await axiosInstance.post(`${apiRoutes.auth}/refreshToken`, {
    refresh_token: refreshToken,
  });

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  user_name: "",
  role: "",
  whats_app: "",
  has_countries: "",
  is_active: "",
  is_expired: "",
  isAuthenticated: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user_name: action.payload.user_name,
        role: action.payload.role,
        whats_app: action.payload.whats_app,
        has_countries: action.payload.has_countries,
        is_active: action.payload.is_active,
        is_expired: action.payload.is_expired,
        isAuthenticated: action.payload.is_expired,
      };
    },

    updateData: (state, action) => {
      return {
        ...state,
        user_name: action.payload.user_name,
        whats_app: action.payload.whats_app,
      };
    },

    signout: (state, action) => {
      return {
        accessToken: "",
        refreshToken: "",
        user_name: "",
        role: "",
        whats_app: "",
        has_countries: "",
        is_active: "",
        is_expired: "",
        isAuthenticated: "",
      };
    },
  },
});

export const { login, updateData, signout } = authSlice.actions;

export default authSlice.reducer;

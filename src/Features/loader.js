import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: { value: null },
  reducers: {
    showLoader: (state, action) => {
      return { value: action.payload };
    },

    hideLoader: (state, action) => {
      return { value: null };
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;

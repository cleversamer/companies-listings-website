import { createSlice } from "@reduxjs/toolkit";

const siteSlice = createSlice({
  name: "modal",
  initialState: { isClosed: false },
  reducers: {
    closeSite: (state, action) => {
      return { isClosed: true };
    },

    openSite: (state, action) => {
      return { isClosed: false };
    },
  },
});

export const { closeSite, openSite } = siteSlice.actions;

export default siteSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "loader",
  initialState: { show: false },
  reducers: {
    showSidebar: (state, action) => {
      return { show: true };
    },

    hideSidebar: (state, action) => {
      return { show: false };
    },
  },
});

export const { showSidebar, hideSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";
import modalSlice from "../Features/modal";
import loaderSlice from "../Features/loader";
import filterSlice from "../Features/filter";
import sidebarSlice from "../Features/sidebar";
import authSlice from "../Features/auth";
import siteSlice from "../Features/site";
import filterUserRecord from "../Features/filterUserRecord";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    loader: loaderSlice,
    filter: filterSlice,
    filterRecords: filterUserRecord,
    sidebar: sidebarSlice,
    auth: authSlice,
    site: siteSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export default store;

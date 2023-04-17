import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 10,
  searchBy: "",
  searchValue: "",
  orderBy: "createdAt",
  sort: "DESC",
};

const filterslice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    oldData: (state, action) => {
      return {
        limit: action.payload.limit,
        page: action.payload.page,
        orderBy: action.payload.orderBy,
        searchBy: action.payload.searchBy,
        searchValue: action.payload.searchValue,
        sort: action.payload.sort,
      };
    },

    navigtePage: (state, action) => {
      return { ...state, page: action.payload };
    },

    changeLimit: (state, action) => {
      return { ...state, limit: action.payload };
    },

    searchInput: (state, action) => {
      return {
        ...state,
        searchBy: action.payload.searchBy,
        searchValue: action.payload.searchValue,
      };
    },

    clearInput: (state, action) => {
      return { ...state, searchBy: "", searchValue: "" };
    },

    sortData: (state, action) => {
      return {
        ...state,
        orderBy: action.payload.orderBy,
        sort: action.payload.sort,
      };
    },
  },
});

export const {
  oldData,
  navigtePage,
  changeLimit,
  searchInput,
  clearInput,
  sortData,
} = filterslice.actions;

export default filterslice.reducer;

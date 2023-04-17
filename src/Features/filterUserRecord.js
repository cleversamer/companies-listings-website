import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  rgn: "",
  type: "",
  owner: "",
  comp: "",
  phas: "",
  bs: "",
  fg: "",
  dp: "",
  ys: "",
  utp_from: "",
  utp_to: "",
  bua_from: "",
  bua_to: "",
  dly: "",
};

const filtersRecordslice = createSlice({
  name: "filterRecords",
  initialState,
  reducers: {
    updateType: (state, action) => {
      return {
        ...state,
        type: action.payload.type,
        owner: "",
        comp: "",
        phas: "",
        bs: "",
        fg: "",
        dp: "",
        ys: "",
        utp_from: "",
        utp_to: "",
        bua_from: "",
        bua_to: "",
        dly: "",
      };
    },

    updateCountry: (state, action) => {
      return {
        ...state,
        rgn: action.payload.rgn,
        owner: "",
        comp: "",
        phas: "",
        bs: "",
        fg: "",
        dp: "",
        ys: "",
        utp_from: "",
        utp_to: "",
        bua_from: "",
        bua_to: "",
        dly: "",
      };
    },

    updateValues: (state, action) => {
      return { ...state, rgn: action.payload.rgn, type: action.payload.type };
    },

    updateData: (state, action) => {
      return {
        ...state,
        owner: action.payload.owner,
        comp: action.payload.comp,
        phas: action.payload.phas,
        bs: action.payload.bs,
        fg: action.payload.fg,
        dp: action.payload.dp,
        ys: action.payload.ys,
        utp_from: action.payload.utp_from,
        utp_to: action.payload.utp_to,
        bua_from: action.payload.bua_from,
        bua_to: action.payload.bua_to,
        dly: action.payload.dly,
      };
    },

    navigtePage: (state, action) => {
      return { ...state, page: action.payload };
    },

    clearInput: (state, action) => {
      return { ...state, searchBy: "", searchValue: "" };
    },
  },
});

export const {
  updateType,
  updateCountry,
  updateValues,
  updateData,
  navigtePage,
  clearInput,
} = filtersRecordslice.actions;

export default filtersRecordslice.reducer;

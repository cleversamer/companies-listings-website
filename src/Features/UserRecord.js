import { apiSlice } from "../api/api";
import { apiRoutes } from "../utils/apiRoutes";

const extendedUserRecordsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserRecords: build.query({
      query: ({
        page,
        rgn,
        owner,
        comp,
        phas,
        type,
        bs,
        fg,
        dp,
        ys,
        utp_from,
        utp_to,
        bua_from,
        bua_to,
        dly,
      }) => ({
        url: `${apiRoutes.getUserRecords}?page=${page}&rgn=${rgn}&type=${type}&owner=${owner}&comp=${comp}&phas=${phas}&bs=${bs}&fg=${fg}&dp=${dp}&ys=${ys}&utp_from=${utp_from}&utp_to=${utp_to}&bua_from=${bua_from}&bua_to=${bua_to}&dly=${dly}`,
      }),
    }),

    getPDF: build.mutation({
      query: (fileName) => ({
        url: `${apiRoutes.getRecordPdf}/${fileName}`,
        method: "POST",
      }),
    }),

    sharePDF: build.mutation({
      query: (fileName) => ({
        url: `${apiRoutes.shareRecordPdf}/${fileName}`,
        method: "POST",
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetUserRecordsQuery,
  useGetPDFMutation,
  useSharePDFMutation,
} = extendedUserRecordsApi;

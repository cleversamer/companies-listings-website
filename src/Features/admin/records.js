import { apiSlice } from "../../api/api";
import { apiRoutes } from "../../utils/apiRoutes";

const extendedRecordsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRecords: build.query({
      query: ({ page, limit, searchBy, searchValue, orderBy, sort }) => ({
        url: `${apiRoutes.getRecords}?page=${page}&limit=${limit}&searchBy=${searchBy}&searchValue=${searchValue}&orderBy=${orderBy}&sort=${sort}`,
      }),

      providesTags: ["records"],
    }),

    createRecord: build.mutation({
      query: (formdata) => ({
        url: apiRoutes.createRecord,
        method: "POST",
        body: formdata,
      }),

      invalidatesTags: ["records"],
    }),

    updateRecord: build.mutation({
      query: ({ recordId, formdata }) => ({
        url: `${apiRoutes.updateRecord}/${recordId}`,
        method: "PUT",
        body: formdata,
      }),

      invalidatesTags: ["records"],
    }),

    deleteRecord: build.mutation({
      query: (id) => ({
        url: `/record/delete/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["records"],
    }),

    importRecordsExcel: build.mutation({
      query: (formdata) => ({
        url: apiRoutes.importExcel,
        method: "POST",
        body: formdata,
      }),

      invalidatesTags: ["records"],
    }),

    importRecordsPDF: build.mutation({
      query: (formdata) => ({
        url: apiRoutes.importPdf,
        method: "POST",
        body: formdata,
      }),

      invalidatesTags: ["records"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetRecordsQuery,
  useCreateRecordMutation,
  useUpdateRecordMutation,
  useDeleteRecordMutation,
  useImportRecordsExcelMutation,
  useImportRecordsPDFMutation,
} = extendedRecordsApi;

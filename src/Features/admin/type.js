import { apiSlice } from "../../api/api";
import { apiRoutes } from "../../utils/apiRoutes";

const extendedTypeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTypes: build.query({
      query: () => ({
        url: apiRoutes.getAllTypes,
      }),

      providesTags: ["type"],
    }),

    createType: build.mutation({
      query: (form) => ({
        url: apiRoutes.createType,
        method: "POST",
        body: form,
      }),

      invalidatesTags: ["type"],
    }),

    editType: build.mutation({
      query: ({ userId, form }) => ({
        url: `${apiRoutes.editType}/${userId}`,
        method: "PUT",
        body: form,
      }),

      invalidatesTags: ["type"],
    }),

    deleteType: build.mutation({
      query: (typeId) => ({
        url: `${apiRoutes.editType}/${typeId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["type"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetTypesQuery,
  useCreateTypeMutation,
  useEditTypeMutation,
  useDeleteTypeMutation,
} = extendedTypeApi;

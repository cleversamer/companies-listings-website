import { apiSlice } from "../../api/api";
import { apiRoutes } from "../../utils/apiRoutes";

const extendedPendingApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPendingRequests: build.query({
      query: ({ page, limit, searchBy, searchValue, orderBy, sort }) => ({
        url: `${apiRoutes.getAllPendings}?page=${page}&limit=${limit}&searchBy=${searchBy}&searchValue=${searchValue}&orderBy=${orderBy}&sort=${sort}`,
      }),

      providesTags: ["pending"],
    }),

    acceptUser: build.mutation({
      query: (userId) => ({
        url: `${apiRoutes.acceptUser}/${userId}`,
        method: "PUT",
      }),

      invalidatesTags: ["pending"],
    }),

    rejectUser: build.mutation({
      query: (userId) => ({
        url: `${apiRoutes.rejectUser}/${userId}`,
        method: "PUT",
      }),

      invalidatesTags: ["pending"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetPendingRequestsQuery,
  useAcceptUserMutation,
  useRejectUserMutation,
} = extendedPendingApi;

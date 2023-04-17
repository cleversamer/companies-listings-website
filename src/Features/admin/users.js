import { apiSlice } from "../../api/api";
import { apiRoutes } from "../../utils/apiRoutes";

const extendedUsersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: ({ page, limit, searchBy, searchValue, orderBy, sort }) => ({
        url: `${apiRoutes.getAllusers}?page=${page}&limit=${limit}&searchBy=${searchBy}&searchValue=${searchValue}&orderBy=${orderBy}&sort=${sort}`,
      }),

      providesTags: ["users"],
    }),

    createUser: build.mutation({
      query: (formData) => ({
        url: apiRoutes.createUser,
        method: "POST",
        body: formData,
      }),

      invalidatesTags: ["users"],
    }),

    editUser: build.mutation({
      query: ({ userId, formData }) => ({
        url: `${apiRoutes.editUser}/${userId}`,
        method: "PUT",
        body: formData,
      }),

      invalidatesTags: ["users"],
    }),

    updateAdmin: build.mutation({
      query: (formData) => ({
        url: apiRoutes.updateAdmin,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteUser: build.mutation({
      query: (userId) => ({
        url: `${apiRoutes.deleteUser}/${userId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["users"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useUpdateAdminMutation,
  useDeleteUserMutation,
} = extendedUsersApi;

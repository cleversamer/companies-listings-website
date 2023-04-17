import { apiSlice } from "../../api/api";
import { apiRoutes } from "../../utils/apiRoutes";

const extendedCountryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCountries: build.query({
      query: () => ({
        url: apiRoutes.allCountries,
      }),

      providesTags: ["country"],
    }),

    createCountry: build.mutation({
      query: (form) => ({
        url: apiRoutes.createCountry,
        method: "POST",
        body: form,
      }),

      invalidatesTags: ["country"],
    }),

    editCountry: build.mutation({
      query: ({ userId, form }) => ({
        url: `${apiRoutes.editCountry}/${userId}`,
        method: "PUT",
        body: form,
      }),

      invalidatesTags: ["country"],
    }),

    deleteCountry: build.mutation({
      query: (userId) => ({
        url: `${apiRoutes.deleteCountry}/${userId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["country"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetCountriesQuery,
  useCreateCountryMutation,
  useEditCountryMutation,
  useDeleteCountryMutation,
} = extendedCountryApi;

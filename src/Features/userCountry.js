import { apiSlice } from "../api/api";
import { apiRoutes } from "../utils/apiRoutes";

const extendedUserCountryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserCountries: build.query({
      query: () => ({
        url: apiRoutes.getUserCountries,
      }),

      providesTags: ["country"],
    }),
  }),

  overrideExisting: false,
});

export const { useGetUserCountriesQuery } = extendedUserCountryApi;

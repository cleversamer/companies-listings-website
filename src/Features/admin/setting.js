import { accessToken } from "../../utils/isAuth";
import { apiSlice } from "../../api/api";
import { apiRoutes } from "../../utils/apiRoutes";

const extendedSettingApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSetting: build.query({
      query: () => ({
        url: apiRoutes.settings,
      }),
    }),

    openSite: build.mutation({
      query: () => ({
        url: apiRoutes.openSite,
        method: "PUT",
      }),
    }),

    closeSite: build.mutation({
      query: () => ({
        url: apiRoutes.closeSite,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetSettingQuery, useOpenSiteMutation, useCloseSiteMutation } =
  extendedSettingApi;

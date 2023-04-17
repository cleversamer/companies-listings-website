import { apiSlice } from '../api/api';
import { apiRoutes } from '../utils/apiRoutes';

const extendedSettingsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    updatePassword: build.mutation({
      query: (formData) => ({
        url: apiRoutes.updateUserPassword,
        method: 'PUT',
        body: formData,
      }),
    }),
  }),
});

export const { useUpdatePasswordMutation } = extendedSettingsApi;

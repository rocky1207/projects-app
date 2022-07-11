import { apiSlice } from '../apiSlice';

export const userRoleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userRole: builder.query({
            query: () => 'users/me',
        }),
    }),
});

export const { useUserRoleQuery } = userRoleApiSlice;

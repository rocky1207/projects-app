import { apiSlice } from '../apiSlice';

export const userRoleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userRole: builder.query({
            query: () => 'users/me',
        }),
        getFiltratedUsers: builder.query({
            query: (filter) =>
                'users?filters[$or][0][username][$contains]=' +
                filter +
                '&filters[$or][1][email][$contains]=' +
                filter +
                '?populate=*',
        }),
    }),
});

export const { useUserRoleQuery, useGetFiltratedUsersQuery } = userRoleApiSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers) => {
            let token;
            if (localStorage.token) {
                token = localStorage.getItem('token');
            }
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});

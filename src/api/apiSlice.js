import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
};
*/
//import { token } from '../../components/ShowProjects/ShowProjects';

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
            console.log(headers);
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});

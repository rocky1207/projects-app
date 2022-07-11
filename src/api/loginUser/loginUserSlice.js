import { apiSlice } from '../apiSlice';

export const loginApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (datas) => ({
                url: '/auth/local',
                method: 'POST',
                body: datas,
            }),
        }),
    }),
});

export const { useLoginMutation } = loginApiSlice;

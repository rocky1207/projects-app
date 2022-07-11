import { apiSlice } from '../apiSlice';

export const registerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (datas) => ({
                url: '/auth/local/register',
                method: 'POST',
                body: datas,
            }),
        }),
    }),
});

export const { useRegisterMutation } = registerApiSlice;

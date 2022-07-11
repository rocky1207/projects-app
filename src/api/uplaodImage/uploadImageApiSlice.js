import { apiSlice } from '../apiSlice';

export const uploadImageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (image) => ({
                url: '/upload',
                method: 'POST',
                body: image,
            }),
        }),
    }),
});

export const { useUploadImageMutation } = uploadImageApiSlice;

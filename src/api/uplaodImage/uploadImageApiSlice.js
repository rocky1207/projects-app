import { apiSlice } from '../apiSlice';

export const uploadImageApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['UploadImage'],
    endpoints: (builder) => ({
        uploadFiles: builder.query({
            query: (id) => ({
                url: 'upload/files/' + id,
            }),
            providesTags: ['UploadImage'],
        }),
        uploadImage: builder.mutation({
            query: (image) => ({
                url: '/upload',
                method: 'POST',
                body: image,
            }),
            invalidatesTags: ['UploadImage'],
        }),
        deleteUploadedImage: builder.mutation({
            query: (id) => ({
                url: '/upload/files/' + id,
                method: 'DELETE',
            }),
            invalidatesTags: ['UploadImage'],
        }),
    }),
});

export const {
    useUploadFilesQuery,
    useUploadImageMutation,
    useDeleteUploadedImageMutation,
} = uploadImageApiSlice;

import { apiSlice } from '../apiSlice';

export const categoriesApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: '/categories?populate=*',
            }),
            providesTags: ['Categories'],
        }),
    }),
});

export const { useGetCategoriesQuery } = categoriesApiSlice;

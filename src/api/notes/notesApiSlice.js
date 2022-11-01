import { apiSlice } from '../apiSlice';

export const notesApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Notes'],
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: ({ id, criteria, categoryId }) => ({
                url:
                    '/notes?populate[author][populate][logo][populate]=*&populate[files][populate]=*&populate[category][populate]=&populate[project][populate]=*&filters[project][id][$eq]=' +
                    id +
                    '&filters[category][id][$eq]=' +
                    categoryId +
                    '&filters[title][$contains]=' +
                    criteria,
            }),
            providesTags: ['Notes'],
        }),
        getNoteById: builder.query({
            query: (id) => ({
                url: '/notes/' + id + '?populate=*',
            }),
            providesTags: ['Notes'],
        }),
        postNote: builder.mutation({
            query: (note) => ({
                url: '/notes',
                method: 'POST',
                body: note,
            }),
            invalidatesTags: ['Notes'],
        }),
        deleteNote: builder.mutation({
            query: (id) => ({
                url: '/notes/' + id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notes'],
        }),
        editNote: builder.mutation({
            query: ({ paramsId, data }) => ({
                url: '/notes/' + paramsId,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Notes'],
        }),
    }),
});

export const {
    useGetNotesQuery,
    useGetNoteByIdQuery,
    usePostNoteMutation,
    useDeleteNoteMutation,
    useEditNoteMutation,
} = notesApiSlice;

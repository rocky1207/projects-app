import { apiSlice } from '../apiSlice';

export const projectsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Projects'],
    endpoints: (builder) => ({
        projectsLength: builder.query({
            query: (currentUserId) => ({
                url:
                    '/projects?filters[$or][0][employees][id][$eq]=' +
                    currentUserId +
                    '&filters[$or][1][author][id][$eq]=' +
                    currentUserId,

                //filters[$or][0][employees][id][$eq]=4&filters[$or][1][author][id][$eq]=4
            }),
            providesTags: ['Projects'],
        }),
        projects: builder.query({
            query: (filterDatas) => ({
                url:
                    '/projects?populate[notes][populate]&populate[employees][populate][logo][populate]&populate[author][populate][logo][populate]=*&populate[logo][populate]&filters[name][$contains]=' +
                    filterDatas.filterParams +
                    '&filters[$or][0][employees][id][$eq]=' +
                    filterDatas.currentUserId +
                    '&filters[$or][1][author][id][$eq]=' +
                    filterDatas.currentUserId +
                    '&pagination[page]=' +
                    filterDatas.pageNumber +
                    '&pagination[pageSize]=5',
            }),
            /*
            transformResponse: (response) => {
                const bla = response.data.reverse();
                console.log(bla);
                return { data: bla };
            },
*/
            providesTags: ['Projects'],
        }),
        getProjectById: builder.query({
            query: (id) => ({
                url: '/projects/' + id + '?populate=*',
            }),
            providesTags: ['Projects'],
        }),
        addProject: builder.mutation({
            query: (datas) => ({
                url: '/projects',
                method: 'POST',
                body: datas,
            }),

            invalidatesTags: ['Projects'],
        }),
        editProject: builder.mutation({
            query: ({ id, editProjectState }) => ({
                url: '/projects/' + id,
                method: 'PUT',
                body: editProjectState,
            }),
            invalidatesTags: ['Projects'],
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: '/projects/' + id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Projects'],
        }),
    }),
});
export const {
    useProjectsQuery,
    useProjectsLengthQuery,
    useGetProjectByIdQuery,
    useAddProjectMutation,
    useEditProjectMutation,
    useDeleteProjectMutation,
} = projectsApiSlice;

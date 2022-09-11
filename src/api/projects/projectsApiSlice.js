import { apiSlice } from '../apiSlice';

export const projectsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Projects'],
    endpoints: (builder) => ({
        projectsLength: builder.query({
            query: () => ({
                url: '/projects?populate=*',
            }),
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
        addProject: builder.mutation({
            query: (datas) => ({
                url: '/projects',
                method: 'POST',
                body: datas,
            }),

            invalidatesTags: ['Projects'],
        }),
    }),
});
export const {
    useProjectsQuery,
    useProjectsLengthQuery,
    useAddProjectMutation,
} = projectsApiSlice;

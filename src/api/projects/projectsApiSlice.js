import { apiSlice } from '../apiSlice';

export const projectsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Projects'],
    endpoints: (builder) => ({
        projects: builder.query({
            query: (filterDatas) =>
                '/projects?populate[notes][populate]&populate[employees][populate][logo][populate]&populate[author][populate][logo][populate]=*&populate[logo][populate]&filters[name][$contains]=' +
                filterDatas.filterParams +
                '&filters[$or][0][employees][id][$eq]=' +
                filterDatas.currentUserId +
                '&filters[$or][1][author][id][$eq]=' +
                filterDatas.currentUserId,
        }),
    }),
});
export const { useProjectsQuery } = projectsApiSlice;

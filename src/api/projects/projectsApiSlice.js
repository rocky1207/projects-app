import { apiSlice } from '../apiSlice';

export const projectsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Projects'],
    endpoints: (builder) => ({
        projects: builder.query({
            query: (id) =>
                '/projects?filters[$or][0][employees][id][$eq]=' + id,
        }),
    }),
});
export const { useProjectsQuery } = projectsApiSlice;

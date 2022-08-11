import { useProjectsQuery } from '../../api/projects/projectsApiSlice';
import SearchProjectsArticle from '../SearchProjectsArticle/SearchProjectsArticle';
import ProjectsPagination from '../Pagination/ProjectsPagination';
import { useUserRoleQuery } from '../../api/userRole/userRoleApiSlice';
import { useSelector } from 'react-redux';
import ProjectArticle from './ProjectArticle';

import '../../App.css';

const ShowProjects = () => {
    const { currentUserId } = useSelector((state) => state.auth);
    const { filterParams, pageNumber } = useSelector((state) => state.search);

    const { data: roleData } = useUserRoleQuery();
    const filterDatas = {
        filterParams,
        currentUserId,
        pageNumber,
    };
    const { data, isLoading, isError, error } = useProjectsQuery(filterDatas);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (isError) {
        console.log(error);
    }
    return (
        <section className="app">
            <SearchProjectsArticle />
            {data?.data.map((project) => {
                return <ProjectArticle key={project.id} project={project} />;
            })}

            <ProjectsPagination />
        </section>
    );
};

export default ShowProjects;

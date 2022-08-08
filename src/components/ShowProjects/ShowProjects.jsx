import { useProjectsQuery } from '../../api/projects/projectsApiSlice';
import SearchProjectsArticle from '../SearchProjectsArticle/SearchProjectsArticle';
import { useUserRoleQuery } from '../../api/userRole/userRoleApiSlice';
import { useSelector } from 'react-redux';
import ProjectArticle from './ProjectArticle';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import '../../App.css';

const ShowProjects = () => {
    const { currentUserId } = useSelector((state) => state.auth);
    const { filterParams } = useSelector((state) => state.search);

    const { data: roleData } = useUserRoleQuery();
    const filterDatas = {
        filterParams,
        currentUserId,
    };
    const { data, isLoading, isError, error } = useProjectsQuery(filterDatas);

    useEffect(() => {}, [filterParams]);

    const dispatch = useDispatch();

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

            <h2>ShowProjects page</h2>
        </section>
    );
};

export default ShowProjects;

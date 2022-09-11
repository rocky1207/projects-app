import { useEffect } from 'react';
import {
    useProjectsLengthQuery,
    useProjectsQuery,
} from '../../api/projects/projectsApiSlice';
import {
    setPageNumber,
    setMaxPageNumber,
} from '../../features/searchProjects/searchProjectsSlice';
import SearchProjectsArticle from '../SearchProjectsArticle/SearchProjectsArticle';
import ProjectsPagination from '../ProjectsPagination/ProjectsPagination';
import { useUserRoleQuery } from '../../api/userRole/userRoleApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProjectArticle from './ProjectArticle';

import { toast } from 'react-toastify';

import styles from './showProjects.module.css';
import '../../App.css';

const ShowProjects = () => {
    const { currentUserId } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const { data: roleData } = useUserRoleQuery();

    const { data: projectsLength } = useProjectsLengthQuery();
    console.log(projectsLength);
    useEffect(() => {
        const num = Math.ceil(projectsLength?.data?.length / 5);
        console.log(num);

        dispatch(setPageNumber(1));
        // dispatch(setPageNumber(num));
        dispatch(setMaxPageNumber(num));
    }, [projectsLength]);

    const { filterParams, pageNumber } = useSelector((state) => state.search);
    console.log(pageNumber);
    const filterDatas = {
        filterParams,
        currentUserId,
        pageNumber: pageNumber ? pageNumber : '',
    };

    const { data, isLoading, isError, error } = useProjectsQuery(filterDatas);

    if (isError) {
        toast.error(error.message);
    }

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <section className="app">
            <SearchProjectsArticle />
            <div className={styles.someDiv}>
                {data?.data.map((project) => {
                    return (
                        <ProjectArticle key={project.id} project={project} />
                    );
                })}
            </div>

            <ProjectsPagination />
        </section>
    );
};

export default ShowProjects;

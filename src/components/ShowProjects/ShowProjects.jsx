import { useProjectsQuery } from '../../api/projects/projectsApiSlice';
import Header from '../Header/Header';
import { useUserRoleQuery } from '../../api/userRole/userRoleApiSlice';
import { useSelector } from 'react-redux';
import ProjectArticle from './ProjectArticle';
import { useDispatch } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';

import styles from './showProjects.module.css';
import '../../App.css';
import { useEffect } from 'react';

const ShowProjects = () => {
    const { currentUserId } = useSelector((state) => state.auth);
    const { filterParams } = useSelector((state) => state.search);
    console.log(currentUserId);
    const { data: roleData } = useUserRoleQuery();
    const filterDatas = {
        filterParams,
        currentUserId,
    };
    const { data, isLoading, isError, error } = useProjectsQuery(filterDatas);

    useEffect(() => {}, [filterParams]);

    const dispatch = useDispatch();

    if (isError) {
        console.log(error);
    }
    return (
        <section className="app">
            <Header />
            {data?.data.map((project) => {
                return <ProjectArticle key={project.id} project={project} />;
            })}
            <button type="button" onClick={() => dispatch(logOut())}>
                LogOut
            </button>
            <h2>ShowProjects page</h2>
        </section>
    );
};

export default ShowProjects;

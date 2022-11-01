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

import { useDispatch, useSelector } from 'react-redux';
import ProjectArticle from './ProjectArticle';
import DeleteProjectModal from '../Elements/Modals/DeleteProjectModal';
import { toast } from 'react-toastify';

import styles from './showProjects.module.css';
import '../../App.css';
import { useState } from 'react';

const ShowProjects = () => {
    const { currentUserId } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const { data: projectsLength } = useProjectsLengthQuery(currentUserId);

    const [showModal, setShowModal] = useState({ showModal: false, id: null });

    useEffect(() => {
        const num = Math.ceil(projectsLength?.data?.length / 5);
        dispatch(setPageNumber(1));

        dispatch(setMaxPageNumber(num));
    }, [projectsLength]);

    const { filterParams, pageNumber } = useSelector((state) => state.search);

    const filterDatas = {
        filterParams,
        currentUserId,
        pageNumber: pageNumber ? pageNumber : '',
    };

    const {
        data: projects,
        isLoading: projectsLoading,
        isError: isProjectsError,
        error: projectsError,
    } = useProjectsQuery(filterDatas);

    const projectsLoadingReturn = () => {
        return <h2>Loading...</h2>;
    };
    useEffect(() => {
        if (isProjectsError) {
            toast.error(projectsError.message);
        }

        if (projectsLoading) {
            projectsLoadingReturn();
        }
    }, [isProjectsError, projectsLoading]);

    return (
        <section className="app">
            {showModal.showModal ? (
                <DeleteProjectModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                ></DeleteProjectModal>
            ) : null}
            <SearchProjectsArticle />
            <div className={styles.projectsDiv}>
                {projects?.data.map((project) => {
                    return (
                        <ProjectArticle
                            key={project.id}
                            project={project}
                            showModalFunc={setShowModal}
                            showModal={showModal}
                        />
                    );
                })}
            </div>

            <ProjectsPagination />
        </section>
    );
};

export default ShowProjects;

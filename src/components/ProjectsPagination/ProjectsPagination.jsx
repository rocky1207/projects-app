import React from 'react';
import Pagination from '../Elements/Pagination/Pagination';
import { getPageNumber } from '../../features/searchProjects/searchProjectsSlice';
import { useDispatch } from 'react-redux';
import styles from './projectsPagination.module.css';

const ProjectsPagination = () => {
    const dispatch = useDispatch();
    let maxPages = 3;

    return (
        <div className={styles.paginationRootDiv}>
            <div className={styles.paginationContainerDiv}>
                <Pagination
                    count={maxPages}
                    className={styles.pagination}
                    onClick={(e) => {
                        dispatch(
                            getPageNumber({
                                pageNumber: e.target.innerText,
                                maxPages,
                            })
                        );
                        console.log(e.target.innerText);
                    }}
                />
            </div>
        </div>
    );
};

export default ProjectsPagination;

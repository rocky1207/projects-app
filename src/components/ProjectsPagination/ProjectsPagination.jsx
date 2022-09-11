import React from 'react';
import Pagination from '../Elements/Pagination/Pagination';
import { getPageNumber } from '../../features/searchProjects/searchProjectsSlice';
import { useDispatch, useSelector } from 'react-redux';

import styles from './projectsPagination.module.css';

const ProjectsPagination = () => {
    const dispatch = useDispatch();

    const { maxPageNumber } = useSelector((state) => state.search);

    return (
        <div className={styles.paginationRootDiv}>
            <div className={styles.paginationContainerDiv}>
                <Pagination
                    count={maxPageNumber}
                    className={styles.pagination}
                    onClick={(e) => {
                        dispatch(
                            getPageNumber({
                                pageNumber: e.target.innerText,
                                maxPageNumber,
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

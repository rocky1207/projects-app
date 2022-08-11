import React from 'react';
import { Pagination } from '@material-ui/lab';
import { getPageNumber } from '../../features/searchProjects/searchProjectsSlice';
import { useDispatch } from 'react-redux';
import styles from './projectsPagination.module.css';

const ProjectsPagination = () => {
    const dispatch = useDispatch();
    return (
        <div className={styles.paginationRootDiv}>
            <div className={styles.paginationContainerDiv}>
                <Pagination
                    count={10}
                    className={styles.pagination}
                    onClick={(e) => dispatch(getPageNumber(e.target.innerText))}
                />
            </div>
        </div>
    );
};

export default ProjectsPagination;

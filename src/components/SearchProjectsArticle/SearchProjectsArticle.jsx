import { useState, useEffect } from 'react';
import Button from '../Elements/Button/Button';
import { searchProjects } from '../../features/searchProjects/searchProjectsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addProjectMembers } from '../../features/projects/projectsSlice';
import { Link } from 'react-router-dom';

import doc from '../../assets/icons/document.png';
import search from '../../assets/icons/search.png';
import styles from './searchProjectsArticle.module.css';
import { useUserRoleQuery } from '../../api/userRole/userRoleApiSlice';

const SearchProjectsArticle = ({ role }) => {
    const { members } = useSelector((state) => state.projects);

    const dispatch = useDispatch();
    const { data: roleData, isSuccess: isRoleDataSuccess } = useUserRoleQuery();

    const [searchProjectsValue, setSearchProjectsValue] = useState('');
    const buttonProps = {
        value: '+ Add Project',
        elClassName: 'button',
    };
    useEffect(() => {
        if (members.length > 0) {
            dispatch(addProjectMembers(null));
        }
        dispatch(searchProjects(searchProjectsValue));
    }, [members]);
    useEffect(() => {
        dispatch(searchProjects(searchProjectsValue));
    }, [searchProjectsValue]);

    return (
        <article className={`flex ${styles.searchProjectsArticle}`}>
            <div className={`flex ${styles.searchProjectsHeadDiv}`}>
                <img src={doc} alt="document" />
                <div className={styles.searchProjectsArticleHead}>
                    <h2>Projects</h2>
                    <p>Here you'll find all your projects</p>
                </div>
            </div>
            <div className={styles.searchProjectsDiv}>
                <img src={search} alt="search" />
                <input
                    type="text"
                    placeholder="Search for project"
                    value={searchProjectsValue}
                    onChange={(e) => setSearchProjectsValue(e.target.value)}
                />
            </div>
            {role === 'ProjectManager' ? (
                <Link to="create-project">
                    <Button props={buttonProps}></Button>
                </Link>
            ) : null}
        </article>
    );
};

export default SearchProjectsArticle;

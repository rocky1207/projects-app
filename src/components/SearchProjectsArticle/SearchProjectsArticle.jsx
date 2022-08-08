import { useState } from 'react';
import Button from '../Elements/Button/Button';
import { searchProjects } from '../../features/searchProjects/searchProjectsSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import doc from '../../assets/icons/document.png';
import search from '../../assets/icons/search.png';
import styles from './searchProjectsArticle.module.css';

const SearchProjectsArticle = () => {
    const dispatch = useDispatch();

    const [searchProjectsValue, setSearchProjectsValue] = useState('');
    const buttonProps = {
        value: '+ Add Project',
        elClassName: 'button',
    };

    useEffect(() => {
        dispatch(searchProjects(searchProjectsValue));
    }, [searchProjectsValue]);

    return (
        <div className={`flex ${styles.searchProjectsArticle}`}>
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
            <Button props={buttonProps}></Button>
        </div>
    );
};

export default SearchProjectsArticle;

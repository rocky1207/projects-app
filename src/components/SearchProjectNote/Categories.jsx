import { useState, useEffect } from 'react';

import { useGetCategoriesQuery } from '../../api/categories/categoriesApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { categoryInfo } from '../../features/categories/categoriesSlice';

import Button from '../Elements/Button/Button';
import searchButton from '../../assets/icons/search.png';

import styles from './searchProjectNote.module.css';

const Categories = ({ criteria, setCriteria, role }) => {
    const { isDark } = useSelector((state) => state.theme);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [category, setCategorie] = useState({
        categorieId: 1,
        categorieName: 'Project Managment',
    });
    console.log(isDark);
    const [buttonProps, setButtonProps] = useState({
        value: 'Add Note',
        elClassName: 'button',
        additionalElClassName: 'buttonNote',
        type: 'button',
        action: () => {
            navigate('/create-note');
        },
    });
    const {
        data: categoriesData,
        isSuccess: isCategoriesSuccess,
        error: getCategoriesError,
    } = useGetCategoriesQuery();

    useEffect(() => {
        if (isCategoriesSuccess) {
            setCategories(categoriesData.data);
        }
        if (getCategoriesError)
            console.log(getCategoriesError.data.error.message);
    }, [isCategoriesSuccess, getCategoriesError]);
    useEffect(() => {
        dispatch(categoryInfo(category));
    }, [category]);

    let select = category.categorieId;

    return (
        <>
            <div className={`flex ${styles.addNoteDiv}`}>
                <ul className={`flex ${styles.categories}`}>
                    {categories.map((categorie) => {
                        return (
                            <li
                                className={
                                    isDark && select === categorie.id
                                        ? `${styles.liMarkedDark} ${styles.liDark}`
                                        : !isDark && select === categorie.id
                                        ? `${styles.liMarkedLight} ${styles.liLight}`
                                        : null
                                }
                                key={categorie.id}
                                onClick={() => {
                                    setCategorie({
                                        categorieId: categorie.id,
                                        categorieName:
                                            categorie.attributes.name,
                                    });
                                }}
                            >
                                <span
                                    className={
                                        isDark
                                            ? `${styles.liDark}`
                                            : `${styles.liLight}`
                                    }
                                >
                                    {categorie.attributes.name}
                                </span>
                            </li>
                        );
                    })}
                </ul>
                {role === 'ProjectManager' ? (
                    <Button props={buttonProps}></Button>
                ) : null}
            </div>
            <div className={styles.searchInputDiv}>
                <img src={searchButton} alt="Search Note" />
                <input
                    value={criteria}
                    type="text"
                    placeholder="Search for Notes"
                    onChange={(e) => setCriteria(e.target.value)}
                />
            </div>
        </>
    );
};

export default Categories;

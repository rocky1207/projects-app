import { useState, useEffect } from 'react';
import { useGetCategoriesQuery } from '../../api/categories/categoriesApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { categoryInfo } from '../../features/categories/categoriesSlice';

import Button from '../Elements/Button/Button';
import searchButton from '../../assets/icons/search.png';

import styles from './searchProjectNote.module.css';

const Categories = ({ criteria, setCriteria }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [category, setCategorie] = useState({
        categorieId: 1,
        categorieName: 'Project Managment',
    });

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
                                    select === categorie.id
                                        ? `${styles.liMarked}`
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
                                {categorie.attributes.name}
                            </li>
                        );
                    })}
                </ul>
                <Button props={buttonProps}></Button>
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

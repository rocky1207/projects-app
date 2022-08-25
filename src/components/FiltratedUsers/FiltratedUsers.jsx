import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import defaultAvatar from '../../assets/icons/defaultAvatad.jpg';
import Button from '../Elements/Button/Button';
import { useDispatch } from 'react-redux';
import { addProjectMembers } from '../../features/projects/projectsSlice';
import { removeProjectMember } from '../../features/projects/projectsSlice';
import styles from './filtratedUsers.module.css';
import '../../App.css';

const FiltratedUsers = ({ employee }) => {
    const dispatch = useDispatch();
    const [addRemove, setAddRemove] = useState(true);
    const [buttonProps, setButtonProps] = useState({
        value: 'Add',
        elClassName: 'btn',
        type: 'button',
        action: () => {
            setAddRemove((prev) => !prev);
            dispatch(addProjectMembers(employee.id));
        },
    });

    const api_url = 'http://localhost:1337';
    const avatar = employee?.logo?.formats.thumbnail.url;

    useEffect(() => {
        if (addRemove === false) {
            setButtonProps({
                ...buttonProps,
                value: 'Remove',
                action: () => {
                    setAddRemove((prev) => !prev);
                    dispatch(removeProjectMember(employee.id));
                },
            });
        } else {
            setButtonProps({
                ...buttonProps,
                value: 'Add',
                elClassName: 'btn',
                type: 'button',
                action: () => {
                    setAddRemove((prev) => !prev);
                    dispatch(addProjectMembers(employee.id));
                },
            });
        }
    }, [addRemove]);

    return (
        <article className={`flex ${styles.filtratedUsersArticle}`}>
            <div className="flex">
                <figure className={styles.filtratedUsersAvatar}>
                    <img
                        src={avatar ? `${api_url}${avatar}` : defaultAvatar}
                        alt="avatar"
                    />
                </figure>
                <div className={styles.employeeInfo}>
                    <p className={styles.employeeInfoUsername}>
                        {employee.username}
                    </p>
                    <p className={styles.employeeInfoEmail}>{employee.email}</p>
                </div>
            </div>
            <Button props={buttonProps} />
        </article>
    );
};

export default FiltratedUsers;

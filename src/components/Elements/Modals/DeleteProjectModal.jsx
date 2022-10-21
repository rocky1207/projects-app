import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import { useDeleteProjectMutation } from '../../../api/projects/projectsApiSlice';
import styles from './modal.module.css';
import { useEffect } from 'react';

const DeleteProjectModal = ({ showModal, setShowModal }) => {
    const [deleteProject, { data, isSucces, isError, error }] =
        useDeleteProjectMutation();
    useEffect(() => {
        if (isSucces) console.log(data);
        if (isError) console.log(error);
    }, [isSucces, isError]);
    const deleteProjectById = async () => {
        try {
            console.log('delete' + showModal.id);
            await deleteProject(showModal.id);
        } catch (error) {
            console.log(error);
        }
    };
    const propsCancelButton = {
        value: 'Cancel',
        elClassName: 'cancelButton',
        additionalElClassName: 'confirmButtons',
        type: 'button',
        action: () => setShowModal({ ...showModal, showModal: false }),
    };
    const propsDeleteButton = {
        value: 'Delete',
        elClassName: 'deleteButton',
        additionalElClassName: 'confirmButtons',
        type: 'button',
        action: () => {
            deleteProjectById();
            setShowModal({ ...showModal, showModal: false });
        },
    };
    return createPortal(
        <section className={styles.modalBackground}>
            <article className={styles.modalArticle}>
                <h3>Confirm Deletion</h3>
                <p>
                    Are You sure you want to delete project #{' '}
                    <span>{showModal.id}</span>? This action can not be undone!
                </p>
                <div className={`flex ${styles.confirmButtonsDiv}`}>
                    <Button props={propsCancelButton}></Button>
                    <Button props={propsDeleteButton}></Button>
                </div>
            </article>
        </section>,
        document.getElementById('deleteProjectModal')
    );
};

export default DeleteProjectModal;

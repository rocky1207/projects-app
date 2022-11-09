import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';

import { projectLogoState } from '../../../features/projects/projectsSlice';

import styles from './modal.module.css';

const EditProjectLogoModal = ({
    showModal,
    setShowModal,
    editLogoId,
    deleteUploadedImage,
}) => {
    const projectInfo = showModal.projectInfo;
    const dispatch = useDispatch();

    const propsCancelButton = {
        value: 'Cancel',
        elClassName: 'cancelButton',
        additionalElClassName: 'confirmButtons',
        type: 'button',
        action: () => {
            deleteUploadedImage(showModal.logoId);
            setShowModal({ ...showModal, showModal: false });
        },
    };
    const propsDeleteButton = {
        value: 'Edit',
        elClassName: 'deleteButton',
        additionalElClassName: 'confirmButtons',
        type: 'button',
        action: () => {
            editLogoId();
            setShowModal({ ...showModal, showModal: false });
            dispatch(
                projectLogoState({
                    id: projectInfo.id,
                    attributes: {
                        name: projectInfo.name,
                        description: projectInfo.description,
                        employees: projectInfo.employees,
                        logo: {
                            data: {
                                attributes: {
                                    formats: {
                                        thumbnail: { url: showModal.logo },
                                    },
                                },
                            },
                        },
                    },
                })
            );
        },
    };
    return createPortal(
        <section className={styles.modalBackground}>
            <article className={styles.modalArticle}>
                <h3>Confirm Edit</h3>
                <p>Are You sure you want to change the project logo?</p>
                <div className={`flex ${styles.confirmButtonsDiv}`}>
                    <Button props={propsCancelButton}></Button>
                    <Button props={propsDeleteButton}></Button>
                </div>
            </article>
        </section>,
        document.getElementById('editProjectLogoModal')
    );
};

export default EditProjectLogoModal;

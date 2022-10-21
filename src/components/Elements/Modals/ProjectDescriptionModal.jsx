import { createPortal } from 'react-dom';

import Button from '../Button/Button';

import styles from './modal.module.css';

const ProjectDescriptionModal = ({
    showProjectDescriptionModal,
    setShowDescriptionModal,
    projectInfo,
}) => {
    const propsCloseButton = {
        value: 'Close',
        elClassName: 'deleteButton',
        additionalElClassName: 'confirmButtons',
        type: 'button',
        action: () => {
            setShowDescriptionModal({
                // description: projectInfo.description,
                ...showProjectDescriptionModal,
                show: false,
            });
        },
    };

    return createPortal(
        <section className={styles.modalBackground}>
            <article className={styles.modalArticle}>
                <h3>Project Description</h3>
                <p>{showProjectDescriptionModal.description}</p>
                <div className={`flex ${styles.confirmButtonsDiv}`}>
                    <Button props={propsCloseButton}></Button>
                </div>
            </article>
        </section>,
        document.getElementById('projectDescriptionModal')
    );
};

export default ProjectDescriptionModal;

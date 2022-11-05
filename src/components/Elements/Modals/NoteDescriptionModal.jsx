import { createPortal } from 'react-dom';
import Button from '../Button/Button';

import styles from './modal.module.css';

const NoteDescriptionModal = ({
    showDescriptionModal,
    setShowDescriptionModal,
}) => {
    const propsCloseButton = {
        value: 'Close',
        elClassName: 'deleteButton',
        additionalElClassName: 'confirmButtons',
        type: 'button',
        action: () => {
            setShowDescriptionModal({ showModal: false, description: '' });
        },
    };

    return createPortal(
        <section className={styles.modalBackground}>
            <article className={styles.modalArticle}>
                <h3>Note Description</h3>
                <p>{showDescriptionModal.description}</p>
                <div className={`flex ${styles.confirmButtonsDiv}`}>
                    <Button props={propsCloseButton}></Button>
                </div>
            </article>
        </section>,
        document.getElementById('noteDescriptionModal')
    );
};

export default NoteDescriptionModal;

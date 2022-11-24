import { createPortal } from 'react-dom';
import Button from '../Button/Button';

import styles from './modal.module.css';

const DeletetNoteModal = ({
    showDeleteModal,
    setShowDeleteModal,
    deleteNoteFunc,
}) => {
    const propsCancelButton = {
        value: 'Cancel',
        elClassName: 'cancelButton',
        additionalElClassName: 'confirmButtons',
        type: 'button',
        action: () => {
            setShowDeleteModal({ noteId: null, showModal: false });
        },
    };
    const propsDeleteButton = {
        value: 'Delete',
        elClassName: 'deleteButton',
        additionalElClassName: 'confirmButtons',
        type: 'button',
        action: () => {
            setShowDeleteModal({ noteId: null, showModal: false });
            deleteNoteFunc(showDeleteModal.noteId);
        },
    };
    return createPortal(
        <section className={styles.modalBackground}>
            <article className={styles.modalArticle}>
                <h3>Confirm Deletion</h3>
                <p
                    className={
                        showDeleteModal.isDark
                            ? `${styles.modalDark}`
                            : `${styles.modalLight}`
                    }
                >
                    Are You sure you want to delete note #
                    {showDeleteModal.noteId}
                    <span>{showDeleteModal.id}</span>? This action can not be
                    undone!
                </p>
                <div className={`flex ${styles.confirmButtonsDiv}`}>
                    <Button props={propsCancelButton}></Button>
                    <Button props={propsDeleteButton}></Button>
                </div>
            </article>
        </section>,
        document.getElementById('deleteNoteModal')
    );
};

export default DeletetNoteModal;

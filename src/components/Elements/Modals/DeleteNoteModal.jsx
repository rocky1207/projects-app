import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';

import styles from './modal.module.css';

const DeletetNoteModal = ({ showModal, setShowModal, deleteNoteFunc }) => {
    const projectInfo = showModal.projectInfo;
    console.log(showModal);
    const dispatch = useDispatch();

    const propsCancelButton = {
        value: 'Cancel',
        elClassName: 'cancelButton',
        additionalElClassName: 'confirmButtons',
        type: 'button',
        action: () => {
            setShowModal({ noteId: null, showModal: false });
        },
    };
    const propsDeleteButton = {
        value: 'Delete',
        elClassName: 'deleteButton',
        additionalElClassName: 'confirmButtons',
        type: 'button',
        action: () => {
            setShowModal({ noteId: null, showModal: false });
            deleteNoteFunc(showModal.noteId);
        },
    };
    return createPortal(
        <section className={styles.modalBackground}>
            <article className={styles.modalArticle}>
                <h3>Confirm Deletion</h3>
                <p>
                    Are You sure you want to delete note #{showModal.noteId}
                    <span>{showModal.id}</span>? This action can not be undone!
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

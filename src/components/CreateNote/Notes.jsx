import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDeleteNoteMutation } from '../../api/notes/notesApiSlice';
import DeleteNoteModal from '../Elements/Modals/DeleteNoteModal';
import NoteDescriptionModal from '../Elements/Modals/NoteDescriptionModal';
import noteDoc from '../../assets/icons/note.png';
import edit from '../../assets/icons/edit-button.png';
import remove from '../../assets/icons/close-button.png';
import defaultAvatar from '../../assets/icons/defaultAvatad.jpg';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import styles from './createNote.module.css';

const Notes = ({ notes, role }) => {
    const { avatar } = useSelector((state) => state.projects);
    const api_url = 'http://localhost:1337';
    const navigate = useNavigate();

    const [showDeleteModal, setShowDeleteModal] = useState({
        noteId: null,
        showModal: false,
    });
    const [showDescriptionModal, setShowDescriptionModal] = useState({
        showModal: false,
        description: '',
    });

    const [deleteNote, { isSuccess: isNoteDeleted, error: deletationError }] =
        useDeleteNoteMutation();
    useEffect(() => {
        if (isNoteDeleted) {
            toast.success('Note deleted!');
        }
        if (deletationError) {
            toast.error(deletationError.data.error.message);
        }
    }, [isNoteDeleted, deletationError]);

    const deleteNoteFunc = async (id) => {
        try {
            await deleteNote(id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className={`flex ${styles.notesSection}`}>
            {notes?.data?.map((note) => {
                const noteDescriptionArray =
                    note.attributes.description.split(' ');
                let shortDescription = '';
                if (noteDescriptionArray.length > 4) {
                    shortDescription =
                        noteDescriptionArray.slice(0, 4).join(' ') + '...';
                } else {
                    shortDescription = noteDescriptionArray.join(' ');
                }

                return (
                    <article key={note.id} className={styles.noteArticle}>
                        <div className={`flex ${styles.noteTitleDiv}`}>
                            <h3>{note.attributes.title}</h3>
                            {role === 'ProjectManager' ? (
                                <figure className={styles.editRemoveFigure}>
                                    <img
                                        src={edit}
                                        alt="Edit Note"
                                        onClick={() => {
                                            navigate('/edit-note/' + note.id);
                                        }}
                                    />
                                    <img
                                        src={remove}
                                        alt="Remove Note"
                                        onClick={() =>
                                            setShowDeleteModal({
                                                noteId: note.id,
                                                showModal: true,
                                            })
                                        }
                                    />
                                </figure>
                            ) : null}
                        </div>
                        <p
                            className={styles.description}
                            onClick={() =>
                                setShowDescriptionModal({
                                    showModal: true,
                                    description: note.attributes.description,
                                })
                            }
                        >
                            {shortDescription}
                        </p>

                        <figure className={styles.docFigure}>
                            <img src={noteDoc} alt="Document" />
                        </figure>
                        <div className={`flex ${styles.avatarDiv}`}>
                            <figure className={styles.avatarFigure}>
                                <img
                                    src={
                                        avatar
                                            ? `${api_url}${avatar}`
                                            : defaultAvatar
                                    }
                                    alt="Avatar"
                                />
                            </figure>
                            <p className={styles.avatarUsername}>
                                {
                                    note.attributes.author.data.attributes
                                        .username
                                }
                            </p>
                            <div className={styles.avatarEmail}>
                                <p className={styles.avatarUsername}>
                                    {
                                        note.attributes.author.data.attributes
                                            .email
                                    }
                                </p>
                            </div>
                        </div>
                    </article>
                );
            })}
            {showDeleteModal.showModal ? (
                <DeleteNoteModal
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                    deleteNoteFunc={deleteNoteFunc}
                ></DeleteNoteModal>
            ) : null}
            {showDescriptionModal.showModal ? (
                <NoteDescriptionModal
                    showDescriptionModal={showDescriptionModal}
                    setShowDescriptionModal={setShowDescriptionModal}
                ></NoteDescriptionModal>
            ) : null}
        </section>
    );
};

export default Notes;

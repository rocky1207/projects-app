import { useState, useEffect } from 'react';
import CreateNoteForm from './CreateNoteForm';

import { createNoteFunc } from './createNoteFunctions/createNoteFunc';
import Button from '../Elements/Button/Button';
import doc from '../../assets/icons/document.png';
import { usePostNoteMutation } from '../../api/notes/notesApiSlice';
import { useUploadImageMutation } from '../../api/uplaodImage/uploadImageApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '../../App.css';
import styles from './createNote.module.css';
import themeStyles from '../../theme.module.css';

import { toast } from 'react-toastify';

const CreateNote = () => {
    const navigate = useNavigate();
    const { currentUserId } = useSelector((state) => state.auth);
    const { projectInfo } = useSelector((state) => state.projects);
    const { isDark } = useSelector((state) => state.theme);

    const [note, setNote] = useState({
        noteTitle: '',
        noteDescription: '',
        imageState: '',
        categoryId: 1,
    });
    const [select, setSelect] = useState(1);

    const [postNote, { isSuccess: isNoteSuccess, error: noteError }] =
        usePostNoteMutation();

    const [
        uploadImage,
        {
            data: uploadImageData,
            isSuccess: uploadImageDataSuccess,
            error: uploadImageError,
        },
    ] = useUploadImageMutation();
    useEffect(() => {
        if (uploadImageDataSuccess) {
            createNoteFunc(
                uploadImageData,
                currentUserId,
                note,
                projectInfo,
                postNote,
                toast
            );
        }
        if (uploadImageError) {
            toast.error('upload image error: ' + uploadImageError.message);
        }
    }, [uploadImageDataSuccess, uploadImageError]);
    useEffect(() => {
        if (isNoteSuccess) {
            setNote({
                noteTitle: '',
                noteDescription: '',
                imageState: null,
                categoryId: null,
            });
            navigate(`/project/${projectInfo.id}`);
            toast.success('Success!');
        }
        if (noteError) {
            toast.error(noteError.data.error.details.message);
        }
    }, [isNoteSuccess, noteError]);
    const uploadImageFunc = async () => {
        if (note.imageState) {
            try {
                uploadImage(note.imageState);
            } catch (err) {
                console.log(err);
            }
        } else {
            createNoteFunc(
                uploadImageData,
                currentUserId,
                note,
                projectInfo,
                postNote,
                toast
            );
        }
    };

    const buttonProps = {
        value: 'Save',
        elClassName: 'button',
        action: () => uploadImageFunc(),
    };
    return (
        <div
            className={isDark ? `${themeStyles.dark}` : `${themeStyles.light}`}
        >
            <section className="app">
                <article className={`flex ${styles.createNoteArticle}`}>
                    <div className={`flex ${styles.searchProjectsHeadDiv}`}>
                        <img src={doc} alt="document" />
                        <div className={styles.searchProjectsArticleHead}>
                            <h2>Create a Note</h2>
                            <p>Here you can create a new note</p>
                        </div>
                    </div>

                    <Button props={buttonProps}></Button>
                </article>
                <CreateNoteForm
                    setNote={setNote}
                    note={note}
                    select={select}
                    setSelect={setSelect}
                    isDark={isDark}
                ></CreateNoteForm>
            </section>
        </div>
    );
};

export default CreateNote;

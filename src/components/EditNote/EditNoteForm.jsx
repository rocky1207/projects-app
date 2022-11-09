import { useEffect } from 'react';
import Select from '../Elements/Select/Select';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { noteEdit } from '../../features/notes/notesSlice';
import styles from '../CreateNote/createNote.module.css';

const EditNoteForm = ({
    note,
    setNote,
    select,
    setSelectProps,
    selectProps,
    selectChangeFunc,
    categoriesDataState,
}) => {
    const editNoteData = useSelector((state) => state.notes);

    const dispatch = useDispatch();

    useEffect(() => {
        if (select) {
            setNote({
                noteTitle: editNoteData.noteTitle,
                noteDescription: editNoteData.noteDescription,
                imageState: editNoteData.imageState,
                categoryId: select,
            });
            setSelectProps({
                elClassName: 'categorySelect',
                optionClassName: 'categoryOption',
                value: categoriesDataState,
                selectedOption: select,
                action: selectChangeFunc,
            });
        }
    }, [select, categoriesDataState]);

    const formData = new FormData();
    return (
        <form className={`flex ${styles.createNoteForm}`}>
            <h2>Project Info</h2>
            <div>
                <div className={styles.createNoteFields}>
                    <div>
                        <label className={styles.createNoteLabel}>
                            Note title:
                        </label>
                        <input
                            className={styles.noteTitleInput}
                            value={note?.noteTitle}
                            type="text"
                            placeholder="Enter Note title"
                            onChange={(e) => {
                                setNote({
                                    ...note,
                                    noteTitle: e.target.value,
                                });
                                dispatch(
                                    noteEdit({
                                        ...editNoteData,
                                        noteTitle: e.target.value,
                                    })
                                );
                            }}
                        />
                    </div>

                    <label className={styles.noteFileLabel}>
                        <input
                            className={styles.noteFileInput}
                            type="file"
                            onChange={(e) => {
                                formData.append('files', e.target.files[0]);
                                setNote({
                                    ...note,
                                    imageState: formData,
                                });
                            }}
                        />
                        Upload File
                    </label>
                </div>
                <div className={styles.textAreaDiv}>
                    <label className={styles.createNoteLabel}>
                        Note Description:
                    </label>
                    <textarea
                        value={note?.noteDescription}
                        onChange={(e) => {
                            setNote({
                                ...note,
                                noteDescription: e.target.value,
                            });
                            dispatch(
                                noteEdit({
                                    ...editNoteData,
                                    noteDescription: e.target.value,
                                })
                            );
                        }}
                    ></textarea>
                </div>
                <div className={styles.chooseCategoryDiv}>
                    <label className={styles.createNoteLabel}>
                        Choose a category
                    </label>
                    <Select props={selectProps}></Select>
                </div>
            </div>
        </form>
    );
};

export default EditNoteForm;

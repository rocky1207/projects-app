import { useEffect, useState } from 'react';
import Select from '../Elements/Select/Select';
import { useGetCategoriesQuery } from '../../api/categories/categoriesApiSlice';

import styles from './createNote.module.css';

const CreateNoteForm = ({ note, setNote, select, setSelect }) => {
    const {
        data: categoriesData,
        isSuccess: categoriesSuccess,
        error: categoriesError,
    } = useGetCategoriesQuery();

    const formData = new FormData();
    const selectChangeFunc = (e) => {
        setSelect(parseInt(e.target.value));
    };
    useEffect(() => {
        if (select) {
            setNote({ ...note, categoryId: select });
        }
    }, [select]);
    const selectProps = {
        elClassName: 'categorySelect',
        optionClassName: 'categoryOption',
        value: categoriesData?.data,
        select: select,
        action: selectChangeFunc,
    };
    console.log(note);
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
                            value={note.noteTitle}
                            className={styles.noteTitleInput}
                            type="text"
                            placeholder="Enter Note title"
                            onChange={(e) =>
                                setNote({ ...note, noteTitle: e.target.value })
                            }
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
                        value={note.noteDescription}
                        onChange={(e) =>
                            setNote({
                                ...note,
                                noteDescription: e.target.value,
                            })
                        }
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

export default CreateNoteForm;

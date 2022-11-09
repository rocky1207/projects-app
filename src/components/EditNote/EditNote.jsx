import { useState, useEffect } from 'react';
import EditNoteForm from './EditNoteForm';
import { noteEdit } from '../../features/notes/notesSlice';
import { editNoteFunc } from '../CreateNote/createNoteFunctions/createNoteFunc';
import Button from '../Elements/Button/Button';
import doc from '../../assets/icons/document.png';
import { useGetNoteByIdQuery } from '../../api/notes/notesApiSlice';
import { useEditNoteMutation } from '../../api/notes/notesApiSlice';
import { useUploadImageMutation } from '../../api/uplaodImage/uploadImageApiSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetCategoriesQuery } from '../../api/categories/categoriesApiSlice';

import '../../App.css';
import styles from '../CreateNote/createNote.module.css';
const EditNote = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { currentUserId } = useSelector((state) => state.auth);
    const { projectInfo } = useSelector((state) => state.projects);

    const dispatch = useDispatch();
    const [categoriesDataState, setCategoriesDataState] = useState([]);

    const [paramsId, setParamsId] = useState(parseInt(params.id));
    const [select, setSelect] = useState(1);
    const [selectProps, setSelectProps] = useState({
        elClassName: '',
        optionClassName: '',
        value: [],
        selectedOption: select,
        action: () => {},
    });

    const [note, setNote] = useState({
        noteTitle: '',
        noteDescription: '',
        imageState: null,
        categoryId: '',
    });

    const { data: categoriesData, isSuccess: categoriesSuccess } =
        useGetCategoriesQuery();

    useEffect(() => {
        if (categoriesSuccess) {
            setCategoriesDataState(categoriesData?.data);
        }
    }, [categoriesSuccess]);
    const { data: getNoteData } = useGetNoteByIdQuery(parseInt(params.id));

    useEffect(() => {
        if (getNoteData) {
            setNote({
                noteTitle: getNoteData?.data?.attributes?.title,
                noteDescription: getNoteData?.data?.attributes?.description,
                imageState: null,
                categoryId: getNoteData?.data?.attributes?.category?.data.id,
            });

            dispatch(
                noteEdit({
                    noteTitle: getNoteData?.data?.attributes?.title,
                    noteDescription: getNoteData?.data?.attributes?.description,
                    imageState: null,
                    categoryId:
                        getNoteData?.data?.attributes?.category?.data.id,
                })
            );
            setSelect(getNoteData?.data?.attributes?.category?.data.id);
        }
    }, [getNoteData]);

    const [editNote, { isSuccess: isEditNoteSuccess, error: editNoteError }] =
        useEditNoteMutation();

    const [
        uploadImage,
        {
            data: uploadImageData,
            isSuccess: uploadImageDataSuccess,
            error: uploadImageError,
        },
    ] = useUploadImageMutation();
    useEffect(() => {
        if (uploadImageDataSuccess || uploadImageError) {
            editNoteFunc(
                paramsId,
                uploadImageData,
                currentUserId,
                note,
                projectInfo,
                editNote,
                toast
            );
        }
    }, [uploadImageDataSuccess, uploadImageError]);
    useEffect(() => {
        if (isEditNoteSuccess) {
            dispatch(
                noteEdit({
                    noteTitle: '',
                    noteDescription: '',
                    imageState: null,
                    categoryId: null,
                })
            );
            navigate(`/project/${projectInfo.id}`);
            toast.success('Success!');
        }
        if (editNoteError) {
            toast.error(editNoteError.data.error.details.message);
        }
    }, [isEditNoteSuccess, editNoteError]);
    const uploadImageFunc = async () => {
        if (note.imageState) {
            try {
                uploadImage(note.imageState);
            } catch (err) {
                console.log(err);
            }
        } else {
            editNoteFunc(
                paramsId,
                uploadImageData,
                currentUserId,
                note,
                projectInfo,
                editNote,
                toast
            );
        }
    };
    const selectChangeFunc = (e) => {
        setSelect(parseInt(e.target.value));
        setNote({
            ...note,
            categoryId: parseInt(e.target.value),
        });
    };

    const buttonProps = {
        value: 'Save',
        elClassName: 'button',
        action: () => uploadImageFunc(),
    };

    return (
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
            <EditNoteForm
                setNote={setNote}
                note={note}
                select={select}
                categoriesDataState={categoriesDataState}
                selectProps={selectProps}
                setSelectProps={setSelectProps}
                selectChangeFunc={selectChangeFunc}
            ></EditNoteForm>
        </section>
    );
};

export default EditNote;

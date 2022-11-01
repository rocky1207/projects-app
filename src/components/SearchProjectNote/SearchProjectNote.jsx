import EditLogo from './EditLogo';
import Categories from './Categories';
import Notes from '../CreateNote/Notes';
import { useSelector } from 'react-redux';
import { useDeleteUploadedImageMutation } from '../../api/uplaodImage/uploadImageApiSlice';
import { useGetNotesQuery } from '../../api/notes/notesApiSlice';
import { useEditProjectMutation } from '../../api/projects/projectsApiSlice';

import EditProjectLogoModal from '../Elements/Modals/EditProjecLogoModal';
import ProjectDescriptionModal from '../Elements/Modals/ProjectDescriptionModal';

import { toast } from 'react-toastify';

import '../../App.css';
import styles from './searchProjectNote.module.css';
import { useEffect, useState } from 'react';

const SearchProjectNote = () => {
    const { projectInfo, avatar } = useSelector((state) => state.projects);
    const { categoryId } = useSelector((state) => state.categories);

    const [editLogo, setEditLogo] = useState(null);
    const [criteria, setCriteria] = useState('');
    const [cat, setCat] = useState(categoryId);
    const [showProjectDescriptionModal, setShowDescriptionModal] = useState({
        show: false,
        description: '',
    });
    useEffect(() => {
        setCat(categoryId);
    }, [categoryId]);
    const { data: notes } = useGetNotesQuery({
        id: projectInfo.id,
        criteria: criteria,
        categoryId: cat,
    });

    const [
        deleteUploadedImage,
        { isSuccess: isDeletedImage, error: deleteImageError },
    ] = useDeleteUploadedImageMutation();

    useEffect(() => {
        if (isDeletedImage) {
            toast.success('Deleted file');
        }
        if (deleteImageError) {
            toast.error(deleteImageError.data.error.message);
        }
    }, [isDeletedImage, deleteImageError]);

    const [showModal, setShowModal] = useState({
        showModal: false,
        projectId: null,
        logoId: null,
        logo: '',
        projectInfo: projectInfo,
    });

    const [
        editProject,
        {
            data: projectData,
            isSuccess: projectDataSuccess,
            error: projectDataError,
        },
    ] = useEditProjectMutation();
    const editLogoId = async () => {
        const editLogoObj = {
            id: showModal.projectId,
            editProjectState: { data: { logo: showModal.logoId } },
        };

        try {
            await editProject(editLogoObj);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (projectDataSuccess) {
            toast.success('Successfuly added');
        }
        if (projectDataError) {
            console.log(projectDataError);
            toast.error(projectDataError.data.error.message);
        }
    }, [projectDataSuccess, projectDataError]);

    return (
        <section className={`app ${styles.searchNotesSection}`}>
            <EditLogo
                showModal={showModal}
                setShowModal={setShowModal}
                editLogo={editLogo}
                setEditLogo={setEditLogo}
                showProjectDescriptionModal={showProjectDescriptionModal}
                setShowDescriptionModal={setShowDescriptionModal}
                projectInfo={projectInfo}
                avatar={avatar}
            ></EditLogo>
            {showModal.showModal ? (
                <EditProjectLogoModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    editLogoId={editLogoId}
                    deleteUploadedImage={deleteUploadedImage}
                    toast={toast}
                ></EditProjectLogoModal>
            ) : null}
            {showProjectDescriptionModal.show ? (
                <ProjectDescriptionModal
                    showProjectDescriptionModal={showProjectDescriptionModal}
                    setShowDescriptionModal={setShowDescriptionModal}
                    projectInfo={projectInfo}
                ></ProjectDescriptionModal>
            ) : null}
            <Categories
                criteria={criteria}
                setCriteria={setCriteria}
            ></Categories>
            <Notes notes={notes}></Notes>
        </section>
    );
};

export default SearchProjectNote;

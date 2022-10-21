import { useEffect } from 'react';
import ProjectEmployees from './ProjectEmployees';
import { useUploadImageMutation } from '../../api/uplaodImage/uploadImageApiSlice';
import defaultAvatar from '../../assets/icons/defaultAvatad.jpg';
import editButton from '../../assets/icons/edit-button.png';
import { toast } from 'react-toastify';

import styles from './searchProjectNote.module.css';

const EditLogo = ({
    showModal,
    setShowModal,
    editLogo,
    setEditLogo,
    showProjectDescriptionModal,
    setShowDescriptionModal,
    projectInfo,
    avatar,
}) => {
    const api_url = 'http://localhost:1337';

    const formData = new FormData();

    const [
        uplaodImage,
        {
            data: uploadImageData,
            isSuccess: uploadImageSuccess,
            error: uploadImageError,
        },
    ] = useUploadImageMutation();

    const uplaodImageFunc = async () => {
        try {
            await uplaodImage(editLogo);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (editLogo) {
            uplaodImageFunc();
        }
    }, [editLogo]);

    useEffect(() => {
        if (uploadImageSuccess) {
            setShowModal({
                showModal: true,
                projectId: projectInfo.id,
                logoId: uploadImageData[0].id,
                logo: uploadImageData[0].formats.thumbnail.url,
                projectInfo: {
                    ...projectInfo,
                    logo: uploadImageData[0].formats.thumbnail.url,
                },
            });
            toast.success('Image uploaded');
        }
        if (uploadImageError) {
            toast.error(uploadImageError.data.error.message);
        }
    }, [uploadImageSuccess, uploadImageError]);

    let descriptionArray = projectInfo.description.split(' ');
    useEffect(() => {
        if (descriptionArray.length > 2) {
            setShowDescriptionModal({
                ...showProjectDescriptionModal,
                description: `${descriptionArray[0]} ${descriptionArray[1]} ${descriptionArray[2]}...`,
            });
        } else {
            setShowDescriptionModal({
                ...showProjectDescriptionModal,
                description: projectInfo.description,
            });
        }
    }, [projectInfo.description]);

    return (
        <div className={`flex ${styles.searchNotesFlexDiv}`}>
            <form className={styles.projectLogoForm} onSubmit={uplaodImageFunc}>
                <label className={styles.projectLogoDiv} htmlFor="">
                    <input
                        className={styles.editLogoInput}
                        type="file"
                        onChange={(e) => {
                            formData.append('files', e.target.files[0]);

                            setEditLogo(formData);
                        }}
                    />
                    <figure className={styles.projectLogoFigure}>
                        <img
                            className={styles.editProjectLogoImg}
                            src={editButton}
                            alt="Edit Logo"
                        />

                        <img
                            className={styles.projectLogoImg}
                            src={`${api_url}${projectInfo.logo}`}
                            alt="Project Logo"
                        />
                    </figure>
                </label>
                <h2>{projectInfo.name}</h2>
                <p
                    onClick={() => {
                        setShowDescriptionModal({
                            description: projectInfo.description,
                            show: true,
                        });
                    }}
                >
                    {descriptionArray.length > 2
                        ? `${descriptionArray[0]} ${descriptionArray[1]} ${descriptionArray[2]}...`
                        : projectInfo.description}
                </p>
            </form>
            <ProjectEmployees
                api_url={api_url}
                avatar={avatar}
                defaultAvatar={defaultAvatar}
                projectInfo={projectInfo}
            ></ProjectEmployees>
        </div>
    );
};

export default EditLogo;

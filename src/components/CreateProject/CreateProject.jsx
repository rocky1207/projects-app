import { useState, useEffect } from 'react';
import doc from '../../assets/icons/document.png';
import Button from '../Elements/Button/Button';
import ProjectInfo from './ProjectInfo';
import { useUploadImageMutation } from '../../api/uplaodImage/uploadImageApiSlice';
import { deleteAllProjectMembers } from '../../features/projects/projectsSlice';
import { addProjectMembers } from '../../features/projects/projectsSlice';
import { useAddProjectMutation } from '../../api/projects/projectsApiSlice';
import { useGetFiltratedUsersQuery } from '../../api/userRole/userRoleApiSlice';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import styles from './createProject.module.css';
import themeStyles from '../../theme.module.css';

const CreateProject = () => {
    const { currentUserId } = useSelector((state) => state.auth);
    const { members } = useSelector((state) => state.projects);
    const { isDark } = useSelector((state) => state.theme);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [projectLogoFile, setProjectLogoFile] = useState();
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState();
    const [newProjectDatas, setNewProjectDatas] = useState({
        name: '',
        employees: members,
        logo: null,
        description: '',
        author: currentUserId,
    });

    useEffect(() => {
        setNewProjectDatas({
            ...newProjectDatas,
            employees: members,
        });
    }, [members]);

    const [disabled, setDisabled] = useState(true);

    const [
        addProject,
        {
            isSuccess: isProjectAdded,
            isError: isProjectFailed,
            error: addProjectError,
        },
    ] = useAddProjectMutation();
    useEffect(() => {
        if (isProjectAdded) {
            dispatch(addProjectMembers(null));
            toast('Project successfully aded!');
        }
        if (isProjectFailed) {
            toast(addProjectError);
        }
    }, [isProjectAdded, isProjectFailed]);

    const { data: filtratedUsersData } = useGetFiltratedUsersQuery(filter);
    console.log(filtratedUsersData);

    useEffect(() => {
        setEmployees(filtratedUsersData);
    }, [filtratedUsersData]);

    const [uploadImage, { data }] = useUploadImageMutation();

    const formData = new FormData();

    const formDataHandler = (fileString) => {
        if (fileString) {
            formData.append('files', fileString);

            setProjectLogoFile(formData);
        }
    };
    useEffect(() => {
        if (projectLogoFile) {
            newProjectLogo();
        }
    }, [projectLogoFile]);

    const newProjectLogo = async () => {
        try {
            await uploadImage(projectLogoFile);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (data) {
            data.map((dataObj) =>
                setNewProjectDatas({
                    ...newProjectDatas,
                    logo: dataObj.id,
                })
            );
        }
    }, [data]);
    useEffect(() => {
        if (
            newProjectDatas.name &&
            newProjectDatas.employees.length > 0 &&
            newProjectDatas.logo &&
            newProjectDatas.description
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [newProjectDatas]);

    const newProjectSubmit = async () => {
        const datas = { data: newProjectDatas };

        try {
            await addProject(datas);
        } catch (err) {
            toast(err);
        }
    };

    const buttonProps = {
        value: 'Save',
        elClassName: 'button',
        type: 'submit',
        disabled: disabled ? true : false,
        action: () => {
            newProjectSubmit();
        },
    };

    const projectInfoProps = {
        newProjectDatas,
        setNewProjectDatas,
        employees,
        formDataHandler,
        setFilter,
    };

    useEffect(() => {
        if (isProjectAdded) {
            setNewProjectDatas({
                name: '',
                employees: [],
                logo: null,
                description: '',
            });
            dispatch(deleteAllProjectMembers([]));
            navigate('/');
        }
    }, [isProjectAdded]);

    return (
        <div
            className={isDark ? `${themeStyles.dark}` : `${themeStyles.light}`}
        >
            <section className="app">
                <article className={`flex ${styles.createProjectArticle}`}>
                    <div className={`flex ${styles.createProjectHeadDiv}`}>
                        <img src={doc} alt="document" />
                        <div className={styles.createProjectArticleHead}>
                            <h2>Create a Project</h2>
                            <p>Here you can create a new project</p>
                        </div>
                    </div>

                    <Button
                        props={buttonProps}
                        action={() => newProjectSubmit()}
                    ></Button>
                </article>
                <ProjectInfo props={projectInfoProps} />
            </section>
        </div>
    );
};

export default CreateProject;

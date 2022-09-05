import { useState, useEffect } from 'react';
import doc from '../../assets/icons/document.png';
import Button from '../Elements/Button/Button';
import ProjectInfo from './ProjectInfo';
import { useUploadImageMutation } from '../../api/uplaodImage/uploadImageApiSlice';
import { deleteAllProjectMembers } from '../../features/projects/projectsSlice';
import { useAddProjectMutation } from '../../api/projects/projectsApiSlice';
import { useGetFiltratedUsersQuery } from '../../api/userRole/userRoleApiSlice';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from './createProject.module.css';

const CreateProject = () => {
    const { currentUserId } = useSelector((state) => state.auth);
    const { members } = useSelector((state) => state.projects);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectLogoFile, setProjectLogoFile] = useState();
    const [logoId, setLogoId] = useState();
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState();

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
            console.log('added');
            toast('Project successfully aded!');
        }
        if (isProjectFailed) {
            toast(addProjectError);
        }
    }, [isProjectAdded, isProjectFailed]);

    const { data: filtratedUsersData, error: getFiltratedUsersError } =
        useGetFiltratedUsersQuery(filter);

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
            data.map((dataObj) => setLogoId(dataObj.id));
        }
    }, [data]);

    const newProjectDatas = {
        data: {
            name: projectName,
            employees: members,
            logo: logoId,
            description: projectDescription,
            author: currentUserId,
        },
    };

    const newProjectSubmit = async () => {
        try {
            await addProject(newProjectDatas);
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
    console.log(buttonProps);
    useEffect(() => {
        if (
            newProjectDatas.data.name &&
            newProjectDatas.data.employees.length > 0 &&
            newProjectDatas.data.logo &&
            newProjectDatas.data.description
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [newProjectDatas]);
    const projectInfoProps = {
        projectName,
        setProjectName,
        projectDescription,
        setProjectDescription,
        projectLogoFile,
        setProjectLogoFile,
        employees,
        formDataHandler,
        filter,
        setFilter,
    };

    useEffect(() => {
        if (isProjectAdded) {
            setProjectName('');
            setProjectDescription('');
            setEmployees([]);
            dispatch(deleteAllProjectMembers([]));
            navigate('/');
        }
    }, [isProjectAdded]);

    return (
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
    );
};

export default CreateProject;

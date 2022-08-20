import { useState, useEffect } from 'react';
import doc from '../../assets/icons/document.png';
import Button from '../Elements/Button/Button';
import ProjectInfo from './ProjectInfo';
import styles from './createProject.module.css';

import { useUploadImageMutation } from '../../api/uplaodImage/uploadImageApiSlice';
import { useAddProjectMutation } from '../../api/projects/projectsApiSlice';
import { useGetFiltratedUsersQuery } from '../../api/userRole/userRoleApiSlice';

const CreateProject = () => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectLogoFile, setProjectLogoFile] = useState();
    const [logoId, setLogoId] = useState();
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState('');

    const [addProject, { data: addProjectData, error: addProjectError }] =
        useAddProjectMutation();

    const { data: filtratedUsersData, error: getFiltratedUsersError } =
        useGetFiltratedUsersQuery(filter);
    useEffect(() => {
        setEmployees(filtratedUsersData);
    }, [filtratedUsersData]);

    const [uploadImage, { data, isSuccess, isError, error }] =
        useUploadImageMutation();

    const formData = new FormData();

    const formDataHandler = (hm) => {
        if (hm) {
            formData.append('files', hm);

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
    console.log(logoId);

    const buttonProps = {
        value: 'Save',
        elClassName: 'button',
        type: 'submit',
    };
    console.log(projectName);
    console.log(projectDescription);
    console.log(projectLogoFile);
    const newProjectDatas = {
        data: {
            name: 'seventh project',
            employees: [20, 22],
            logo: 199,
            description: 'test description 7',
            author: 1,
        },
    };
    const newProjectSubmit = async () => {
        try {
            await addProject(newProjectDatas);
        } catch (err) {
            console.log(err);
        }
    };

    console.log(addProjectData);

    const projectInfoProps = {
        setProjectName,
        setProjectDescription,
        setProjectLogoFile,
        employees,
        formDataHandler,
        setFilter,
    };

    return (
        <section className="app">
            <article className={`flex ${styles.createProjectArticle}`}>
                <div className={`flex ${styles.createProjectHeadDiv}`}>
                    <img src={doc} alt="document" />
                    <div className={styles.createProjectArticleHead}>
                        <h2 onClick={newProjectSubmit}>Create a Project</h2>
                        <p>Here you can create a new project</p>
                    </div>
                </div>

                <Button props={buttonProps}></Button>
            </article>
            <ProjectInfo props={projectInfoProps} />
        </section>
    );
};

export default CreateProject;

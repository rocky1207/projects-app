import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import defaultAvatar from '../../assets/icons/defaultAvatad.jpg';
import edit from '../../assets/icons/edit-button.png';
import remove from '../../assets/icons/close-button.png';
import { projectsAuthor } from '../../features/projects/projectsSlice';
import { projectLogoState } from '../../features/projects/projectsSlice';
import { useNavigate } from 'react-router-dom';
import { editProject } from '../../features/projects/projectsSlice';
import styles from './showProjects.module.css';
import '../../App.css';
import '../../theme.module.css';

const ProjectArticle = ({ project, showModalFunc, role = { role } }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let projects = [];
    projects.push(project);

    const projectName = project.attributes.name;
    const api_url = 'http://localhost:1337';
    const projectLogo =
        project?.attributes?.logo?.data?.attributes.formats.thumbnail.url;
    const authorAvatar =
        project?.attributes?.author?.data?.attributes?.logo?.data?.attributes
            ?.formats.thumbnail.url;
    const numOfEmployees = project.attributes.employees.data.length;
    useEffect(() => {
        dispatch(projectsAuthor(authorAvatar));
    }, [authorAvatar]);
    const callPut = (id) => {
        const projectToEdit = projects?.find((project) => id === project.id);

        dispatch(editProject({ projectToEdit, isOn: false }));
    };

    return (
        <article
            className={`flex
        ${styles.projectArticle}`}
        >
            <div
                className={`flex
    ${styles.flexStart}`}
            >
                <figure>
                    <img
                        className={styles.projectLogo}
                        src={
                            projectLogo
                                ? `${api_url}${projectLogo}`
                                : defaultAvatar
                        }
                        alt="ProjectLogo"
                        onClick={() => {
                            navigate('/project/' + project.id);
                            dispatch(projectLogoState(project));
                        }}
                    />
                </figure>

                <div className={styles.projectNameDiv}>
                    <h3>{projectName}</h3>
                    <div
                        className={`flex
    ${styles.projectTeamMember}`}
                    >
                        <img
                            className={styles.avatar}
                            src={
                                authorAvatar
                                    ? `${api_url}${authorAvatar}`
                                    : defaultAvatar
                            }
                            alt=""
                        />
                        <p>
                            {
                                project?.attributes?.author?.data?.attributes
                                    ?.username
                            }
                        </p>
                    </div>
                </div>
            </div>
            <div
                className={`flex
        ${styles.removeEditDiv}`}
            >
                {role === 'ProjectManager' ? (
                    <div className={styles.removeEdit}>
                        <img
                            src={edit}
                            alt="edit"
                            onClick={() => {
                                navigate(`/edit-project/${project.id}`);
                                callPut(project.id);
                            }}
                        />
                        <img
                            src={remove}
                            alt="remove"
                            onClick={() =>
                                showModalFunc({
                                    showModal: true,
                                    id: project.id,
                                })
                            }
                        />
                    </div>
                ) : null}
                <p>
                    <span>{numOfEmployees}</span> employees
                </p>
            </div>
        </article>
    );
};

export default ProjectArticle;

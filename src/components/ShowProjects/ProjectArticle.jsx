import defaultAvatar from '../../assets/icons/defaultAvatad.jpg';
import edit from '../../assets/icons/edit-button.png';
import remove from '../../assets/icons/close-button.png';
//import { useSelector } from 'react-redux/es/exports';
import styles from './showProjects.module.css';
import '../../App.css';
import '../../theme.module.css';

const ProjectArticle = ({ project }) => {
    const projectName = project.attributes.name;
    const api_url = 'http://localhost:1338';
    const projectLogo =
        project?.attributes?.logo?.data?.attributes.formats.thumbnail.url;
    const authorAvatar =
        project?.attributes?.author?.data?.attributes?.logo?.data?.attributes
            ?.formats.thumbnail.url;
    const numOfEmployees = project.attributes.employees.data.length;
    //const data = useSelector((state) => state.auth);
    //console.log(projectLogo);
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
                        alt=""
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
                <div className={styles.removeEdit}>
                    <img src={edit} alt="edit" />
                    <img src={remove} alt="remove" />
                </div>
                <p>
                    <span>{numOfEmployees}</span> employees
                </p>
            </div>
        </article>
    );
};

export default ProjectArticle;

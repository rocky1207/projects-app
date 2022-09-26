import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import '../../App.css';
import styles from './searchProjectNote.module.css';

const SearchProjectNote = () => {
    const api_url = 'http://localhost:1337';
    const { projectLogo } = useSelector((state) => state.projects);
    let projectId = useParams();
    console.log(projectId);
    return (
        <section className="app">
            <div>
                <div className={styles.projectLogoDiv}>
                    <figure className={styles.projectLogoFigure}>
                        <img
                            src={`${api_url}${projectLogo}`}
                            alt="Project Logo"
                        />
                    </figure>
                    <h2>Project 1</h2>
                </div>
            </div>
        </section>
    );
};

export default SearchProjectNote;

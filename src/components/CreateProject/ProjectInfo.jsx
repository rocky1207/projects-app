import React from 'react';
import FiltratedUsers from '../FiltratedUsers/FiltratedUsers';

import styles from './projectInfo.module.css';

const ProjectInfo = ({ props }) => {
    const {
        newProjectDatas,
        setNewProjectDatas,
        setFilter,
        formDataHandler,
        employees,
    } = props;

    return (
        <>
            <div className={styles.projectInfo}>
                <form className={styles.projectInfoForm}>
                    <div className={styles.projectInfoDiv}>
                        <h3>Project Info</h3>
                        <div className={styles.projectNameDiv}>
                            <label className={styles.projectNameLabel}>
                                Project Name:
                            </label>
                            <input
                                type="text"
                                placeholder="Enter project name"
                                value={newProjectDatas.projectName}
                                onChange={(e) =>
                                    setNewProjectDatas({
                                        ...newProjectDatas,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={styles.projectLogoDiv}>
                            <label>Choose project logo</label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    formDataHandler(e.target.files[0])
                                }
                            />
                        </div>
                    </div>
                    <div className={styles.projectDescriptionDiv}>
                        <label>Project description:</label>
                        <textarea
                            placeholder="Descripte project"
                            value={newProjectDatas.description}
                            onChange={(e) =>
                                setNewProjectDatas({
                                    ...newProjectDatas,
                                    description: e.target.value,
                                })
                            }
                        ></textarea>
                    </div>
                </form>
                <div className={styles.projectMembersDiv}>
                    <h3>Members</h3>
                    <input
                        placeholder="Choose team members"
                        onChange={(e) => {
                            if (e.target.value.length > 2) {
                                return setFilter(e.target.value);
                            }
                        }}
                    />
                </div>
            </div>
            {employees?.map((employee) => {
                return <FiltratedUsers key={employee.id} employee={employee} />;
            })}
        </>
    );
};

export default ProjectInfo;

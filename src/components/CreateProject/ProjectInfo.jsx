import { useState, useEffect } from 'react';
import { useUploadImageMutation } from '../../api/uplaodImage/uploadImageApiSlice';
import FiltratedUsers from '../FiltratedUsers/FiltratedUsers';
import styles from './projectInfo.module.css';

const ProjectInfo = ({ props }) => {
    const {
        setProjectName,
        setProjectDescription,
        setFilter,
        formDataHandler,
        employees,
    } = props;
    console.log(employees);
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
                                onChange={(e) => setProjectName(e.target.value)}
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
                            onChange={(e) =>
                                setProjectDescription(e.target.value)
                            }
                        ></textarea>
                    </div>
                </form>
                <div className={styles.projectMembersDiv}>
                    <h3>Members</h3>
                    <input
                        placeholder="Choose team members"
                        onChange={(e) => setFilter(e.target.value)}
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

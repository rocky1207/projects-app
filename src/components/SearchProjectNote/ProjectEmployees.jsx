import React from 'react';

import styles from './searchProjectNote.module.css';
const ProjectEmployees = ({ api_url, avatar, defaultAvatar, projectInfo }) => {
    const employeeImgs = projectInfo.employees.data.map(
        (img) => img.attributes.logo?.data?.attributes.formats.thumbnail.url
    );
    console.log(employeeImgs);
    let smallEmployeesArray = employeeImgs.length - 5;

    const ids = projectInfo.employees.data.map((id) => id.id);
    return (
        <div className={`flex ${styles.staff}`}>
            <div className={styles.projectMenagerDiv}>
                <h3>Project Menager</h3>
                <figure className={`${styles.figure} ${styles.authorFigure}`}>
                    <img
                        src={avatar ? `${api_url}${avatar}` : defaultAvatar}
                        alt="Author"
                    />
                </figure>
            </div>
            <div className={styles.employeesDiv}>
                <h3>Employees</h3>

                <figure
                    className={`${styles.figure} ${styles.employeeImgFigure}`}
                >
                    {employeeImgs.length < 1 ? (
                        <>
                            <img key={1} src={defaultAvatar} alt="Employee" />
                            <span className={styles.employeesSpan}> 0</span>
                        </>
                    ) : null}
                    {employeeImgs.length < 6
                        ? employeeImgs.map((img, index) => (
                              <img
                                  key={ids[index]}
                                  src={
                                      img
                                          ? `${api_url}${employeeImgs[index]}`
                                          : defaultAvatar
                                  }
                                  alt="Employee"
                              />
                          ))
                        : employeeImgs
                              .slice(0, 5)
                              .map((img, index) => (
                                  <img
                                      key={ids[index]}
                                      src={
                                          img
                                              ? `${api_url}${employeeImgs[index]}`
                                              : defaultAvatar
                                      }
                                      alt="Employee"
                                  />
                              ))}
                    {employeeImgs.length >= 6 ? (
                        <span className={styles.employeesSpan}>
                            +{smallEmployeesArray} more{' '}
                        </span>
                    ) : null}
                </figure>
            </div>
        </div>
    );
};

export default ProjectEmployees;

import { useState, useEffect } from 'react';
import { useEditProjectMutation } from '../../api/projects/projectsApiSlice';
import { addProjectMembers } from '../../features/projects/projectsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FiltratedUsers from '../FiltratedUsers/FiltratedUsers';
import { useGetFiltratedUsersQuery } from '../../api/userRole/userRoleApiSlice';
import Button from '../Elements/Button/Button';
import styles from './projectInfo.module.css';

const EditProject = () => {
    const { editProjectInfo, members } = useSelector((state) => state.projects);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [projectId, setProjectId] = useState(editProjectInfo.id);

    const [employees, setEmployees] = useState(editProjectInfo.employees);
    const [filter, setFilter] = useState();
    const [editProjectState, setEditProjectState] = useState({
        name: editProjectInfo?.projectName,
        description: editProjectInfo?.projectDescription,
        employees: editProjectInfo?.employees,
    });

    const { data } = useGetFiltratedUsersQuery(filter);

    useEffect(() => {
        dispatch(addProjectMembers(null));
    }, []);

    useEffect(() => {
        if (!data || data.length < 1) {
            editProjectInfo?.employees.forEach((employee) => {
                dispatch(addProjectMembers(employee.id));
            });
            setEmployees(editProjectInfo?.employees);
        } else {
            const addedEmployees = editProjectInfo?.employees.concat(data);
            let uniqueIds = [];
            let ids = [];
            addedEmployees.forEach((item) => ids.push(item.id));

            for (let i of ids) {
                if (uniqueIds.indexOf(i) === -1) {
                    uniqueIds.push(i);
                }
            }

            const filtratedEmployees = addedEmployees.filter(
                (item, index) => item.id === uniqueIds[index]
            );

            setEmployees(filtratedEmployees);
        }
    }, [editProjectInfo, data]);

    useEffect(() => {
        setEditProjectState({
            ...editProjectState,

            employees: members,
        });
    }, [members]);

    const [editProject, { isSuccess, error }] = useEditProjectMutation();
    const sendUpdatedDatas = async () => {
        const ha = {
            id: projectId,
            editProjectState: { data: editProjectState },
        };
        try {
            console.log(ha);

            const bla = await editProject(ha);
            console.log(bla);
        } catch (err) {
            console.log(err);
        }
    };
    if (error) {
        console.log(error);
    }
    if (isSuccess) {
        console.log('ne verujem');
    }
    const buttonProps = {
        value: 'Edit',
        elClassName: 'button',
        additionalElClassName: 'editProjectButton',
        type: 'button',
        action: () => {
            sendUpdatedDatas();
            navigate('/');
        },
    };

    return (
        <section className="app">
            <div className={styles.projectInfo}>
                <Button props={buttonProps}></Button>
                <form className={styles.projectInfoForm}>
                    <div className={styles.projectInfoDiv}>
                        <h3>Project Info</h3>
                        <div className={styles.projectNameDiv}>
                            <label className={styles.projectNameLabel}>
                                Project Name:
                            </label>
                            <input
                                type="text"
                                placeholder="Edit project name"
                                value={editProjectState.name}
                                onChange={(e) =>
                                    setEditProjectState({
                                        ...editProjectState,

                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        {/*<div className={styles.projectLogoDiv}>
                            <label>Choose project logo</label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    formDataHandler(e.target.files[0])
                                }
                            />
                            </div>*/}
                    </div>
                    <div className={styles.projectDescriptionDiv}>
                        <label>Project description:</label>
                        <textarea
                            placeholder="Edit Project Description"
                            value={editProjectState.description}
                            onChange={(e) =>
                                setEditProjectState({
                                    ...editProjectState,

                                    description: e.target.value,
                                })
                            }
                        ></textarea>
                    </div>
                </form>
                <div className={styles.projectMembersDiv}>
                    <h3>Members</h3>
                    <input
                        placeholder="Edit team members"
                        onChange={(e) => {
                            if (e.target.value.length > 2) {
                                setFilter(e.target.value);
                            }
                        }}
                    />
                </div>
            </div>
            {employees?.map((employee) => {
                return <FiltratedUsers key={employee.id} employee={employee} />;
            })}
        </section>
    );
};
export default EditProject;

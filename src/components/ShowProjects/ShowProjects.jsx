import { useProjectsQuery } from '../../api/projects/projectsApiSlice';

import { useUserRoleQuery } from '../../api/userRole/userRoleApiSlice';
import { useSelector } from 'react-redux';

const ShowProjects = () => {
    const { currentUserId } = useSelector((state) => state.auth);
    console.log(currentUserId);
    const { data: roleData } = useUserRoleQuery();
    const { data, isLoading, isError, error } = useProjectsQuery(currentUserId);
    console.log(roleData);

    console.log(data);
    if (isError) {
        console.log(error);
    }
    return (
        <>
            <h2>ShowProjects page</h2>
            {data?.data.map((project) => {
                console.log(project);
                return <div key={project.id}>{project.attributes.name}</div>;
            })}
        </>
    );
};

export default ShowProjects;

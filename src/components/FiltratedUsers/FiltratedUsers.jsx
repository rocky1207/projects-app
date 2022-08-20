import React from 'react';

const FiltratedUsers = ({ employee }) => {
    console.log(employee);
    return (
        <article>
            <div>
                <p>{employee.username}</p>
                <p>{employee.email}</p>
            </div>
        </article>
    );
};

export default FiltratedUsers;

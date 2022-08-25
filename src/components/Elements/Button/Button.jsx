import React from 'react';
import './button.css';
import '../../../theme.module.css';
const Button = ({ props }) => {
    const elClassName = props.elClassName;
    const value = props.value;
    const type = props.type;
    const action = props.action;

    return (
        <button className={elClassName} type={type} onClick={action}>
            {value}
        </button>
    );
};

export default Button;

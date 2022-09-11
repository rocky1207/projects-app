import React from 'react';
import './button.css';
import '../../../theme.module.css';
const Button = ({ props }) => {
    const elClassName = props.elClassName;
    const additionalElClassName = props.additionalElClassName;
    const value = props.value;
    const type = props.type;
    const disabled = props.disabled;
    const action = props.action;
    console.log(additionalElClassName);
    return (
        <button
            className={`${elClassName} ${additionalElClassName}`}
            type={type}
            onClick={action}
            disabled={disabled}
        >
            {value}
        </button>
    );
};

export default Button;

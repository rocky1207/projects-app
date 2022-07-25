import React from 'react';
import './button.css';
import '../../../theme.module.css';
const Button = ({ props }) => {
    const elClassName = props.elClassName;

    return (
        <button className={elClassName} type="button">
            {props.value}
        </button>
    );
};

export default Button;

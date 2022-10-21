import React from 'react';
import { useState } from 'react';

import './select.css';
const Select = ({ props }) => {
    const elClassName = props.elClassName;
    const optionClassName = props.optionClassName;
    const value = props.value;
    const action = props.action;
    const selectedOption = props.selectedOption;
    console.log(selectedOption);

    return (
        <>
            <select
                className={elClassName}
                onChange={(e) => action(e)}
                value={selectedOption}
                required
            >
                {value?.map((item) => {
                    return (
                        <option
                            className={optionClassName}
                            key={item.id}
                            value={item.id}
                        >
                            {item.attributes.name}
                        </option>
                    );
                })}
            </select>
        </>
    );
};

export default Select;

import { useSelector, useDispatch } from 'react-redux';
import Button from '../Button/Button';
import {
    getPageNumber,
    incPageNumber,
} from '../../../features/searchProjects/searchProjectsSlice';
import { useState } from 'react';
import { useEffect } from 'react';

const Pagination = () => {
    const { maxPageNumber, pageNumber } = useSelector((state) => state.search);
    const dispatch = useDispatch();
    const [page, setPage] = useState(maxPageNumber + 1 - maxPageNumber);

    const leftDoubleButton = {
        value: '<<',
        elClassName: 'paginationButton',
        type: 'button',
        //disabled: pageNumber >= maxPageNumber ? true : false,
        disabled: pageNumber <= 1 ? true : false,

        action: () => {
            dispatch(getPageNumber(1));

            setPage(1);
        },
    };

    const leftButton = {
        value: '<',
        elClassName: 'paginationButton',
        additionalElClassName: 'arrowButton',
        type: 'button',
        disabled: pageNumber <= 1 ? true : false,
        //disabled: pageNumber >= maxPageNumber ? true : false,
        action: () => {
            dispatch(incPageNumber(-1));
            //dispatch(incPageNumber(1));
            setPage(parseInt(page - 1));
        },
    };
    const rightButton = {
        value: '>',
        elClassName: 'paginationButton',
        additionalElClassName: 'arrowButton',
        type: 'button',
        disabled: pageNumber >= maxPageNumber ? true : false,
        //disabled: pageNumber <= 1 ? true : false,
        action: (e) => {
            console.log(e.target.innerText);
            dispatch(incPageNumber(1));
            //dispatch(incPageNumber(-1));
            setPage(parseInt(page + 1));
        },
    };
    const rightDoubleButton = {
        value: '>>',
        elClassName: 'paginationButton',
        type: 'button',
        disabled: pageNumber >= maxPageNumber ? true : false,
        //disabled: pageNumber <= 1 ? true : false,
        action: () => {
            dispatch(getPageNumber(maxPageNumber));
            setPage(maxPageNumber);
        },
    };

    const numberButton = {
        elClassName: 'paginationButton',
        type: 'button',

        action: (e) => {
            setPage(parseInt(e.target.innerText));
            dispatch(getPageNumber(e.target.innerText));
        },
    };

    let projects = [];
    if (pageNumber <= 3) {
        for (let i = 1; i <= 5; i++) {
            projects.push(i);
        }
    } else if (
        maxPageNumber > 5 &&
        pageNumber > 3 &&
        pageNumber <= maxPageNumber - 2
    ) {
        for (let i = pageNumber - 2; i <= pageNumber + 2; i++) {
            projects.push(i);
        }
    } else {
        for (let i = maxPageNumber - 4; i <= maxPageNumber; i++) {
            projects.push(i);
        }
    }

    return (
        <div>
            <Button props={leftDoubleButton}></Button>
            <Button props={leftButton}></Button>
            {projects.map((val) => {
                return (
                    <Button
                        key={val}
                        props={{
                            ...numberButton,
                            value: val,
                            disabled: val === page ? true : false,
                            additionalElClassName: val === page ? 'bla' : null,
                        }}
                    ></Button>
                );
            })}
            <Button props={rightButton}></Button>
            <Button props={rightDoubleButton}></Button>
        </div>
    );
};

export default Pagination;

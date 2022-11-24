import { useSelector, useDispatch } from 'react-redux';
import Button from '../Button/Button';
import {
    getPageNumber,
    incPageNumber,
} from '../../../features/searchProjects/searchProjectsSlice';
import { useState, useEffect } from 'react';

import PaginationInputField from './PaginationInputField';

const Pagination = () => {
    const { maxPageNumber, pageNumber } = useSelector((state) => state.search);
    const { isDark } = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const [page, setPage] = useState(maxPageNumber + 1 - maxPageNumber);

    useEffect(() => {
        setPage(pageNumber);
    }, [pageNumber]);
    const leftDoubleButton = {
        value: '<<',
        elClassName: isDark
            ? 'paginationButton  paginationButtonColorDark'
            : !isDark
            ? 'paginationButton paginationButtonColorLight'
            : null,
        type: 'button',
        disabled: pageNumber <= 1 ? true : false,

        action: () => {
            dispatch(getPageNumber(1));
            setPage(1);
        },
    };

    const leftButton = {
        value: '<',
        elClassName: 'paginationButton',
        additionalElClassName: isDark
            ? 'arrowButton paginationButtonColorDark'
            : !isDark
            ? 'arrowButton paginationButtonColorLight'
            : null,
        type: 'button',
        disabled: pageNumber <= 1 ? true : false,
        action: () => {
            dispatch(incPageNumber(-1));
            setPage(parseInt(page - 1));
        },
    };
    const rightButton = {
        value: '>',
        elClassName: 'paginationButton',
        additionalElClassName: isDark
            ? 'arrowButton paginationButtonColorDark'
            : !isDark
            ? 'arrowButton paginationButtonColorLight'
            : null,
        type: 'button',
        disabled: pageNumber >= maxPageNumber ? true : false,
        action: (e) => {
            dispatch(incPageNumber(1));
            setPage(parseInt(page + 1));
        },
    };
    const rightDoubleButton = {
        value: '>>',
        elClassName: isDark
            ? 'paginationButton  paginationButtonColorDark'
            : !isDark
            ? 'paginationButton paginationButtonColorLight'
            : null,
        type: 'button',
        disabled: pageNumber >= maxPageNumber ? true : false,
        action: () => {
            dispatch(getPageNumber(maxPageNumber));
            setPage(maxPageNumber);
        },
    };

    const numberButton = {
        elClassName: isDark
            ? 'paginationButton  paginationButtonColorDark'
            : !isDark
            ? 'paginationButton paginationButtonColorLight'
            : null,
        type: 'button',

        action: (e) => {
            setPage(parseInt(e.target.innerText));
            dispatch(getPageNumber(e.target.innerText));
        },
    };

    let projects = [];
    if (maxPageNumber <= 5) {
        for (let i = 1; i <= maxPageNumber; i++) {
            projects.push(i);
        }
    } else if (pageNumber <= 3) {
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
                            additionalElClassName:
                                val === page ? 'disabledButton' : null,
                        }}
                    ></Button>
                );
            })}
            <Button props={rightButton}></Button>
            <Button props={rightDoubleButton}></Button>
            <PaginationInputField />
        </div>
    );
};

export default Pagination;

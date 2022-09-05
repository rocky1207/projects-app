import { useSelector, useDispatch } from 'react-redux';
import Button from '../Button/Button';
import { getPageNumber } from '../../../features/searchProjects/searchProjectsSlice';

const Pagination = () => {
    const { maxPageNumber } = useSelector((state) => state.search);
    const dispatch = useDispatch();

    const leftButton = {
        value: '<',
        elClassName: 'paginationButton',
        type: 'button',
        action: () => dispatch(getPageNumber(1)),
    };
    const rightButton = {
        value: '>',
        elClassName: 'paginationButton',
        type: 'button',
        action: () => dispatch(getPageNumber(maxPageNumber)),
    };

    const numberButton = {
        elClassName: 'paginationButton',
        type: 'button',
        action: (e) => {
            console.log(e.target.innerText);
            dispatch(getPageNumber(e.target.innerText));
        },
    };

    let projects = [];
    for (let i = 1; i <= maxPageNumber; i++) {
        projects.push(i);
    }

    return (
        <div>
            <Button props={leftButton}></Button>
            {projects.map((val) => {
                return (
                    <Button
                        key={val}
                        props={{ ...numberButton, value: val }}
                    ></Button>
                );
            })}
            <Button props={rightButton}></Button>
        </div>
    );
};

export default Pagination;

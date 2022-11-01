import { useState } from 'react';
import { setPageNumber } from '../../../features/searchProjects/searchProjectsSlice';
import { useDispatch } from 'react-redux';
import styles from './pagination.module.css';

const PaginationInputField = () => {
    const [showHideClass, setShowHideClass] = useState(false);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    return (
        <div className={styles.paginationInputDiv}>
            <label>Page No.</label>
            <input
                value={inputValue}
                className={showHideClass ? `${styles.outline}` : null}
                type="number"
                onChange={(e) => {
                    dispatch(
                        setPageNumber(
                            parseInt(e.target.value ? e.target.value : 1)
                        )
                    );
                    setInputValue(e.target.value);
                }}
                onClick={() => setShowHideClass(true)}
                onBlur={() => {
                    setShowHideClass(false);
                    setInputValue('');
                }}
            />
        </div>
    );
};

export default PaginationInputField;

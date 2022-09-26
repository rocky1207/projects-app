import { useState } from 'react';
import {
    getPageNumber,
    setPageNumber,
} from '../../../features/searchProjects/searchProjectsSlice';
import { useDispatch } from 'react-redux';
import styles from './pagination.module.css';

const PaginationInputField = () => {
    const [showHideClass, setShowHideClass] = useState(false);
    const dispatch = useDispatch();
    return (
        <div className={styles.paginationInputDiv}>
            <label>Page No.</label>
            <input
                className={showHideClass ? `${styles.outline}` : null}
                type="number"
                onChange={(e) =>
                    dispatch(
                        setPageNumber(
                            parseInt(e.target.value ? e.target.value : 1)
                        )
                    )
                }
                onClick={() => setShowHideClass(true)}
                onBlur={() => setShowHideClass(false)}
            />
        </div>
    );
};

export default PaginationInputField;

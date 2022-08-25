import SvgLogout from '../../../iconComponents/SvgLogout';
import SvgSettings from '../../../iconComponents/SvgSettings';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logOut } from '../../../../features/auth/authSlice';
import defalutAvatar from '../../../../assets/icons/defaultAvatad.jpg';
import styles from './dropDovnMenu.module.css';

const DropDownMenu = () => {
    const author = useSelector((state) => state.projectsAuthor.avatar);

    const api_url = 'http://localhost:1337';
    const dispatch = useDispatch();

    return (
        <nav className={styles.dropDownMenu}>
            <ul>
                <li>
                    <span
                        className={`${styles.dropDownSpan} ${styles.myProfileSpan}`}
                    >
                        <img
                            src={author ? `${api_url}${author}` : defalutAvatar}
                            alt="Avatar"
                        />
                    </span>
                    My Profile
                </li>
                <li>
                    <span
                        className={`${styles.dropDownSpan} ${styles.settingsSpan}`}
                    >
                        <SvgSettings />
                    </span>
                    Settings
                </li>
                <li>
                    <span className={styles.dropDownSpan}>
                        <SvgLogout
                            background={'#fff'}
                            onClick={() => dispatch(logOut())}
                        />
                    </span>
                    Logout
                </li>
            </ul>
        </nav>
    );
};

export default DropDownMenu;

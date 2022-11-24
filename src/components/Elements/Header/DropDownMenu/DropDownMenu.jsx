import SvgLogout from '../../../iconComponents/SvgLogout';
import SvgSettings from '../../../iconComponents/SvgSettings';
import { useDispatch } from 'react-redux';
import { themeMode } from '../../../../features/theme/themeSlice';
import { logOut } from '../../../../features/auth/authSlice';

import defalutAvatar from '../../../../assets/icons/defaultAvatad.jpg';
import styles from './dropDovnMenu.module.css';
import { roleOn } from '../../../../features/role/roleSlice';
import { useNavigate } from 'react-router-dom';

const DropDownMenu = ({ avatar, isDark }) => {
    const api_url = 'http://localhost:1337';
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <nav
            className={
                isDark
                    ? `${styles.dropDownMenu} ${styles.dropDownMenuBgDark}`
                    : `${styles.dropDownMenu} ${styles.dropDownMenuBgLight}`
            }
        >
            <ul>
                <li>
                    <span
                        className={`${styles.dropDownSpan} ${styles.myProfileSpan}`}
                    >
                        <img
                            src={avatar ? `${api_url}${avatar}` : defalutAvatar}
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
                            onClick={() => {
                                navigate('/');
                                dispatch(themeMode(false));
                                dispatch(logOut());

                                window.location.reload(true);

                                roleOn('');
                            }}
                        />
                    </span>
                    Logout
                </li>
            </ul>
        </nav>
    );
};

export default DropDownMenu;

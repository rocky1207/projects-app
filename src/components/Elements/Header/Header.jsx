import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropDownMenu from './DropDownMenu/DropDownMenu';

import SvgRotate from '../../iconComponents/SvgRotate';
import SvgSun from '../SvgIcons/SvgSun';
import defaultAvatar from '../../../assets/icons/defaultAvatad.jpg';
import { useNavigate } from 'react-router-dom';
import { themeMode } from '../../../features/theme/themeSlice';

import styles from './header.module.css';

const Header = () => {
    const role = useSelector((state) => state.role.role);
    const themeModeState = useSelector((state) => state.theme.isDark);

    const authorAvatarPath = useSelector((state) => state.projects.avatar);
    const userAvatarPath = useSelector(
        (state) => state.employeeAvatar.employeeAvatarPath
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showDropMenu, setShowDropMenu] = useState(false);
    const [isDark, setIsDark] = useState(themeModeState);

    const api_url = 'http://localhost:1337';
    let avatar = '';

    if (role !== 'ProjectManager') {
        avatar = userAvatarPath;
    } else {
        avatar = authorAvatarPath;
    }

    useEffect(() => {
        dispatch(themeMode(isDark));
    }, [isDark]);

    return (
        <div
            className={
                isDark
                    ? `flex ${styles.header} ${styles.headerDark}`
                    : `flex ${styles.header} ${styles.headerLight}`
            }
        >
            <div className={`flex ${styles.logoDiv}`}>
                <div
                    className={
                        themeModeState
                            ? `${styles.logoFigure}`
                            : `${styles.logoFigure} ${styles.logoFigureLight}`
                    }
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <p className={styles.logoFigureP}>LOGO</p>
                </div>
                <div className={styles.svgSunDiv}>
                    <button
                        className={styles.svgSunButton}
                        onClick={() => setIsDark((prev) => !prev)}
                    >
                        <SvgSun fill={isDark ? '#858BB2' : '#000'} />
                    </button>
                </div>
            </div>
            <div className={`flex ${styles.authorDiv}`}>
                <figure className={styles.authorFigure}>
                    <img
                        src={avatar ? `${api_url}${avatar}` : defaultAvatar}
                        alt="Author"
                    />
                </figure>
                <div
                    className={
                        isDark
                            ? showDropMenu
                                ? `${styles.rotateSvg} ${styles.rotateSvgRotate}  ${styles.rotateSvgDark}`
                                : `${styles.rotateSvg} ${styles.rotateSvgDark}`
                            : !isDark
                            ? showDropMenu
                                ? `${styles.rotateSvg} ${styles.rotateSvgRotate}  ${styles.rotateSvgLight}`
                                : `${styles.rotateSvg} ${styles.rotateSvgLight}`
                            : null
                    }
                    onClick={() => setShowDropMenu((prev) => !prev)}
                >
                    <SvgRotate width={20} height={20} />
                </div>
                {showDropMenu ? (
                    <DropDownMenu avatar={avatar} isDark={isDark} />
                ) : null}
            </div>
        </div>
    );
};

export default Header;

import { useState } from 'react';
import { useSelector } from 'react-redux';
import DropDownMenu from './DropDownMenu/DropDownMenu';
import logo from '../../../assets/icons/logo-services.png';
import SvgRotate from '../../iconComponents/SvgRotate';
import SvgSun from '../../iconComponents/SvgSun';
import defaultAvatar from '../../../assets/icons/defaultAvatad.jpg';
import { useNavigate } from 'react-router-dom';

import styles from './header.module.css';

const Header = () => {
    const author = useSelector((state) => state.projects.avatar);
    console.log(author);
    const navigate = useNavigate();
    const [showDropMenu, setShowDropMenu] = useState(false);

    const api_url = 'http://localhost:1337';

    return (
        <div className={`flex ${styles.header}`}>
            <div className={`flex ${styles.logoDiv}`}>
                <figure
                    className={styles.logoFigure}
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <img src={logo} alt="Logo" />
                </figure>
                <div className={styles.svgSunDiv}>
                    <SvgSun />
                </div>
            </div>
            <div className={`flex ${styles.authorDiv}`}>
                <figure className={styles.authorFigure}>
                    <img
                        src={author ? `${api_url}${author}` : defaultAvatar}
                        alt="Author"
                    />
                </figure>
                <div
                    className={
                        showDropMenu
                            ? `${styles.rotateSvg} ${styles.rotateSvgRotate}`
                            : `${styles.rotateSvg}`
                    }
                    onClick={() => setShowDropMenu((prev) => !prev)}
                >
                    <SvgRotate width={20} height={20} />
                </div>
                {showDropMenu ? <DropDownMenu /> : null}
            </div>
        </div>
    );
};

export default Header;

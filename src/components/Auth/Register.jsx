import { useState } from 'react';
import { useEffect } from 'react';

import { validateDatas } from './validateFunctions/validateDatas';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useRegisterMutation } from '../../api/registerUser/registerUserSlice';
import { useUploadImageMutation } from '../../api/uplaodImage/uploadImageApiSlice';

import styles from './Auth.module.css';

const Register = () => {
    const navigate = useNavigate();

    const [register, { isLoading, isSuccess }] = useRegisterMutation();
    const [uploadImage, { data, isSuccess: uploadSuccess, isError, error }] =
        useUploadImageMutation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [image, setImage] = useState();

    const [disabled, setDisabled] = useState(true);
    const [registerDatas, setRegisterDatas] = useState({});
    const [datas, setDatas] = useState(null);

    const formData = new FormData();

    useEffect(() => {
        if (datas) {
            registerApiTrigger();
        }

        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setImage();
    }, [datas]);

    const registerApiTrigger = async () => {
        try {
            await register(datas);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess]);
    useEffect(() => {
        if (username && email && password && passwordConfirm && image) {
            setDisabled(false);
            setRegisterDatas({
                username: username,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm,
            });
        }
    }, [username, email, image, password, passwordConfirm]);
    useEffect(() => {
        const { checkedUsername, checkedEmail, checkedPassword } =
            validateDatas(registerDatas, 'register');

        if (!checkedUsername || !checkedEmail || !checkedPassword) {
            return;
        } else {
            setUsername(checkedUsername);
            setEmail(checkedEmail);
            setPassword(checkedPassword);
        }
    }, [registerDatas]);

    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            await uploadImage(image);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (data && uploadSuccess) {
            const id = data[0].id;
            const changedDatas = {
                username: username,
                email: email,
                password: password,
                logo: id,
            };

            setDatas(changedDatas);
        }
    }, [uploadSuccess, data]);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <section className={styles.authSection}>
            <form onSubmit={(e) => registerHandler(e)}>
                <div>
                    <input
                        className={styles.authInput}
                        value={username}
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className={styles.authInput}
                        value={email}
                        type="email"
                        placeholder="E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className={styles.authInput}
                        value={password}
                        type="text"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className={styles.authInput}
                        value={passwordConfirm}
                        type="text"
                        placeholder="Confirm password"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </div>
                <div className={styles.uploadImageDiv}>
                    <input
                        type="file"
                        onChange={(e) => {
                            formData.append('files', e.target.files[0]);
                            setImage(formData);
                        }}
                    />
                    Upload Your image
                </div>
                <div>
                    <button
                        className={styles.submitRegisterForm}
                        type="submit"
                        disabled={disabled}
                    >
                        Submit
                    </button>
                </div>
                <p>
                    Already registered?
                    <Link to="/" className={styles.authLink}>
                        Sign In
                    </Link>
                </p>
            </form>
        </section>
    );
};

export default Register;

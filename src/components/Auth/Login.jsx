import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loginCredentials } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../api/loginUser/loginUserSlice';

import { toast } from 'react-toastify';

import styles from './Auth.module.css';

const Login = () => {
    const dispatch = useDispatch();

    const [
        login,
        {
            data,
            isLoading,
            isSuccess: isLoginSuccess,
            isError: isLoginError,
            error: loginError,
        },
    ] = useLoginMutation();
    console.log(data);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        const datas = {
            identifier: username,
            password: password,
        };

        try {
            await login(datas);
        } catch (error) {
            if (error.details.errors) {
                error.details.errors.map((error) => toast.error(error));
            } else {
                toast.error(error.data.message);
            }
        }

        setUsername('');
        setPassword('');
    };

    useEffect(() => {
        if (isLoginSuccess) {
            localStorage.setItem('token', data.jwt);
            dispatch(loginCredentials(data));
            toast.success('Login Success');
        }
        if (isLoginError) {
            if (loginError.data.error.details.errors) {
                loginError.data.error.details.errors.map((error) =>
                    toast.error(error.message)
                );
            } else {
                toast.error(loginError.data.error.message);
            }
        }
    }, [isLoginSuccess, isLoginError]);

    const loading = () => {
        return <h2>aLoading...</h2>;
    };
    useEffect(() => {
        if (isLoading) {
            loading();
        }
    }, [isLoading]);
    return (
        <section className={styles.authSection}>
            <form
                className={styles.authForm}
                onSubmit={(e) => submitHandler(e)}
            >
                <div>
                    <input
                        value={username}
                        className={styles.authInput}
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className={styles.authInput}
                        value={password}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button className={styles.submitRegisterForm} type="submit">
                        Submit
                    </button>
                </div>
                <p>
                    Need an Account?
                    <Link to="/register" className={styles.authLink}>
                        Register
                    </Link>
                </p>
            </form>
        </section>
    );
};

export default Login;

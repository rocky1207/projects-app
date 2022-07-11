import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { loginCredentials } from '../../features/auth/authSlice';

import { useDispatch } from 'react-redux';

import { useLoginMutation } from '../../api/loginUser/loginUserSlice';

const Login = () => {
    const dispatch = useDispatch();

    const [login, { data, isLoading, isSuccess }] = useLoginMutation();

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
        } catch (err) {
            console.log(err);
        }

        setUsername('');
        setPassword('');
    };
    useEffect(() => {
        if (isSuccess) {
            console.log(data);
            localStorage.setItem('token', data.jwt);
            dispatch(loginCredentials(data));
        }
    }, [isSuccess]);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <form onSubmit={(e) => submitHandler(e)}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <p>
                Need an Account?<Link to="/register">Sign Up</Link>
            </p>
        </>
    );
};

export default Login;

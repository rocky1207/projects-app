import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

const LoginRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default LoginRoutes;

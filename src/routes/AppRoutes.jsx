import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyProjects from '../pages/MyProjects/MyProjects';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MyProjects />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

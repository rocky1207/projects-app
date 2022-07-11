import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowProjects from '../components/ShowProjects/ShowProjects';
import ErrorPage from '../components/ErrorPage/ErrorPage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ShowProjects />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

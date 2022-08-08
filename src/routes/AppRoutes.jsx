import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyProjects from '../pages/MyProjects/MyProjects';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Header from '../components/Elements/Header/Header';

const AppRoutes = () => {
    return (
        <>
            <Header />
            <Router>
                <Routes>
                    <Route path="/" element={<MyProjects />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </>
    );
};

export default AppRoutes;

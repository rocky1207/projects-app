import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyProjects from '../pages/MyProjects/MyProjects';
import CreateProject from '../components/CreateProject/CreateProject';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Header from '../components/Elements/Header/Header';

const AppRoutes = () => {
    return (
        <>
            <Header />
            <Router>
                <Routes>
                    <Route path="create-project" element={<CreateProject />} />
                    <Route path="/" element={<MyProjects />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </>
    );
};

export default AppRoutes;

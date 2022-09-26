import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyProjects from '../pages/MyProjects/MyProjects';
import CreateProject from '../components/CreateProject/CreateProject';
import EditProject from '../components/CreateProject/EditProject';
import SearchProjectNote from '../components/SearchProjectNote/SearchProjectNote';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Header from '../components/Elements/Header/Header';

const AppRoutes = () => {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/create-project" element={<CreateProject />} />
                    <Route path="/edit-project/:id" element={<EditProject />} />
                    <Route
                        path="/project/:id"
                        element={<SearchProjectNote />}
                    />
                    <Route path="/" element={<MyProjects />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </>
    );
};

export default AppRoutes;

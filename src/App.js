import LoginRoutes from './routes/LoginRoutes';
import AppRoutes from './routes/AppRoutes';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
    const state = useSelector((state) => state.auth);

    const token = state.token;

    return (
        <>
            {token ? <AppRoutes /> : <LoginRoutes />}
            <ToastContainer />
        </>
    );
}

export default App;

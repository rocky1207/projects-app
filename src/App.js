import LoginRoutes from './routes/LoginRoutes';
import AppRoutes from './routes/AppRoutes';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
    const state = useSelector((state) => state.auth);

    const isLogged = state.isLogged;
    console.log(state);
    return <>{isLogged ? <AppRoutes /> : <LoginRoutes />}</>;
}

export default App;

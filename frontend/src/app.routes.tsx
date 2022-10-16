import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Delivery } from './pages/Deliverys';
import { Login } from './pages/Login';

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Delivery/>} path="/" />
                <Route element={<Login/>} path="/login" />      
            </Routes>         
        </BrowserRouter>
    )
}

export default AppRoutes;
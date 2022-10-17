import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Delivery } from './pages/Deliverys';
import { AuthenticateUser } from './pages/AuthenticateUser';

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Delivery/>} path="/" />
                <Route element={<AuthenticateUser/>} path="/AuthenticateUser" /> 
            </Routes>         
        </BrowserRouter>
    )
}

export default AppRoutes;
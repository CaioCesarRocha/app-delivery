import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Delivery } from './pages/Deliverys';
import { AuthenticateUser } from './pages/AuthenticateUser';
import { UpdateDelivery } from './pages/UpdateDelivery';

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Delivery/>} path="/" />
                <Route element={<AuthenticateUser/>} path="/AuthenticateUser" />
                <Route element={<UpdateDelivery/>} path="/UpdateDelivery/:id" />  
            </Routes>         
        </BrowserRouter>
    )
}

export default AppRoutes;
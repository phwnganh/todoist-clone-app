import { Route, Routes } from "react-router-dom";
import { LOGIN } from "../constants/routes.constants";
import LoginPage from "../pages/LoginPage";

const AppRoutes = () => {
    return (
        <>
           <Routes>
            <Route path={LOGIN} element={<LoginPage/>}/>
            </Routes> 
        </>
    );
};

export default AppRoutes;
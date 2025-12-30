import { Route, Routes } from "react-router-dom";
import { LOGIN } from "../constants/routes.constants";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../layouts/MainLayout.tsx";

const AppRoutes = () => {
    return (
        <>
           <Routes>
            <Route path={LOGIN} element={<LoginPage/>}/>
               <Route element={<MainLayout/>}>

               </Route>
            </Routes> 
        </>
    );
};

export default AppRoutes;
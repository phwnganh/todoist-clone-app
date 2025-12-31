import { Route, Routes } from "react-router-dom";
import {LOGIN, PROJECTS} from "../constants/routes.constants";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../layouts/MainLayout.tsx";
import MyProjectsPage from "../pages/MyProjectsPage";

const AppRoutes = () => {
    return (
        <>
           <Routes>
            <Route path={LOGIN} element={<LoginPage/>}/>
               <Route element={<MainLayout/>}>
                    <Route path={PROJECTS} element={<MyProjectsPage/>}/>
               </Route>
            </Routes> 
        </>
    );
};

export default AppRoutes;
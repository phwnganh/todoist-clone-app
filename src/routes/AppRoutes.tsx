import { Route, Routes } from "react-router-dom";
import {
    ACTIVITY,
    FILTERS_LABEL,
    INBOX,
    LOGIN,
    PROJECT_DETAILS,
    PROJECTS,
    TODAY,
    UPCOMING
} from "../constants/routes.constants";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../layouts/MainLayout.tsx";
import MyProjectsPage from "../pages/MyProjectsPage";
import InboxPage from "../pages/InboxPage";
import TodayPage from "../pages/TodayPage";
import UpcomingPage from "../pages/UpcomingPage";
import FiltersPage from "../pages/FiltersPage";
import ActivityPage from "../pages/ActivityPage";
import MyProjectDetailPage from "../pages/MyProjectDetailPage";

const AppRoutes = () => {
    return (
        <>
           <Routes>
            <Route path={LOGIN} element={<LoginPage/>}/>
               <Route element={<MainLayout/>}>
                   <Route path={PROJECTS} element={<MyProjectsPage/>}/>
                   <Route path={`${PROJECT_DETAILS}/:projectId`} element={<MyProjectDetailPage/>}/>
                   <Route path={INBOX} element={<InboxPage/>}/>
                   <Route path={TODAY} element={<TodayPage/>}/>
                   <Route path={UPCOMING} element={<UpcomingPage/>}/>
                   <Route path={FILTERS_LABEL} element={<FiltersPage/>}/>
                   <Route path={ACTIVITY} element={<ActivityPage/>}/>
               </Route>
            </Routes> 
        </>
    );
};

export default AppRoutes;
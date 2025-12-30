import Sidebar from "../components/DashboardLayout/Sidebar.tsx";
import Header from "../components/DashboardLayout/Header.tsx";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <main className="flex h-full">
            <Sidebar/>
            <div className="flex flex-col">
                <Header/>
                <Outlet/>
            </div>
        </main>
    );
};

export default MainLayout;
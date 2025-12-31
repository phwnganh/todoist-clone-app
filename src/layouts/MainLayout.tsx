import Sidebar from "../components/SidebarComponent/Sidebar.tsx";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <main className="flex w-full h-full">
            <Sidebar/>
            <div className="flex flex-col">
                <Outlet/>
            </div>
        </main>
    );
};

export default MainLayout;
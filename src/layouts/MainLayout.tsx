import Sidebar from "../components/SidebarComponent/Sidebar.tsx";
import {Outlet} from "react-router-dom";
import CollapseSideBarIcon from "../components/icons/CollapseSideBarIcon.tsx";
import {useEffect, useState} from "react";

const MainLayout = () => {
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleToggleSidebar = () => {
        setOpenSidebar(prev => !prev)
    }

    useEffect(() => {
        const media = window.matchMedia("(max-width: 768px)")

        const handleHiddenSidebar = () => {
            // breakpoint thay doi -> responsive md -> auto dong sidebar
            if(media.matches){
                setOpenSidebar(false)
            }
        }
        handleHiddenSidebar() // chi chay 1 lan
        media.addEventListener("change", handleHiddenSidebar)
        return () => media.removeEventListener("change", handleHiddenSidebar)
    }, [])
    return (
        <main className="flex w-full h-full">
            <Sidebar open={openSidebar} onToggle={handleToggleSidebar}/>
            <div className="flex flex-col px-3 mt-3">
                {!openSidebar &&                 <button className="w-8 h-8 flex justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small" onClick={handleToggleSidebar}>
                    <CollapseSideBarIcon/>
                </button>}


                <Outlet/>
            </div>
        </main>
    );
};

export default MainLayout;
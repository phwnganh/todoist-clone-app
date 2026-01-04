import Sidebar from "../components/SidebarComponent/Sidebar.tsx";
import {Outlet} from "react-router-dom";
import CollapseSideBarIcon from "../components/icons/CollapseSideBarIcon.tsx";
import {useCallback, useEffect, useState} from "react";

const MainLayout = () => {
    const [openSidebar, setOpenSidebar] = useState(true);
    const [isMobile, setIsMobile] = useState(false)
    const handleToggleSidebar = useCallback(() => {
        setOpenSidebar(prev => !prev)
    }, [])

    useEffect(() => {
        const media = window.matchMedia("(max-width: 768px)")
        const handleMediaChange = () => {
            const isMobile = media.matches
            setIsMobile(isMobile);
            setOpenSidebar(!isMobile);
        }
        handleMediaChange() // chi chay 1 lan
        media.addEventListener("change", handleMediaChange)
        return () => media.removeEventListener("change", handleMediaChange)
    }, [])
    return (
        <main className="relative flex w-full h-full">
            <Sidebar open={openSidebar} onToggle={handleToggleSidebar}/>
            {isMobile && openSidebar && (
                <div className="fixed inset-0 bg-black/40 z-30" onClick={handleToggleSidebar}></div>
            )}
            <div className="flex flex-col px-3 mt-3 flex-1 relative z-0">
                {!openSidebar &&
                    <button className="w-8 h-8 flex justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small" onClick={handleToggleSidebar}>
                    <CollapseSideBarIcon/>
                </button>}


                <Outlet/>
            </div>
        </main>
    );
};

export default MainLayout;
import Sidebar from "../components/SidebarComponent/Sidebar.tsx";
import {Outlet} from "react-router-dom";
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
        handleMediaChange() // only run 1 time
        media.addEventListener("change", handleMediaChange)
        return () => media.removeEventListener("change", handleMediaChange)
    }, [])
    return (
        <main className="relative flex w-full min-h-screen">
            <Sidebar open={openSidebar} onToggle={handleToggleSidebar} isMobile={isMobile}/>
            {isMobile && openSidebar && (
                <div className="fixed inset-0 bg-black/40 z-30" onClick={handleToggleSidebar}></div>
            )}
            <div className="flex flex-col mt-3 px-3 flex-1 relative z-0">
                <Outlet context={{
                    showCollapse: !openSidebar,
                    onToggleSidebar: handleToggleSidebar,
                }}/>
            </div>

        </main>
    );
};

export default MainLayout;
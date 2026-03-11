import Sidebar from "@/components/SidebarComponent/Sidebar.tsx";
import {Outlet} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";

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
        <ProtectedRoute>
            <main className="relative flex w-full h-screen">
                <Sidebar open={openSidebar} onToggle={handleToggleSidebar} isMobile={isMobile}/>
                {isMobile && openSidebar && (
                    <div className="fixed inset-0 bg-product-library-display-tertiary-idle-tint z-40" onClick={handleToggleSidebar}></div>
                )}
                <div className="flex flex-col px-3 flex-1 overflow-y-auto scrollbar-thin scrollbar-custom bg-product-library-background-base-primary text-product-library-display-primary-idle-tint">
                    <Outlet context={{
                        showCollapse: !openSidebar,
                        onToggleSidebar: handleToggleSidebar,
                    }}/>
                </div>

            </main>

        </ProtectedRoute>
    );
};

export default MainLayout;
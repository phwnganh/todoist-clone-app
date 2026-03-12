import {useSidebarStore} from "@/stores/sidebar.store.ts";
import LargeCloseIcon from "@/components/icons/LargeCloseIcon.tsx";

const SettingsModalHeaderSidebar = () => {
    const {isMobileSidebarOpen, onCloseMobileSidebar} = useSidebarStore()
    return (
        <header className={"flex items-center justify-between pb-2"}>
            <h1 className={"font-medium text-product-library-display-primary-idle-tint text-base"}>Settings</h1>
            {isMobileSidebarOpen && (
                <button aria-label={"Close dialog"} className={"flex md:hidden justify-center items-center"} onClick={onCloseMobileSidebar}>
                    <LargeCloseIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                </button>
            )}
        </header>
    );
};

export default SettingsModalHeaderSidebar;
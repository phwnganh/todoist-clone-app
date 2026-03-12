import {useSidebarStore} from "@/stores/sidebar.store.ts";
import LargeCloseIcon from "@/components/icons/LargeCloseIcon.tsx";
import CollapseSidebarIcon from "@/components/icons/CollapseSidebarIcon.tsx";
const SettingsModalMainHeaderSection = () => {
    const {activeKey, onCloseSettingModalDialog, onOpenMobileSidebar} = useSidebarStore()
    return (
        <header className={"py-2 pr-2 pl-4 flex justify-between items-center border-b border-product-library-divider-tertiary"}>
            <div className={"flex items-center gap-small"}>
                <button type={"button"} onClick={onOpenMobileSidebar} className="w-8 h-8 flex md:hidden justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
                    <CollapseSidebarIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                </button>
                <h2 className={"font-medium text-base text-product-library-display-primary-idle-tint"}>{activeKey === "account" ? "Account" : "Theme"}</h2>

            </div>
            <button aria-label={"Close dialog"} className={"flex justify-center items-center"} onClick={onCloseSettingModalDialog}>
                <LargeCloseIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
            </button>
        </header>
    );
};

export default SettingsModalMainHeaderSection;
import {useSidebarStore} from "@/stores/sidebar.store.ts";
import LargeCloseIcon from "@/components/icons/LargeCloseIcon.tsx";
const SettingsModalMainHeaderSection = () => {
    const {activeKey, onCloseSettingModalDialog} = useSidebarStore()
    return (
        <header className={"py-2 pr-2 pl-4 flex justify-between items-center border-b border-product-library-divider-tertiary"}>
            <h2 className={"font-medium text-base text-product-library-display-primary-idle-tint"}>{activeKey === "account" ? "Account" : "Theme"}</h2>
            <button aria-label={"Close dialog"} className={"flex justify-center items-center"} onClick={onCloseSettingModalDialog}>
                <LargeCloseIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
            </button>
        </header>
    );
};

export default SettingsModalMainHeaderSection;
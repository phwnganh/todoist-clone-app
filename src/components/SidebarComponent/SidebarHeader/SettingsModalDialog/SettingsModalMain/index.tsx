import SettingsModalMainHeaderSection from "./SettingsModalMainHeaderSection.tsx";
import {useSidebarStore} from "@/stores/sidebar.store.ts";
import AccountSettingsSection
    from "@/components/SidebarComponent/SidebarHeader/SettingsModalDialog/SettingsModalMain/SettingsModalMainContentSection/AccountSettingsSection.tsx";
import ThemeSettingsSection
    from "@/components/SidebarComponent/SidebarHeader/SettingsModalDialog/SettingsModalMain/SettingsModalMainContentSection/ThemeSettingsSection.tsx";

const SettingsModalMain = () => {
    const {activeKey} = useSidebarStore();
    return (
        <div className={"w-full"}>
            <SettingsModalMainHeaderSection/>
            {activeKey === "account" && <AccountSettingsSection/>}
            {activeKey === "theme" && <ThemeSettingsSection/>}
        </div>
    );
};

export default SettingsModalMain;
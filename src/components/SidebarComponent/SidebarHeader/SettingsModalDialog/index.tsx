import SettingsModalSidebar from "./SettingsModalSidebar";
import SettingsModalMain from "./SettingsModalMain";
import CustomDetailModalDialog from "@/components/ui/CustomDetailModalDialog.tsx";

const SettingModalDialog = () => {
    return (
        <CustomDetailModalDialog className={"flex"}>
            <SettingsModalSidebar/>
            <SettingsModalMain/>
        </CustomDetailModalDialog>

    );
};

export default SettingModalDialog;
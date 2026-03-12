import {createPortal} from "react-dom";
import SettingsModalSidebar from "./SettingsModalSidebar";
import SettingsModalMain from "./SettingsModalMain";

const SettingModalDialog = () => {
    return createPortal(
        <div role={"dialog"} aria-modal={"true"} aria-labelledby={"setting-detail"} className={"fixed inset-0 bg-product-library-background-overlay z-50 md:pt-16"}>
            <div className={"w-216 max-w-full h-full md:h-200 mx-auto flex rounded-large bg-product-library-background-base-primary"}>
                    <SettingsModalSidebar/>
                    <SettingsModalMain/>
            </div>
        </div>,
        document.body
    );
};

export default SettingModalDialog;
import {createPortal} from "react-dom";
import SettingsModalSidebar from "./SettingsModalSidebar";
import SettingsModalMain from "./SettingsModalMain";

const SettingModalDialog = () => {
    return createPortal(
        <div role={"dialog"} aria-modal={"true"} aria-labelledby={"setting-detail"} className={"fixed inset-0 bg-black/40 z-50 md:pt-16"}>
            <div className={"w-216 max-w-full h-full md:h-200 mx-auto rounded-large bg-white"}>
                <main className={"flex md:flex-1 flex-col md:flex-row"}>
                    <SettingsModalSidebar/>
                    <SettingsModalMain/>
                </main>
            </div>
        </div>,
        document.body
    );
};

export default SettingModalDialog;
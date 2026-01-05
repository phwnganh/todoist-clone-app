import {useOutletContext} from "react-router-dom";
import {type HeaderLayoutType} from "../../types/headerLayout.type.ts";
import HeaderLayout from "../../layouts/HeaderLayout.tsx";
import SettingsIcon from "../../components/icons/SettingsIcon.tsx";

const MyProjectsPage = () => {
    const {showCollapse, onToggleSidebar} = useOutletContext<HeaderLayoutType>()
    return (
        <>
            <HeaderLayout showCollapse={showCollapse} onToggleSidebar={onToggleSidebar} right={
                <div className="flex items-center justify-center">
                    <div className="mr-1.5">
                        <SettingsIcon/>
                    </div>
                    <span className="text-product-library-actionable-quaternary-idle-tint text-sm font-medium">Settings</span>
                </div>
            }>

            </HeaderLayout>
            <section>my projects</section>
        </>
    );
};

export default MyProjectsPage;
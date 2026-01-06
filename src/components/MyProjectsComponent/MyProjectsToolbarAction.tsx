import PlusIcon from "../icons/PlusIcon.tsx";
import SmallArrowDownIcon from "../icons/SmallArrowDownIcon.tsx";
import MyProjectsDropdown from "./MyProjectsDropdown.tsx";
import {useState} from "react";
import CustomSwitch from "../ui/CustomSwitch.tsx";

const MyProjectsToolbarAction = () => {
    const [isOpenAddProjectsDropdown, setOpenAddProjectsDropdown] = useState(false);
    const handleOpenAddProjectsDropdown = () => {
        setOpenAddProjectsDropdown(prev => !prev);
    }
    return (
        <div className="flex justify-between flex-wrap gap-2 sm:gap-0">
            <div className="flex items-center">
                <p className="text-product-library-display-secondary-idle-tint text-sm pr-2">Archived projects only</p>
                <CustomSwitch/>
            </div>
            <div className="relative">
                <button onClick={handleOpenAddProjectsDropdown} className="px-3 h-8 flex items-center bg-product-library-actionable-secondary-idle-fill rounded-small hover:bg-product-library-border-hover-tint">
                    <div className="mr-1.5 flex justify-center items-center">
                        <PlusIcon/>
                    </div>
                    <span className="text-product-library-actionable-secondary-on-idle-tint overflow-hidden text-sm font-medium">Add</span>
                    <div className="ml-1.5 flex justify-center items-center">
                        <SmallArrowDownIcon/>
                    </div>
                </button>
                {isOpenAddProjectsDropdown && <MyProjectsDropdown/>}
            </div>

        </div>
    );
};

export default MyProjectsToolbarAction;
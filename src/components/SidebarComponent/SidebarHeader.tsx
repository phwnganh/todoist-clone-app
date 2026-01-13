import BellIcon from "../../assets/bell-icon.svg";
import CollapseSideBarIcon from "../../assets/collapse-sidebar-icon.svg";
import UserInfoHeader from "./UserInfoHeader.tsx";

const SidebarHeader = ({onToggle}: {onToggle: () => void}) => {
    const buttonIconClass =
        "w-8 h-8 flex justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small";

    return (
        <div className="flex justify-between items-center m-medium pl-2">
            <UserInfoHeader/>
            <div className="flex items-center gap-xsmall">
                <button className={buttonIconClass}>
                    <img src={BellIcon} alt={"bell-icon"}/>
                </button>
                <button onClick={onToggle} className={buttonIconClass}>
                    <img src={CollapseSideBarIcon} alt={"collapse-side-bar-icon"}/>
                </button>
            </div>
        </div>
    );
};

export default SidebarHeader;
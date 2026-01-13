import BellIcon from "../icons/BellIcon.tsx";
import CollapseSideBarIcon from "../icons/CollapseSideBarIcon.tsx";
import UserInfoHeader from "./UserInfoHeader.tsx";

const SidebarHeader = ({onToggle}: {onToggle: () => void}) => {
    const buttonIconClass =
        "w-8 h-8 flex justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small";

    return (
        <div className="flex justify-between items-center m-medium pl-2">
            <UserInfoHeader/>
            <div className="flex items-center gap-xsmall">
                <button className={buttonIconClass}>
                    <BellIcon />
                </button>
                <button onClick={onToggle} className={buttonIconClass}>
                    <CollapseSideBarIcon />
                </button>
            </div>
        </div>
    );
};

export default SidebarHeader;
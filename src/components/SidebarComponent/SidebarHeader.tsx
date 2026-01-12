import {useGetUserProfile} from "../../hooks/useUserProfile.ts";
import SmallArrowDownIcon from "../icons/SmallArrowDownIcon.tsx";
import BellIcon from "../icons/BellIcon.tsx";
import CollapseSideBarIcon from "../icons/CollapseSideBarIcon.tsx";
import LoadingSpin from "../ui/LoadingSpin.tsx";
import ErrorDisplayed from "../ui/ErrorDisplayed.tsx";

const SidebarHeader = ({onToggle}: {onToggle: () => void}) => {
    const {data: user, isLoading, isError} = useGetUserProfile()
    const buttonIconClass =
        "w-8 h-8 flex justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small";

    if(isLoading){
        return <LoadingSpin/>
    }

    if(isError){
        return <ErrorDisplayed/>
    }
    return (
        <div className="flex justify-between items-center m-medium pl-2">
            <button className="flex items-center py-0.75 -ml-0.75 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
                <div className="rounded-full w-6.5 h-6.5 bg-white -ml-1.5 mr-1.5">
                    <img src={user?.avatar_medium} alt={user?.full_name} />
                </div>
                <span className="flex items-center">
              <span className="whitespace-nowrap text-product-library-display-primary-idle-tint overflow-hidden">
                {user?.full_name?.trim().split(" ")[0]}
              </span>
              <SmallArrowDownIcon />
            </span>
            </button>
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
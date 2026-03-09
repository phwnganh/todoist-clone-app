import SmallArrowDownIcon from "../../../assets/small-arrow-down-icon.svg";
import LoadingSpin from "../../ui/LoadingSpin.tsx";
import ErrorDisplayed from "../../ui/ErrorDisplayed.tsx";
import { useGetUserProfile } from "../../../hooks/useQueryHook/useUserProfile.ts";
import {useRef, useState} from "react";
import SidebarHeaderDropdown from "./SidebarHeaderDropdown.tsx";
import {useClickOutside} from "../../../hooks/useClickOutside.ts";

const UserInfoHeader = () => {
  const { data: user, isLoading, isError } = useGetUserProfile();
  const userRef = useRef<HTMLDivElement | null>(null);
  const [openSidebarHeaderDropdown, setOpenSidebarHeaderDropdown] = useState(false)
    const handleOpenSidebarHeaderDropdown = () => {
      setOpenSidebarHeaderDropdown(prev => !prev)
    }

    const handleCloseSidebarHeaderDropdown = () => {
    setOpenSidebarHeaderDropdown(false)
    }

    useClickOutside({
    ref: userRef,
    enabled: openSidebarHeaderDropdown,
    handler: handleCloseSidebarHeaderDropdown,
  })
  if (isLoading) {
    return <LoadingSpin />;
  }

  if (isError) {
    return <ErrorDisplayed />;
  }

  return (
      <div className={"relative"} ref={userRef}>
        <button type={"button"} onClick={handleOpenSidebarHeaderDropdown} className="flex items-center py-0.75 -ml-0.75 hover:bg-product-library-selectable-secondary-hover-fill rounded-small relative">
          <div className="w-6.5 h-6.5 bg-white -ml-1.5 mr-1.5">
            <img
                src={user?.avatar_medium}
                alt={user?.full_name}
                className={"rounded-full"}
            />
          </div>
          <span className="flex items-center">
        <span className="whitespace-nowrap text-product-library-display-primary-idle-tint overflow-hidden">
          {user?.full_name?.trim().split(" ")[0]}
        </span>
        <img src={SmallArrowDownIcon} alt={"small-arrow-down-icon"} />
      </span>
        </button>
        {openSidebarHeaderDropdown &&  <SidebarHeaderDropdown userName={user?.full_name}/>}
      </div>
  );
};

export default UserInfoHeader;

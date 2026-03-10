import SmallArrowDownIcon from "@/assets/small-arrow-down-icon.svg";
import LoadingSpin from "@/components/ui/LoadingSpin.tsx";
import ErrorDisplayed from "@/components/ui/ErrorDisplayed.tsx";
import { useGetUserProfile } from "@/hooks/useQueryHook/useUserProfile.ts";
import {useRef} from "react";
import SidebarHeaderDropdown from "./SidebarHeaderDropdown.tsx";
import {useClickOutside} from "@/hooks/useClickOutside.ts";
import {useSidebarStore} from "@/stores/sidebar.store.ts";
import SettingModalDialog from "@/components/SidebarComponent/SidebarHeader/SettingsModalDialog";

const UserInfoHeader = () => {
  const { data: user, isLoading, isError } = useGetUserProfile();
  const userRef = useRef<HTMLDivElement | null>(null);
  const {onOpenSidebarHeaderDropdown, openSidebarHeaderDropdown, openSettingModalDialog, onCloseSidebarHeaderDropdown} = useSidebarStore()
    const handleOpenSidebarHeaderDropdown = () => {
      onOpenSidebarHeaderDropdown()
    }

    useClickOutside({
    ref: userRef,
    enabled: openSidebarHeaderDropdown,
    handler: onCloseSidebarHeaderDropdown,
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
        {openSettingModalDialog && <SettingModalDialog/>}
      </div>
  );
};

export default UserInfoHeader;

import CustomMenuDropdown from "@/components/ui/CustomMenuDropdown.tsx";
import type {SidebarHeaderMenuDropdown} from "@/types/menu-nav.type.ts";
import UserStatisticIcon from "@/components/icons/UserStatisticIcon.tsx";
import SettingIcon from "@/components/icons/SettingIcon.tsx";
import LogoutIcon from "@/components/icons/LogoutIcon.tsx";
import MyTasksMenuButton from "@/components/ui/MyTasksMenuButton.tsx";
import {useAuthStore} from "@/stores/auth.store.ts";
import {useSidebarStore} from "@/stores/sidebar.store.ts";

type SidebarHeaderDropdownProps = {
    userName?: string;
}
const SidebarHeaderDropdown = ({userName}: SidebarHeaderDropdownProps) => {
    const {logout} = useAuthStore()
    const {onCloseSidebarHeaderDropdown, onOpenSettingModalDialog} = useSidebarStore()
    const SIDEBAR_HEADER_DROPDOWN: SidebarHeaderMenuDropdown[] = [
        {
            label: `${userName}`,
            onClick: () => {
                console.log("username")
            },
            icon: <UserStatisticIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
        },
        "divider",
        {
            label: "Settings",
            onClick: () => {
                onCloseSidebarHeaderDropdown()
                onOpenSettingModalDialog()
            },
            icon: <SettingIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
        },
        "divider",
        {
            label: "Log out",
            onClick: logout,
            icon: <LogoutIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
        }
    ]

    return (
        <>
            <CustomMenuDropdown className={"left-0 min-w-60"}>
                {SIDEBAR_HEADER_DROPDOWN.map((item, index) => {
                    if(item === "divider"){
                        return (
                            <hr key={index} className={"border-t-product-library-divider-tertiary"}/>
                        )
                    }
                    return <MyTasksMenuButton key={index} label={item.label} onClick={item.onClick} icon={item.icon}/>
                })}
            </CustomMenuDropdown>
        </>
    );
};

export default SidebarHeaderDropdown;
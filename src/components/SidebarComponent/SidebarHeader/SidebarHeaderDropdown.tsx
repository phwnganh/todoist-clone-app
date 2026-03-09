import CustomMenuDropdown from "../../ui/CustomMenuDropdown.tsx";
import type {SidebarHeaderDropdown} from "../../../types/menu-nav.type.ts";
import UserStatisticIcon from "../../icons/UserStatisticIcon.tsx";
import SettingIcon from "../../icons/SettingIcon.tsx";
import LogoutIcon from "../../icons/LogoutIcon.tsx";
import MyTasksMenuButton from "../../ui/MyTasksMenuButton.tsx";
import {useAuthStore} from "../../../stores/auth.store.ts";

type SidebarHeaderDropdownProps = {
    userName?: string;
}
const SidebarHeaderDropdown = ({userName}: SidebarHeaderDropdownProps) => {
    const {logout} = useAuthStore()
    const SIDEBAR_HEADER_DROPDOWN: SidebarHeaderDropdown[] = [
        {
            label: `${userName}`,
            onClick: () => {
                console.log("username")
            },
            icon: <UserStatisticIcon/>
        },
        "divider",
        {
            label: "Settings",
            onClick: () => {
                console.log("settings")
            },
            icon: <SettingIcon/>
        },
        "divider",
        {
            label: "Log out",
            onClick: logout,
            icon: <LogoutIcon/>
        }
    ]

    return (
        <CustomMenuDropdown className={"left-0 min-w-60"}>
            {SIDEBAR_HEADER_DROPDOWN.map((item, index) => {
                if(item === "divider"){
                    return (
                        <hr key={index} className={"border-t-product-library-divider-tertiary"}/>
                    )
                }
                return <MyTasksMenuButton label={item.label} onClick={item.onClick} icon={item.icon}/>
            })}
        </CustomMenuDropdown>
    );
};

export default SidebarHeaderDropdown;
import {SETTING_MENU_NAV_ITEMS} from "@/data/menuNav.data.ts";
import type {SettingMenuNavItem} from "@/types/menu-nav.type.ts";
import SettingsModalNavItemSidebar from "@/components/SidebarComponent/SidebarHeader/SettingsModalDialog/SettingsModalSidebar/SettingsModalNavItemSidebar.tsx";
import {useState} from "react";
import SettingsModalHeaderSidebar
    from "@/components/SidebarComponent/SidebarHeader/SettingsModalDialog/SettingsModalSidebar/SettingsModalHeaderSidebar.tsx";

const SettingsModalSidebar = () => {
    const [activeKey, setActiveKey] = useState<string>("account");
    return (
        <aside className={"px-medium py-xsmall md:bg-product-library-background-base-secondary flex flex-col w-full gap-small md:w-80 shrink-0"}>
            <SettingsModalHeaderSidebar/>
            <ul className={"flex flex-col list-none"}>
                {SETTING_MENU_NAV_ITEMS.map((item: SettingMenuNavItem) => (
                    <SettingsModalNavItemSidebar key={item.key} item={item} active={activeKey === item.key} onClick={() => setActiveKey(item.key)}/>
                ))}
            </ul>
        </aside>
    );
};

export default SettingsModalSidebar;
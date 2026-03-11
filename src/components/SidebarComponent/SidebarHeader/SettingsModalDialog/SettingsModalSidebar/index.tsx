import {SETTING_MENU_NAV_ITEMS} from "@/data/menuNav.data.ts";
import type {SettingMenuNavItem} from "@/types/menu-nav.type.ts";
import SettingsModalNavItemSidebar from "@/components/SidebarComponent/SidebarHeader/SettingsModalDialog/SettingsModalSidebar/SettingsModalNavItemSidebar.tsx";
import SettingsModalHeaderSidebar
    from "@/components/SidebarComponent/SidebarHeader/SettingsModalDialog/SettingsModalSidebar/SettingsModalHeaderSidebar.tsx";
import {useSidebarStore} from "@/stores/sidebar.store.ts";

const SettingsModalSidebar = () => {
    const {activeKey, handleChangeActiveKey} = useSidebarStore()
    return (
        <aside className={"p-medium md:bg-product-library-background-base-secondary flex flex-col w-full gap-small md:w-80 shrink-0"}>
            <SettingsModalHeaderSidebar/>
            <ul className={"flex flex-col list-none"}>
                {SETTING_MENU_NAV_ITEMS.map((item: SettingMenuNavItem) => (
                    <SettingsModalNavItemSidebar key={item.key} item={item} active={activeKey === item.key} onClick={() => handleChangeActiveKey(item.key)}/>
                ))}
            </ul>
        </aside>
    );
};

export default SettingsModalSidebar;
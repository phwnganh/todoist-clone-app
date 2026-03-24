import {create} from "zustand/react";

type SidebarStore = {
    openSettingModalDialog: boolean,
    openSidebarHeaderDropdown: boolean,
    activeKey: string,
    isMobileSidebarOpen: boolean,
    onOpenMobileSidebar: () => void,
    onCloseMobileSidebar: () => void,
    onOpenSettingModalDialog: () => void,
    onCloseSettingModalDialog: () => void,
    onOpenSidebarHeaderDropdown: () => void,
    onCloseSidebarHeaderDropdown: () => void,
    handleChangeActiveKey: (key: string) => void,
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    openSettingModalDialog: false,
    openSidebarHeaderDropdown: false,
    activeKey: "account",
    isMobileSidebarOpen: false,
    onOpenMobileSidebar: () => set({isMobileSidebarOpen: true}),
    onCloseMobileSidebar: () => set({isMobileSidebarOpen: false}),
    onOpenSettingModalDialog: () => set({openSettingModalDialog: true}),
    onCloseSettingModalDialog: () => set({openSettingModalDialog: false}),
    onOpenSidebarHeaderDropdown: () => set({openSidebarHeaderDropdown: true}),
    onCloseSidebarHeaderDropdown: () => set({openSidebarHeaderDropdown: false}),
    handleChangeActiveKey: (key: string) => set({activeKey: key}),
}))
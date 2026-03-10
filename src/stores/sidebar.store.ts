import {create} from "zustand/react";

type SidebarStore = {
    openSettingModalDialog: boolean,
    openSidebarHeaderDropdown: boolean,
    activeKey: string,
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
    onOpenSettingModalDialog: () => set({openSettingModalDialog: true}),
    onCloseSettingModalDialog: () => set({openSettingModalDialog: false}),
    onOpenSidebarHeaderDropdown: () => set({openSidebarHeaderDropdown: true}),
    onCloseSidebarHeaderDropdown: () => set({openSidebarHeaderDropdown: false}),
    handleChangeActiveKey: (key: string) => set({activeKey: key}),
}))
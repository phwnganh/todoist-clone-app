import {create} from "zustand/react";

type SidebarStore = {
    openSettingModalDialog: boolean,
    openSidebarHeaderDropdown: boolean,
    onOpenSettingModalDialog: () => void,
    onCloseSettingModalDialog: () => void,
    onOpenSidebarHeaderDropdown: () => void,
    onCloseSidebarHeaderDropdown: () => void,
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    openSettingModalDialog: false,
    openSidebarHeaderDropdown: false,
    onOpenSettingModalDialog: () => set({openSettingModalDialog: true}),
    onCloseSettingModalDialog: () => set({openSettingModalDialog: false}),
    onOpenSidebarHeaderDropdown: () => set({openSidebarHeaderDropdown: true}),
    onCloseSidebarHeaderDropdown: () => set({openSidebarHeaderDropdown: false}),
}))
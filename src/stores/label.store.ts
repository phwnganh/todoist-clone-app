import {create} from "zustand/react";

type LabelStore = {
    openAddLabelModalDialog: boolean;
    openEditLabelModalDialog: string | null;
    openDeleteLabelModalDialog: string | null;
    openLabelToolbarDropdown: string | null;
    onOpenAddLabelModalDialog: () => void;
    onCloseAddLabelModalDialog: () => void;
    onOpenEditLabelModalDialog: (labelId: string) => void;
    onCloseEditLabelModalDialog: () => void;
    onOpenDeleteLabelModalDialog: (labelId: string) => void;
    onCloseDeleteLabelModalDialog: () => void;
    onOpenLabelToolbarDropdown: (labelId: string) => void;
    onCloseLabelToolbarDropdown: () => void;
}

export const useLabelStore = create<LabelStore>(set => ({
    openAddLabelModalDialog: false,
    openEditLabelModalDialog: null,
    openDeleteLabelModalDialog: null,
    openLabelToolbarDropdown: null,
    onOpenAddLabelModalDialog: () => set({openAddLabelModalDialog: true}),
    onCloseAddLabelModalDialog: () => set({openAddLabelModalDialog: false}),
    onOpenEditLabelModalDialog: (labelId) => set({openEditLabelModalDialog: labelId}),
    onCloseEditLabelModalDialog: () => set({openEditLabelModalDialog: null}),
    onOpenDeleteLabelModalDialog: (labelId) => set({openDeleteLabelModalDialog: labelId}),
    onCloseDeleteLabelModalDialog: () => set({openDeleteLabelModalDialog: null}),
    onOpenLabelToolbarDropdown: (labelId) => set({openLabelToolbarDropdown: labelId}),
    onCloseLabelToolbarDropdown: () => set({openLabelToolbarDropdown: null}),
}))
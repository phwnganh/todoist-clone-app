import {create} from "zustand/react";

type LabelStore = {
    openAddLabelModalDialog: boolean;
    openEditLabelModalDialog: string | null;
    onOpenAddLabelModalDialog: () => void;
    onCloseAddLabelModalDialog: () => void;
    onOpenEditLabelModalDialog: (labelId: string) => void;
    onCloseEditLabelModalDialog: () => void;
}

export const useLabelStore = create<LabelStore>(set => ({
    openAddLabelModalDialog: false,
    openEditLabelModalDialog: null,
    onOpenAddLabelModalDialog: () => set({openAddLabelModalDialog: true}),
    onCloseAddLabelModalDialog: () => set({openAddLabelModalDialog: false}),
    onOpenEditLabelModalDialog: (labelId) => set({openEditLabelModalDialog: labelId}),
    onCloseEditLabelModalDialog: () => set({openEditLabelModalDialog: null})
}))
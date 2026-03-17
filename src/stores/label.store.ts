import {create} from "zustand/react";

type LabelStore = {
    openLabelModalDialog: boolean;
    onOpenLabelModalDialog: () => void;
    onCloseLabelModalDialog: () => void;
}

export const useLabelStore = create<LabelStore>(set => ({
    openLabelModalDialog: false,
    onOpenLabelModalDialog: () => set({openLabelModalDialog: true}),
    onCloseLabelModalDialog: () => set({openLabelModalDialog: false}),
}))
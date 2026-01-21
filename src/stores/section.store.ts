import {create} from "zustand/react";

type SectionStore = {
    addSectionId: string | null | undefined;
    setAddSectionId: (sectionId: string | null | undefined) => void;
    editingSectionId: string | null;
    onOpenEditSection: (sectionId: string | null) => void;
    onCloseEditSection: () => void;
}

export const useSectionStore = create<SectionStore>(set => ({
    addSectionId: undefined,
    setAddSectionId: (sectionId) => set({addSectionId: sectionId}),
    editingSectionId: null,
    onOpenEditSection: (sectionId) => set({editingSectionId: sectionId}),
    onCloseEditSection: () => set({editingSectionId: null})
}))
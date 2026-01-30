import {create} from "zustand/react";

type SectionStore = {
    sectionId: string;
    setSectionId: (sectionId: string) => void;
    addSectionId: string | null | undefined;
    editingSectionId: string | null;
    onOpenAddSectionForm: (id: string | null) => void;
    onCloseAddSectionForm: () => void;
    onOpenEditSection: (sectionId: string | null) => void;
    onCloseEditSection: () => void;
}

export const useSectionStore = create<SectionStore>((set) => ({
    sectionId: "",
    setSectionId: (sectionId: string) => set({sectionId}),
    addSectionId: undefined,
    editingSectionId: null,
    onOpenAddSectionForm: (sectionId) => set({addSectionId: sectionId}),
    onCloseAddSectionForm: () => set({addSectionId: undefined}),
    onOpenEditSection: (sectionId) => set({editingSectionId: sectionId}),
    onCloseEditSection: () => set({editingSectionId: null}),
}))
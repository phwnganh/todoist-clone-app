import {create} from "zustand/react";

type SectionStore = {
    addSectionId: string | null | undefined;
    setAddSectionId: (sectionId: string | null | undefined) => void;
}

export const useSectionStore = create<SectionStore>(set => ({
    addSectionId: undefined,
    setAddSectionId: (sectionId) => set({addSectionId: sectionId}),
}))
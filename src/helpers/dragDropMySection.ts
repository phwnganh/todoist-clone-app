import type {ReorderSectionPayload, Section} from "@/types/section.type.ts";
import {arrayMove} from "@dnd-kit/sortable";

export const findSectionByIdToOrder = (sections: Section[], id: string) => {
    return sections.find(section => section.id === id);
}

export const handleReorderSection = (sections: Section[], activeSection: Section, overSection: Section, reorderSection: (payload: ReorderSectionPayload) => void) => {

    const fromIndex = sections.findIndex(section => section.id === activeSection.id);
    const toIndex = sections.findIndex(section => section.id === overSection.id);
    const reordered = arrayMove(sections, fromIndex, toIndex);

    reorderSection({
        sections: reordered.filter(section => section.id !== null).map((section, index) => ({
            id: section.id as string,
            section_order: index
        }))
    })
    return;
}


import {create} from "zustand/react";

type DragPreview = {
    activeId: string | null;
    overId: string | null;
    dropType: "inside" | "between" | null;
}

type DragStore = {
    dragPreview: DragPreview;
    setDragPreview: (dragPreview: DragPreview) => void;
    clearDragPreview: () => void;
}

export const useDragStore = create<DragStore>(set => ({
    dragPreview: {
        activeId: null,
        overId: null,
        dropType: null
    },
    setDragPreview: preview => set({dragPreview: preview}),
    clearDragPreview: () => set({dragPreview: {
        activeId: null,
            overId: null,
            dropType: null
        }})
}))
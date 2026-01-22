import {create} from "zustand/react";

type TaskStore = {
    addingTaskId: string | null | undefined;
    editingTaskId: string | null;
    onOpenEditTask: (taskId: string) => void;
    onCloseEditTask: () => void;
    onOpenAddMyTask: (sectionId: string | null) => void;
    onCloseAddMyTask: () => void;
}
export const useTaskStore = create<TaskStore>(set => ({
    addingTaskId: undefined,
    editingTaskId: null,
    openAddMyTask: false,
    onOpenEditTask: (taskId) => set({editingTaskId: taskId}),
    onCloseEditTask: () => set({editingTaskId: null}),
    onOpenAddMyTask: (sectionId) => set({addingTaskId: sectionId}),
    onCloseAddMyTask: () => set({addingTaskId: undefined}),
}))
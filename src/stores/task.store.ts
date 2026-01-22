import {create} from "zustand/react";

type TaskStore = {
    openAddMyTask: boolean;
    editingTaskId: string | null;
    onOpenEditTask: (taskId: string) => void;
    onCloseEditTask: () => void;
    onOpenAddMyTask: () => void;
    onCloseAddMyTask: () => void;
}
export const useTaskStore = create<TaskStore>(set => ({
    editingTaskId: null,
    openAddMyTask: false,
    onOpenEditTask: (taskId) => set({editingTaskId: taskId}),
    onCloseEditTask: () => set({editingTaskId: null}),
    onOpenAddMyTask: () => set({openAddMyTask: true}),
    onCloseAddMyTask: () => set({openAddMyTask: false}),
}))
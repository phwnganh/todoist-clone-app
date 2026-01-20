import {create} from "zustand/react";

type TaskStore = {
    editingTaskId: string | null;
    onOpenEditTask: (taskId: string) => void;
    onCloseEditTask: () => void;
}
export const useTaskStore = create<TaskStore>(set => ({
    editingTaskId: null,
    onOpenEditTask: (taskId) => set({editingTaskId: taskId}),
    onCloseEditTask: () => set({editingTaskId: null})
}))
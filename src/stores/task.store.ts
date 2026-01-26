import {create} from "zustand/react";

type TaskStore = {
    addingTaskId: string | null | undefined;
    editingTaskId: string | null;
    taskDetailId: string | null;
    onOpenEditTask: (taskId: string) => void;
    onCloseEditTask: () => void;
    onOpenAddMyTask: (sectionId: string | null) => void;
    onCloseAddMyTask: () => void;
    openTaskDetailToolbar: string | null;
    onOpenTaskDetailToolbar: (taskId: string) => void;
    onCloseTaskDetailToolbar: () => void;
    onOpenTaskDetail: (taskId: string) => void;
    onCloseTaskDetail: () => void;
}
export const useTaskStore = create<TaskStore>(set => ({
    addingTaskId: undefined,
    editingTaskId: null,
    taskDetailId: null,
    openAddMyTask: false,
    onOpenEditTask: (taskId) => set({editingTaskId: taskId}),
    onCloseEditTask: () => set({editingTaskId: null}),
    onOpenAddMyTask: (sectionId) => set({addingTaskId: sectionId}),
    onCloseAddMyTask: () => set({addingTaskId: undefined}),
    openTaskDetailToolbar: null,
    onOpenTaskDetailToolbar: (taskId) => set({openTaskDetailToolbar: taskId}),
    onCloseTaskDetailToolbar: () => set({openTaskDetailToolbar: null}),
    onOpenTaskDetail: (taskId) => set({taskDetailId: taskId}),
    onCloseTaskDetail: () => set({taskDetailId: null})
}))
import {create} from "zustand/react";
import type {Task} from "../types/task.type.ts";

type TaskStore = {
    addingTaskId: string | null | undefined;
    editingTaskId: string | null;
    taskDetail: Task | null;
    deleteTaskId: string | null;
    onOpenEditTask: (taskId: string) => void;
    onCloseEditTask: () => void;
    onOpenAddMyTask: (sectionId: string | null) => void;
    onCloseAddMyTask: () => void;
    openTaskDetailToolbar: string | null;
    onOpenTaskDetailToolbar: (taskId: string) => void;
    onCloseTaskDetailToolbar: () => void;
    onOpenTaskDetail: (task: Task) => void;
    onCloseTaskDetail: () => void;
    onOpenDeleteMyTask: (taskId: string) => void;
    onCloseDeleteMyTask: () => void;
}
export const useTaskStore = create<TaskStore>(set => ({
    addingTaskId: undefined,
    editingTaskId: null,
    taskDetail: null,
    deleteTaskId: null,
    openAddMyTask: false,
    onOpenEditTask: (taskId) => set({editingTaskId: taskId}),
    onCloseEditTask: () => set({editingTaskId: null}),
    onOpenAddMyTask: (sectionId) => set({addingTaskId: sectionId}),
    onCloseAddMyTask: () => set({addingTaskId: undefined}),
    openTaskDetailToolbar: null,
    onOpenTaskDetailToolbar: (taskId) => set({openTaskDetailToolbar: taskId}),
    onCloseTaskDetailToolbar: () => set({openTaskDetailToolbar: null}),
    onOpenTaskDetail: (task) => set({taskDetail: task}),
    onCloseTaskDetail: () => set({taskDetail: null}),
    onOpenDeleteMyTask: (taskId) => set({deleteTaskId: taskId}),
    onCloseDeleteMyTask: () => set({deleteTaskId: null})
}))
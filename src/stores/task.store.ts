import {create} from "zustand/react";
import type {Task} from "../types/task.type.ts";

type TaskStore = {
    addingTaskId: string | null | undefined;
    addingSubTaskId: string | null;
    editingTaskId: string | null;
    taskDetailId: string | null;
    deleteTaskId: string | null;
    onOpenEditTask: (taskId: string) => void;
    onCloseEditTask: () => void;
    onOpenAddMyTask: (sectionId: string | null | undefined) => void;
    onCloseAddMyTask: () => void;
    openTaskDetailToolbar: string | null;
    onOpenTaskDetailToolbar: (taskId: string) => void;
    onCloseTaskDetailToolbar: () => void;
    onOpenTaskDetail: (taskId: string) => void;
    onCloseTaskDetail: () => void;
    onOpenDeleteMyTask: (taskId: string) => void;
    onCloseDeleteMyTask: () => void;
    onOpenAddSubTask: (task: Task) => void;
    onCloseAddSubTask: () => void;
}
export const useTaskStore = create<TaskStore>(set => ({
    addingTaskId: undefined,
    addingSubTaskId: null,
    editingTaskId: null,
    taskDetailId: null,
    deleteTaskId: null,
    openAddMyTask: false,
    onOpenEditTask: (taskId) => set({editingTaskId: taskId}),
    onCloseEditTask: () => set({editingTaskId: null}),
    onOpenAddMyTask: (sectionId) => set({addingTaskId: sectionId}),
    onCloseAddMyTask: () => set({addingTaskId: undefined}),
    openTaskDetailToolbar: null,
    onOpenTaskDetailToolbar: (taskId) => set({openTaskDetailToolbar: taskId}),
    onCloseTaskDetailToolbar: () => set({openTaskDetailToolbar: null}),
    onOpenTaskDetail: (taskId) => set({taskDetailId: taskId}),
    onCloseTaskDetail: () => set({taskDetailId: null}),
    onOpenDeleteMyTask: (taskId) => set({deleteTaskId: taskId}),
    onCloseDeleteMyTask: () => set({deleteTaskId: null}),
    onOpenAddSubTask: (task) => set({
        addingTaskId: task.section_id ?? null,
        addingSubTaskId: task.id
    }),
    onCloseAddSubTask: () => set({
        addingTaskId: null,
        addingSubTaskId: null
    })
}))
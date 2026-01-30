import {create} from "zustand/react";

type TaskStore = {
    addingTaskId: string | null | undefined;
    addingSubTaskId: string | null | undefined;
    editingTaskId: string | null;
    editingSubTaskId: string | null | undefined;
    taskDetailId: string | null;
    deleteTaskId: string | null;
    onOpenEditTask: (taskId: string) => void;
    onOpenEditSubTask: (taskId: string | null | undefined) => void;
    onCloseEditTask: () => void;
    onCloseEditSubTask: () => void;
    onOpenAddMyTask: (taskId: string | null | undefined) => void;
    onCloseAddMyTask: () => void;
    openTaskDetailToolbar: string | null;
    onOpenTaskDetailToolbar: (taskId: string) => void;
    onCloseTaskDetailToolbar: () => void;
    onOpenTaskDetail: (taskId: string) => void;
    onCloseTaskDetail: () => void;
    onOpenDeleteMyTask: (taskId: string) => void;
    onCloseDeleteMyTask: () => void;
    onOpenAddSubTask: (taskId: string | null | undefined) => void;
    onCloseAddSubTask: () => void;
}
export const useTaskStore = create<TaskStore>(set => ({
    addingTaskId: undefined,
    addingSubTaskId: null,
    editingTaskId: null,
    editingSubTaskId: null,
    taskDetailId: null,
    deleteTaskId: null,
    openAddMyTask: false,
    onOpenEditTask: (taskId) => set({editingTaskId: taskId}),
    onOpenEditSubTask: (taskId) => set({editingSubTaskId: taskId}),
    onCloseEditTask: () => set({editingTaskId: null}),
    onCloseEditSubTask: () => set({editingSubTaskId: null}),
    onOpenAddMyTask: (sectionId) => set({addingTaskId: sectionId}),
    onCloseAddMyTask: () => set({addingTaskId: undefined}),
    openTaskDetailToolbar: null,
    onOpenTaskDetailToolbar: (taskId) => set({openTaskDetailToolbar: taskId}),
    onCloseTaskDetailToolbar: () => set({openTaskDetailToolbar: null}),
    onOpenTaskDetail: (taskId) => set({taskDetailId: taskId}),
    onCloseTaskDetail: () => set({taskDetailId: null}),
    onOpenDeleteMyTask: (taskId) => set({deleteTaskId: taskId}),
    onCloseDeleteMyTask: () => set({deleteTaskId: null}),
    onOpenAddSubTask: (taskId) => set({addingSubTaskId: taskId}),
    onCloseAddSubTask: () => set({
        addingSubTaskId: null
    })
}))
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    apiAddMySubTask,
    apiAddMyTask,
    apiCompleteTask,
    apiDeleteMyTask,
    apiGetAllTasks,
    apiGetATask, apiMoveMyTask, apiReorderTask,
    apiUpdateMyTask
} from "@/services/task.service.ts";
import type {
    MoveTaskPayload, ReorderTaskPayload,
    SubTaskPayload,
    Task,
    TaskPayload, TaskQuery,
    TaskResponse,
    UpdateTaskPayload
} from "@/types/task.type.ts";
import type {ApiError, SyncResponse} from "@/types/api.type.ts";
import {
    optimisticAddMyTask, optimisticDeleteMyTask, optimisticReorderMyTask, optimisticUpdateMyTask,
    type OptimisticUpdatesContext,
} from "@/helpers/optimisticUpdates.ts";
import {commonTaskMutation} from "@/helpers/hookMutations.ts";

export const useGetAllTasks = (query?: TaskQuery) => {
    return useQuery<TaskResponse>({
        queryKey: ['tasks', query],
        queryFn: () => apiGetAllTasks(query),
        enabled: !!query?.project_id
    })
}

export const useGetATask = (taskId: string | null) => {
    return useQuery<Task>({
        queryKey: ['task-detail', taskId],
        queryFn: () => apiGetATask(taskId)
    })
}

export const useAddMyTask = () => {
    const queryClient = useQueryClient();
    return useMutation<SyncResponse, ApiError, TaskPayload, OptimisticUpdatesContext>({
        mutationFn: apiAddMyTask,
        onMutate: async (newTask) => {
            const tempId = `temp-task-${crypto.randomUUID()}`
            const optimisticTask: Task = {
                id: tempId,
                content: newTask.content,
                description: newTask.description,
                project_id: newTask.project_id,
                section_id: newTask.section_id ?? null,
                priority: newTask.priority ?? 1,
                parent_id: newTask.parent_id ?? null,
                child_order: Number.MAX_SAFE_INTEGER,
                due: newTask.due
            }
            const res = optimisticAddMyTask({
                queryClient,
                optimisticTask: optimisticTask
            })
            return {...res, tempId}
        },
    ...commonTaskMutation<SyncResponse, TaskPayload, OptimisticUpdatesContext>(queryClient, {
        onSuccess: (res, _, context) => {
            const realId = res.temp_id_mapping?.[context?.tempId ?? ""]
            if(!realId || !context) return;

            queryClient.setQueryData<TaskResponse>(["tasks"], old => {
                if(!old) return old;
                return {
                    ...old,
                    results: old.results.map(t => t.id === context.tempId ? {...t, id: realId} : t)
                }
            })
        }
    })
    })
}

export const useAddMySubTask = () => {
    const queryClient = useQueryClient();
    return useMutation<SyncResponse, ApiError, SubTaskPayload, OptimisticUpdatesContext>({
        mutationFn: apiAddMySubTask,
        onMutate: async (newSubTask) => {
            const tempId = `temp-subtask-${crypto.randomUUID()}`
            const parentTask = queryClient.getQueryData<TaskResponse>(["tasks"])?.results.find(t => t.id === newSubTask.parent_id)

            const optimisticTask: Task = {
                id: tempId,
                content: newSubTask.content,
                description: newSubTask.description,
                priority: newSubTask.priority ?? 1,
                parent_id: newSubTask.parent_id ?? null,
                project_id: parentTask?.project_id,
                section_id: parentTask?.section_id ?? null,
                child_order: Number.MAX_SAFE_INTEGER,
                due: {
                    date: parentTask?.due?.date
                },
                labels: newSubTask.labels || []
            }
            const res = optimisticAddMyTask({
                queryClient,
                optimisticTask: optimisticTask
            })
            return {...res, tempId}
        },
        ...commonTaskMutation<SyncResponse, SubTaskPayload, OptimisticUpdatesContext>(queryClient, {
            onSuccess: (res, _, context) => {
                const realId = res.temp_id_mapping?.[context?.tempId ?? ""]
                if(!realId || !context) return;

                queryClient.setQueryData<TaskResponse>(["tasks"], old => {
                    if(!old) return old;
                    return {
                        ...old,
                        results: old.results.map(t => t.id === context.tempId ? {...t, id: realId} : t)
                    }
                })
            }
        })
    })
}

export const useUpdateMyTask = () => {
    const queryClient = useQueryClient();
    return useMutation<SyncResponse, ApiError, UpdateTaskPayload, OptimisticUpdatesContext>({
        mutationFn: apiUpdateMyTask,
        onMutate: async (updatingTask) => {
            // const tempId = `temp-task-${crypto.randomUUID()}`
            return optimisticUpdateMyTask({
                queryClient,
                taskId: updatingTask.id,
                optimisticTask: {
                    id: updatingTask.id,
                    content: updatingTask.content,
                    description: updatingTask.description,
                    priority: updatingTask.priority,
                    labels: updatingTask.labels,
                    due: updatingTask.due,
                    child_order: updatingTask.child_order,
                }
            })
        },
        ...commonTaskMutation<SyncResponse, UpdateTaskPayload, OptimisticUpdatesContext>(queryClient)
    })
}

export const useMoveMyTask = () => {
    const queryClient = useQueryClient();
    return useMutation<SyncResponse, ApiError, MoveTaskPayload, OptimisticUpdatesContext>({
        mutationFn: apiMoveMyTask,
        onMutate: async (movingTask) => {
            return optimisticUpdateMyTask({
                queryClient,
                taskId: movingTask.id,
                optimisticTask: {
                    id: movingTask.id,
                    project_id: movingTask.project_id,
                    section_id: movingTask.section_id,
                    parent_id: movingTask.parent_id ?? null,
                }
            })
        },
        ...commonTaskMutation<SyncResponse, MoveTaskPayload, OptimisticUpdatesContext>(queryClient)
    })
}

export const useReorderTask = () => {
    const queryClient = useQueryClient();
    return useMutation<SyncResponse, ApiError, ReorderTaskPayload, OptimisticUpdatesContext>({
        mutationFn: apiReorderTask,
        onMutate: async (reorderingTask) => {
            return optimisticReorderMyTask({
                queryClient,
                payload: reorderingTask
            })
        },
        ...commonTaskMutation<SyncResponse, ReorderTaskPayload, OptimisticUpdatesContext>(queryClient)
    })
}
export const useDeleteMyTask = () => {
    const queryClient = useQueryClient();
    return useMutation<null, ApiError, {taskId: string}, OptimisticUpdatesContext>({
        mutationFn: ({taskId}) => apiDeleteMyTask(taskId),
        onMutate: async ({taskId}) => {
            return optimisticDeleteMyTask({
                queryClient,
                taskId: taskId,
            })
        },
        ...commonTaskMutation<null, {taskId: string}, OptimisticUpdatesContext>(queryClient)
    })
}

export const useCompleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation<SyncResponse, ApiError, {taskId: string}, OptimisticUpdatesContext>({
        mutationFn: ({taskId}) => apiCompleteTask(taskId),
        onMutate: async ({taskId}) => {
            return optimisticDeleteMyTask({
                queryClient,
                taskId: taskId,
            })
        },
        ...commonTaskMutation<SyncResponse, {taskId: string}, OptimisticUpdatesContext>(queryClient)
    })
}
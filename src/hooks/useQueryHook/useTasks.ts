import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    apiAddMySubTask,
    apiAddMyTask,
    apiDeleteMyTask,
    apiGetAllTasks,
    apiGetATask, apiMoveMyTask,
    apiUpdateMyTask
} from "../../services/task.service.ts";
import type {
    MoveTaskPayload,
    SubTaskPayload,
    Task,
    TaskPayload,
    TaskResponse,
    UpdateTaskPayload
} from "../../types/task.type.ts";
import type {ApiError, SyncResponse} from "../../types/api.type.ts";
import {
    optimisticAddMyTask, optimisticDeleteMyTask, optimisticUpdateMyTask,
    type OptimisticUpdatesContext,
    rollbackOptimisticUpdates
} from "../../helpers/optimisticUpdates.ts";

export const useGetAllTasks = () => {
    return useQuery<TaskResponse>({
        queryKey: ['tasks'],
        queryFn: apiGetAllTasks
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
                child_order: Number.MAX_SAFE_INTEGER
            }
            const res = optimisticAddMyTask({
                queryClient,
                queryKey: ['tasks'],
                optimisticTask: optimisticTask
            })
            return {...res, tempId}
        },
    onSuccess: (res, _, context) => {
            const realId = res.temp_id_mapping?.[context.tempId!]
        if(!realId) return;
        queryClient.setQueryData<TaskResponse>(["tasks"], (old) => {
            if(!old) return old;
            return {
                ...old,
                results: old.results.map(t => t.id === context.tempId ? {...t, id: realId} : t)
            }
        })
    },
        onError: (_, __, context) => {
            rollbackOptimisticUpdates({
                queryClient,
                queryKey: ["tasks"],
                context
            })
        },
        onSettled: (error) => {
            if(error){
                void queryClient.invalidateQueries({
                    queryKey: ["tasks"]
                })
            }

        }
    })
}

export const useAddMySubTask = () => {
    const queryClient = useQueryClient();
    return useMutation<SyncResponse, ApiError, SubTaskPayload, OptimisticUpdatesContext>({
        mutationFn: apiAddMySubTask,
        onMutate: async (newSubTask) => {
            const tempId = `temp-task-${crypto.randomUUID()}`
            const parentTask = queryClient.getQueryData<TaskResponse>(["tasks"])?.results.find(t => t.id === newSubTask.parent_id)

            const optimisticTask: Task = {
                id: tempId,
                content: newSubTask.content,
                description: newSubTask.description,
                priority: newSubTask.priority ?? 1,
                parent_id: newSubTask.parent_id ?? null,
                project_id: parentTask?.project_id,
                section_id: parentTask?.section_id ?? null,
                child_order: Number.MAX_SAFE_INTEGER
            }
            const res = optimisticAddMyTask({
                queryClient,
                queryKey: ['tasks'],
                optimisticTask: optimisticTask
            })
            return {...res, tempId}
        },
        onSuccess: (res, _, context) => {
            const realId = res.temp_id_mapping?.[context.tempId!]
            if(!realId) return;
            queryClient.setQueryData<TaskResponse>(["tasks"], (old) => {
                if(!old) return old;
                return {
                    ...old,
                    results: old.results.map(t => t.id === context.tempId ? {...t, id: realId} : t)
                }
            })
        },
        onError: (_, __, context) => {
            rollbackOptimisticUpdates({
                queryClient,
                queryKey: ["tasks"],
                context
            })
        },
        onSettled: (error) => {
            if(error){
                void queryClient.invalidateQueries({
                    queryKey: ["tasks"]
                })
            }

        }
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
                queryKey: ["tasks"],
                taskId: updatingTask.id,
                optimisticTask: {
                    id: updatingTask.id,
                    content: updatingTask.content,
                    description: updatingTask.description,
                    priority: updatingTask.priority
                }
            })
        },
        onError: (_, __, context) => {
            rollbackOptimisticUpdates({
                queryClient,
                queryKey: ["tasks"],
                context
            })
        },
        onSettled: () => {
            void queryClient.invalidateQueries({
                queryKey: ["tasks"]
            })
        }
    })
}

export const useMoveMyTask = () => {
    const queryClient = useQueryClient();
    return useMutation<SyncResponse, ApiError, MoveTaskPayload, OptimisticUpdatesContext>({
        mutationFn: apiMoveMyTask,
        onMutate: async (movingTask) => {
            return optimisticUpdateMyTask({
                queryClient,
                queryKey: ["tasks"],
                taskId: movingTask.id,
                optimisticTask: {
                    id: movingTask.id,
                    project_id: movingTask.project_id,
                    section_id: movingTask.section_id,
                    parent_id: null,
                }
            })
        },
        onError: (_, __, context) => {
            rollbackOptimisticUpdates({
                queryClient,
                queryKey: ["tasks"],
                context
            })
        },
        onSettled: () => {
            void queryClient.invalidateQueries({
                queryKey: ["tasks"]
            })
        }
    })
}
export const useDeleteMyTask = () => {
    const queryClient = useQueryClient();
    return useMutation<null, ApiError, {taskId: string}, OptimisticUpdatesContext>({
        mutationFn: ({taskId}) => apiDeleteMyTask(taskId),
        onMutate: async ({taskId}) => {
            return optimisticDeleteMyTask({
                queryClient,
                queryKey: ["tasks"],
                taskId: taskId,
            })
        },
        onError: (_, __, context) => {
            rollbackOptimisticUpdates({
                queryClient,
                queryKey: ["tasks"],
                context
            })
        },
        onSettled: () => {
            void queryClient.invalidateQueries({
                queryKey: ["tasks"]
            })
        }
    })
}
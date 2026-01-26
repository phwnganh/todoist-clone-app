import {useQuery} from "@tanstack/react-query";
import {apiGetAllTasks, apiGetATask} from "../../services/task.service.ts";
import type {Task, TaskResponse} from "../../types/task.type.ts";

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
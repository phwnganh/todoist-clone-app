import {useQuery} from "@tanstack/react-query";
import {apiGetAllTasks} from "../../services/task.service.ts";
import type {TaskResponse} from "../../types/task.type.ts";

export const useGetAllTasks = () => {
    return useQuery<TaskResponse>({
        queryKey: ['tasks'],
        queryFn: apiGetAllTasks
    })
}
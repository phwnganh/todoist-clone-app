import {api} from "./api.ts";
import type {Task, TaskResponse} from "../types/task.type.ts";

export const apiGetAllTasks = () => {
    return api.get<TaskResponse>("/tasks");
}

export const apiGetATask = async (taskId: string | null) => {
    return api.get<Task>(`/tasks/${taskId}`);
}
import {api} from "./api.ts";
import type {TaskResponse} from "../types/task.type.ts";

export const apiGetAllTasks = () => {
    return api.get<TaskResponse>("/tasks");
}
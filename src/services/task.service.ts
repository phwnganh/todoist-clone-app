import {api} from "./api.ts";
import type {Task, TaskPayload, TaskResponse, UpdateTaskPayload} from "../types/task.type.ts";
import type {SyncResponse} from "../types/api.type.ts";

export const apiGetAllTasks = () => {
    return api.get<TaskResponse>("/tasks");
}

export const apiGetATask = async (taskId: string | null) => {
    return api.get<Task>(`/tasks/${taskId}`);
}

export const apiAddMyTask = async (payload: TaskPayload): Promise<SyncResponse> => {
    const uuid = crypto.randomUUID()
    const tempId = `temp-task-${uuid}`
    return api.sync<SyncResponse, TaskPayload>([
        {
            type: "item_add",
            uuid,
            temp_id: tempId,
            args: payload
        }
    ])
}

export const apiUpdateMyTask = async(payload: UpdateTaskPayload) => {
    const uuid = crypto.randomUUID()
    return api.sync<SyncResponse, UpdateTaskPayload>([
        {
            type: "item_update",
            uuid,
            args: payload
        }
    ])
}

export const apiDeleteMyTask = async (taskId: string) => {
    return api.delete<null>(`/tasks/${taskId}`);
}
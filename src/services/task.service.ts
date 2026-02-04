import {api} from "./api.ts";
import type {
    MoveTaskPayload,
    SubTaskPayload,
    Task,
    TaskPayload,
    TaskResponse,
    UpdateTaskPayload
} from "../types/task.type.ts";
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

export const apiAddMySubTask = async (payload: SubTaskPayload): Promise<SyncResponse> => {
    const uuid = crypto.randomUUID()
    const tempId = `temp-subtask-${uuid}`
    return api.sync<SyncResponse, SubTaskPayload>([
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

export const apiMoveMyTask = async (payload: MoveTaskPayload)=> {
    const uuid = crypto.randomUUID()
    return api.sync<SyncResponse, MoveTaskPayload>([
        {
            type: "item_move",
            uuid,
            args: payload
        }
    ])
}

export const apiDeleteMyTask = async (taskId: string) => {
    return api.delete<null>(`/tasks/${taskId}`);
}

export const apiCompleteTask = async (taskId: string) => {
    const uuid = crypto.randomUUID()
    return api.sync<SyncResponse, {id: string}>([
        {
            type: "item_complete",
            uuid,
            args:
                {
                    id: taskId
                }
        }
    ])
}

export const apiUnCompleteTask = async (taskId: string) => {
    const uuid = crypto.randomUUID()
    return api.sync<SyncResponse, {id: string}>([
        {
            type: "item_uncomplete",
            uuid,
            args:
                {
                    id: taskId
                }
        }
    ])
}
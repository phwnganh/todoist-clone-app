import {api} from "./api.ts";
import type {Project, ProjectPayload, ProjectResponse, UpdateProjectPayload} from "../types/project.type.ts";
import type {SyncResponse} from "../types/api.type.ts";

export const apiGetAllProjects =  () => {
    return api.get<ProjectResponse>(`/projects`);
}

export const apiGetAProject = async (projectId: string) => {
    return api.get<Project>(`/projects/${projectId}`);
}

export const apiCreateMyProject = async (payload: ProjectPayload):Promise<SyncResponse> => {
    const uuid = crypto.randomUUID()
    const tempId = `temp-project-${uuid}`;
    return api.sync<SyncResponse, ProjectPayload>([
        {
            type: "project_add",
            uuid,
            temp_id: tempId,
            args: payload
        }
    ]);
}

export const apiUpdateMyProject = async (payload: UpdateProjectPayload) => {
    const uuid = crypto.randomUUID()
    return api.sync<SyncResponse, UpdateProjectPayload>([
        {
            type: "project_update",
            uuid,
            args: payload
        }
    ]);
}

export const apiDeleteMyProject = async (projectId: string) => {
    return api.delete<null>(`/projects/${projectId}`);
}
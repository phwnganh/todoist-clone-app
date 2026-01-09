import {api} from "./api.ts";
import type {Project, ProjectPayload, ProjectResponse} from "../types/project.type.ts";

export const apiGetAllProjects =  () => {
    return api.get<ProjectResponse>(`/projects`);
}

export const apiGetAProject = async (projectId: string) => {
    return api.get<Project>(`/projects/${projectId}`);
}

export const apiCreateMyProject = async (payload: ProjectPayload) => {
    return api.post<Project, ProjectPayload>(`/projects`, payload);
}

export const apiUpdateMyProject = async (payload: ProjectPayload, projectId: string) => {
    return api.post<Project, ProjectPayload>(`/projects/${projectId}`, payload);
}

export const apiDeleteMyProject = async (projectId: string) => {
    return api.delete<unknown>(`/projects/${projectId}`);
}
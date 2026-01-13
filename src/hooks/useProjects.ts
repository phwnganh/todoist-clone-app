import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiCreateMyProject, apiGetAllProjects} from "../services/project.service.ts";
import type {ProjectPayload, ProjectResponse} from "../types/project.type.ts";

export const useGetAllProjects = () => {
    return useQuery<ProjectResponse>({
        queryKey: ['projects'],
        queryFn: apiGetAllProjects
    })
}

export const useAddProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (project: ProjectPayload) => apiCreateMyProject(project),
    })
}
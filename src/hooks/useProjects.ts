import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    apiCreateMyProject,
    apiDeleteMyProject,
    apiGetAllProjects, apiGetAProject,
    apiUpdateMyProject
} from "../services/project.service.ts";
import type {Project, ProjectPayload, ProjectResponse, UpdateProjectPayload} from "../types/project.type.ts";
import type {ApiError, SyncResponse} from "../types/api.type.ts";
import {
    optimisticAddProject, optimisticDeleteProject, optimisticUpdateProject,
    type OptimisticUpdatesContext,
    rollbackOptimisticUpdates
} from "../helpers/optimisticUpdates.ts";

export const useGetAllProjects = () => {
    return useQuery<ProjectResponse>({
        queryKey: ['projects'],
        queryFn: apiGetAllProjects
    })
}

export const useGetAProject = (projectId: string) => {
    return useQuery<Project>({
        queryKey: ['projects', projectId],
        queryFn: () => apiGetAProject(projectId)
    })
}

export const useAddProject = () => {
    const queryClient = useQueryClient()
    return useMutation<SyncResponse, ApiError, ProjectPayload, OptimisticUpdatesContext>({
        mutationFn: apiCreateMyProject,
        onMutate: async (newProject) => {
            const tempId = `temp-project-${crypto.randomUUID()}`
            const optimisticProject: Project = {
                id: tempId,
                name: newProject.name,
                description: '',
                color: newProject.color ?? 'charcoal',
                is_archived: false,
                is_shared: false,
                is_deleted: false,
                view_style: newProject.view_style ?? 'list',
                is_favorite: newProject.is_favorite ?? false,
                parent_id: newProject.parent_id ?? ''
            }
            const res = optimisticAddProject({
                queryClient,
                queryKey: ['projects'],
                optimisticProject: optimisticProject
            })
            return {...res, tempId}
        },

        onSuccess: (res, _, context) => {
            const realId = res.temp_id_mapping?.[context.tempId!]
            if(!realId) return;
            queryClient.setQueryData<ProjectResponse>(["projects"], (old) => {
                if(!old) return old;
                return {
                    ...old,
                    results: old.results.map(project => project.id === context.tempId ? {...project, id: realId} : project)
                }
            })
        },
        onError: (_, __, context) => {
            rollbackOptimisticUpdates({
                queryClient,
                queryKey: ['projects'],
                context
            })
        },
        onSettled: () => {
            void queryClient.invalidateQueries({
                queryKey: ['projects'],
            })
        }
    })
}

export const useUpdateProject = () => {
    const queryClient = useQueryClient()
    return useMutation<SyncResponse, ApiError, UpdateProjectPayload, OptimisticUpdatesContext>({
        mutationFn: (updatingProject) => apiUpdateMyProject(updatingProject),
        onMutate: async (updatingProject) => {
            const tempId = `temp-project-${crypto.randomUUID()}`
            return optimisticUpdateProject({
                queryClient,
                queryKey: ["projects"],
                projectId: updatingProject.id,
                optimisticProject: {
                    id: tempId,
                    name: updatingProject.name,
                    description: '',
                    color: updatingProject.color ?? 'charcoal',
                    is_archived: false,
                    is_shared: false,
                    is_deleted: false,
                    is_favorite: updatingProject.is_favorite ?? false,
                    view_style: updatingProject.view_style ?? 'list',
                    parent_id: updatingProject.parent_id ?? ''
                }
            })
        },
        onError: (_, __, context) => {
            rollbackOptimisticUpdates({
                queryClient,
                queryKey: ["projects"],
                context
            })
        },
        onSettled: () => {
            void queryClient.invalidateQueries({
                queryKey: ["projects"]
            })
        }
    })
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient()
    return useMutation<SyncResponse, ApiError, {projectId: string}, OptimisticUpdatesContext>({
        mutationFn: (projectId: string) => apiDeleteMyProject(projectId),
        onMutate: async (projectId: string) => {
            return optimisticDeleteProject({
                queryClient,
                queryKey: ["projects"],
                projectId: projectId
            })
        },
        onError: (_, __, context) => {
            rollbackOptimisticUpdates({
                queryClient,
                queryKey: ["projects"],
                context
            })
        },
        onSettled: () => {
            void queryClient.invalidateQueries({
                queryKey: ["projects"]
            })
        }
    })
}

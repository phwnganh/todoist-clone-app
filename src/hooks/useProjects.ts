import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    apiCreateMyProject,
    apiDeleteMyProject,
    apiGetAllProjects,
    apiUpdateMyProject
} from "../services/project.service.ts";
import type {Project, ProjectPayload, ProjectResponse, UpdateProjectPayload} from "../types/project.type.ts";
import type {ApiError, SyncResponse} from "../types/api.type.ts";
import {
    optimisticAddProject, optimisticUpdateProject,
    type OptimisticUpdatesContext,
    rollbackOptimisticUpdates
} from "../helpers/optimisticUpdates.ts";

export const useGetAllProjects = () => {
    return useQuery<ProjectResponse>({
        queryKey: ['projects'],
        queryFn: apiGetAllProjects
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
            return optimisticUpdateProject({
                queryClient,
                queryKey: ["projects"],
                optimisticProject: {
                    id: updatingProject.id,
                    name: updatingProject.payload.name,
                    description: '',
                    color: updatingProject.payload.color ?? 'charcoal',
                    is_archived: false,
                    is_shared: false,
                    is_deleted: false,
                    is_favorite: updatingProject.payload.is_favorite ?? false,
                    view_style: updatingProject.payload.view_style ?? 'list',
                    parent_id: updatingProject.payload.parent_id ?? ''
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
    return useMutation<void, ApiError, {projectId: string}, OptimisticUpdatesContext<Project>>({
        mutationFn: ({projectId}) => apiDeleteMyProject(projectId),
        onMutate: async ({projectId}) => {
            return optimisticDeleteItem<Project>({
                queryClient,
                queryKey: ["projects"],
                id: projectId
            })
        },
        onError: (_, __, context) => {
            rollbackOptimisticUpdates<Project>({
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

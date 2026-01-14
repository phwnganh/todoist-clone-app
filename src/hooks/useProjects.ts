import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    apiCreateMyProject,
    apiDeleteMyProject,
    apiGetAllProjects,
    apiUpdateMyProject
} from "../services/project.service.ts";
import type {Project, ProjectPayload, ProjectResponse} from "../types/project.type.ts";
import type {ApiError, SyncResponse} from "../types/api.type.ts";
import {
    optimisticAddProject,
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
    return useMutation<Project, ApiError, {payload: ProjectPayload, projectId: string}, OptimisticUpdatesContext<Project>>({
        mutationFn: ({payload, projectId}) => apiUpdateMyProject(payload, projectId),
        onMutate: async ({payload, projectId}) => {
            return optimisticUpdateItem<Project>({
                queryClient,
                queryKey: ["projects"],
                updatedItem: {
                    id: projectId,
                    name: payload.name,
                    description: '',
                    color: payload.color ?? 'charcoal',
                    is_archived: false,
                    is_shared: false,
                    is_deleted: false,
                    is_favorite: payload.is_favorite ?? false,
                    view_style: payload.view_style ?? 'list',
                    parent_id: payload.parent_id ?? ''
                }
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

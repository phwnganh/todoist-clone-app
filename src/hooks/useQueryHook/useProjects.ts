import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    apiCreateMyProject,
    apiDeleteMyProject,
    apiGetAllProjects, apiGetAProject,
    apiUpdateMyProject
} from "@/services/project.service.ts";
import type {Project, ProjectPayload, ProjectResponse, UpdateProjectPayload} from "@/types/project.type.ts";
import type {ApiError, SyncResponse} from "@/types/api.type.ts";
import {
    optimisticAddProject, optimisticDeleteProject, optimisticUpdateProject, type OptimisticUpdatesProjectContext,
    rollbackOptimisticProjectUpdates,
} from "@/helpers/optimisticUpdates.ts";
import {queryClient} from "@/main.tsx";

export const useGetAllProjects = () => {
    return useQuery<ProjectResponse>({
        queryKey: ['projects'],
        queryFn: apiGetAllProjects
    })
}

export const useGetAProject = (projectId: string) => {
    return useQuery<Project>({
        queryKey: ['project-detail', projectId],
        queryFn: () => apiGetAProject(projectId),
        enabled: !!projectId,
        initialData: () => {
            const projects = queryClient.getQueryData<ProjectResponse>(["projects"])
            return projects?.results.find(project => project.id === projectId)
        }
    })
}

export const useAddProject = () => {
    const queryClient = useQueryClient()
    return useMutation<SyncResponse, ApiError, ProjectPayload, OptimisticUpdatesProjectContext>({
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
            rollbackOptimisticProjectUpdates({
                queryClient,
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
    return useMutation<SyncResponse, ApiError, UpdateProjectPayload, OptimisticUpdatesProjectContext>({
        mutationFn: (updatingProject) => apiUpdateMyProject(updatingProject),
        onMutate: async (updatingProject) => {
            const tempId = `temp-project-${crypto.randomUUID()}`
            return optimisticUpdateProject({
                queryClient,
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
            rollbackOptimisticProjectUpdates({
                queryClient,
                context
            })
        },
        onSettled: () => {
            void queryClient.invalidateQueries({
                queryKey: ["projects"],
            })
        }
    })
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient()
    return useMutation<null, ApiError, {projectId: string}, OptimisticUpdatesProjectContext>({
        mutationFn: ({projectId}) => apiDeleteMyProject(projectId),
        onMutate: async ({projectId}) => {
            return optimisticDeleteProject({
                queryClient,
                projectId: projectId
            })
        },
        onError: (_, __, context) => {
            rollbackOptimisticProjectUpdates({
                queryClient,
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

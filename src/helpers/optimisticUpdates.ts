import type {QueryClient, QueryKey} from "@tanstack/react-query";
import type {Project, ProjectResponse} from "../types/project.type.ts";

export type OptimisticUpdatesContext = {
    previousData?: ProjectResponse
    tempId?: string
}

export async function optimisticAddProject({queryClient, queryKey, optimisticProject}: {queryClient: QueryClient; queryKey: QueryKey; optimisticProject: Project}): Promise<OptimisticUpdatesContext> {
    await queryClient.cancelQueries({queryKey})
    const previousData = queryClient.getQueryData<ProjectResponse>(queryKey)
    queryClient.setQueryData<ProjectResponse>(
        queryKey,
        (old) => ({
            results: old
                ? [optimisticProject, ...old.results]
                : [optimisticProject],
            next_cursor: old?.next_cursor ?? "",
        })
    );
    return {previousData}
}

export async function optimisticUpdateProject({queryClient, queryKey, projectId, optimisticProject}: {queryClient: QueryClient; queryKey: QueryKey; projectId: string; optimisticProject: Partial<Project>}): Promise<OptimisticUpdatesContext>{
    await queryClient.cancelQueries({queryKey})
    const previousData = queryClient.getQueryData<ProjectResponse>(queryKey)
    queryClient.setQueryData<ProjectResponse>(queryKey, (old) => {
        if(!old) return old;
        return {
            ...old,
            results: old.results.map(project => project.id === projectId ? {...project, ...optimisticProject} : project)
        }
    })
    return {previousData}
}

export async function optimisticDeleteProject({queryClient, queryKey, projectId}: {queryClient: QueryClient; queryKey: QueryKey, projectId: string}): Promise<OptimisticUpdatesContext> {
    await queryClient.cancelQueries({queryKey})
    const previousData = queryClient.getQueryData<ProjectResponse>(queryKey)
    queryClient.setQueryData<ProjectResponse>(queryKey, (old) => {
        if(!old) return old;
        return {...old,
        results: old.results.filter(project => project.id !== projectId)}
    })
    return {previousData}
}
export function rollbackOptimisticUpdates({queryClient, queryKey, context}: {queryClient: QueryClient, queryKey: QueryKey, context?: OptimisticUpdatesContext}) {
    if(context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData)
    }
}
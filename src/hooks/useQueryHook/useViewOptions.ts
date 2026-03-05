import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {ApiError, SyncResponse} from "../../types/api.type.ts";
import type {ViewOptionsPayload} from "../../types/viewOptions.type.ts";
import {
    type OptimisticUpdatesContext,
    optimisticViewOptions,
    rollbackOptimisticUpdates
} from "../../helpers/optimisticUpdates.ts";
import {apiViewOptions} from "../../services/viewOptions.service.ts";
import {useGetAllTasks} from "./useTasks.ts";
import type {TaskQuery} from "../../types/task.type.ts";
import {useMemo} from "react";
import {filterTasks, groupTasks, sortTasks} from "../../helpers/groupSortTasks.ts";

export const useViewOptions = () => {
    const queryClient = useQueryClient();
    return useMutation<SyncResponse, ApiError, ViewOptionsPayload, OptimisticUpdatesContext>({
        mutationFn: apiViewOptions,
        onMutate: async (payload) => {
            return optimisticViewOptions({
                queryClient,
                optimisticViewOptions: payload
            })
        },
        onError: (_, __, context) => {
            rollbackOptimisticUpdates({
                queryClient,
                context
            })
        }
    })
}

export const useTasksWithView = (query?: TaskQuery, viewType?: string, objectId?: string) => {
    const queryClient = useQueryClient();
    const tasksQuery = useGetAllTasks(query)
    const viewOptions = queryClient.getQueryData<ViewOptionsPayload>([
        'viewOptions',
        viewType,
        objectId
    ])
    const derivedResults = useMemo(() => {
        const tasksData = tasksQuery.data?.results
        if(!tasksData) return {
            results: [],
            grouped: undefined,
        }

        const filtered = filterTasks(tasksData, viewOptions)

        const sorted =  sortTasks(filtered, viewOptions?.sorted_by, viewOptions?.sort_order ?? "ASC")
        console.log("sorted", sorted)

        const grouped = viewOptions?.grouped_by ? groupTasks(sorted, viewOptions?.grouped_by) : undefined

        return {
            results: sorted,
            grouped
        }
    }, [tasksQuery.data, viewOptions])

    return {
        ...tasksQuery,
        data: tasksQuery.data ? {
            ...tasksQuery.data,
            results: derivedResults.results,
            grouped: derivedResults.grouped,
        } : tasksQuery.data
    }
}
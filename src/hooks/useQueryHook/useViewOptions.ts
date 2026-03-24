import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {ApiError, SyncResponse} from "@/types/api.type.ts";
import type {ViewOptionsPayload} from "@/types/viewOptions.type.ts";
import {
    type OptimisticUpdatesContext,
    optimisticViewOptions,
    rollbackOptimisticUpdates
} from "@/helpers/optimisticUpdates.ts";
import {apiViewOptions} from "@/services/viewOptions.service.ts";
import {useGetAllTasks} from "./useTasks.ts";
import type {TaskQuery} from "@/types/task.type.ts";
import {useMemo} from "react";
import {filterTasks, groupTasks, sortTasks} from "@/helpers/groupSortTasks.ts";
import {useViewOptionsStore} from "@/stores/viewOptions.store.ts";

export const useViewOptions = () => {
    const queryClient = useQueryClient();
    const {setViewOptions} = useViewOptionsStore()
    return useMutation<SyncResponse, ApiError, ViewOptionsPayload, OptimisticUpdatesContext>({
        mutationFn: apiViewOptions,
        onMutate: async (payload) => {
            return optimisticViewOptions({
                queryClient,
                optimisticViewOptions: payload
            })
        },
        onSuccess: (_, variables) => {
            setViewOptions(variables.view_type, variables.object_id, variables)
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
    const tasksQuery = useGetAllTasks(query)
    const viewOptions = useViewOptionsStore(state => viewType && objectId ? state.getViewOptions(viewType, objectId) : undefined)

    const derivedResults = useMemo(() => {
        const tasksData = tasksQuery.data?.results
        if(!tasksData) return {
            results: [],
            grouped: null,
        }

        const filtered = filterTasks(tasksData, viewOptions)

        const sorted =  sortTasks(filtered, viewOptions?.sorted_by, viewOptions?.sort_order ?? "ASC")

        const grouped = viewOptions?.grouped_by ? groupTasks(sorted, viewOptions?.grouped_by) : null

        console.log("grouped: ", grouped)
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
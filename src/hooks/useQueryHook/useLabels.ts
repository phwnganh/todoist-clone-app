import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {Label, LabelPayload, LabelsResponse} from "../../types/label.type.ts";
import {apiCreateLabel, apiGetAllLabels, apiSearchLabels} from "../../services/label.service.ts";
import type {ApiError, SyncResponse} from "../../types/api.type.ts";
import {
    optimisticCreateLabel,
    type OptimisticUpdatesContext,
    rollbackOptimisticUpdates
} from "../../helpers/optimisticUpdates.ts";

export const useGetAllLabels = () => {
    return useQuery<LabelsResponse>({
        queryKey: ["labels"],
        queryFn: apiGetAllLabels,
    })
}

export const useSearchLabels = (query: string) => {
    return useQuery<LabelsResponse>({
        queryKey: ["labels", query],
        queryFn: () => apiSearchLabels(query),
        enabled: !!query
    })
}

export const useCreateLabels = () => {
    const queryClient = useQueryClient();
    return useMutation<SyncResponse, ApiError, LabelPayload, OptimisticUpdatesContext>({
        mutationFn: apiCreateLabel,
        onMutate: async (newLabel) => {
            const tempId = `temp-label-${crypto.randomUUID()}`
            const optimisticLabel: Label = {
                id: tempId,
                name: newLabel.name,
                color: newLabel.color ?? "",
                order: newLabel.item_order ?? 0
            }
            const res = optimisticCreateLabel({
                queryClient,
                optimisticLabel: optimisticLabel
            })
            return {...res, tempId, optimisticLabel}
        },
        onSuccess: (res, _, context) => {
            const realId = res.temp_id_mapping?.[context.tempId!]
            if(!realId) return;
            queryClient.setQueryData<LabelsResponse>(["labels"], old => {
                if(!old) return old;
                return {
                    ...old,
                    results: old.results.map(t => t.id === context.tempId ? {...t, id: realId}: t)
                }
            })
        },
        onError: (_, __, context) => {
            rollbackOptimisticUpdates({
                queryClient,
                context
            })
        },
        onSettled: error => {
            if(error){
                void queryClient.invalidateQueries({
                    queryKey: ["labels"]
                })
            }
        }
    })
}
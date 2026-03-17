import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {Label, LabelPayload, LabelsResponse, UpdateLabelPayload} from "@/types/label.type.ts";
import {
    apiCreateLabel,
    apiDeleteLabel,
    apiGetAllLabels,
    apiSearchLabels,
    apiUpdateLabel
} from "@/services/label.service.ts";
import type {ApiError, SyncResponse} from "@/types/api.type.ts";
import {
    optimisticCreateLabel, optimisticDeleteLabel, optimisticUpdateLabel,
    type OptimisticUpdatesContext,
} from "@/helpers/optimisticUpdates.ts";
import {commonLabelMutation} from "@/helpers/hookMutations.ts";

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
        ...commonLabelMutation<SyncResponse, LabelPayload, OptimisticUpdatesContext>(queryClient)
    })
}

export const useUpdateLabels = () => {
    const queryClient = useQueryClient();
    return useMutation<SyncResponse, ApiError, UpdateLabelPayload, OptimisticUpdatesContext>({
        mutationFn: apiUpdateLabel,
        onMutate: async (updatingLabel) => {
            return optimisticUpdateLabel({
                queryClient,
                labelId: updatingLabel.id,
                optimisticLabel: {
                    id: updatingLabel.id,
                    name: updatingLabel.name,
                    color: updatingLabel.color ?? "",
                }
            })
        },
        ...commonLabelMutation<SyncResponse, UpdateLabelPayload, OptimisticUpdatesContext>(queryClient)
    })
}

export const useDeleteLabels = () => {
    const queryClient = useQueryClient();
    return useMutation<null, ApiError, {labelId: string}, OptimisticUpdatesContext>({
        mutationFn: ({labelId}) => apiDeleteLabel(labelId),
        onMutate: async ({labelId}) => {
            return optimisticDeleteLabel({
                queryClient,
                labelId: labelId
            })
        },
        ...commonLabelMutation<null, {labelId: string}, OptimisticUpdatesContext>(queryClient)
    })
}
import {useQuery} from "@tanstack/react-query";
import type {LabelsResponse} from "../../types/label.type.ts";
import {apiGetAllLabels, apiSearchLabels} from "../../services/label.service.ts";

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
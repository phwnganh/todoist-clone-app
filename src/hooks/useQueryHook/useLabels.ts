import {useQuery} from "@tanstack/react-query";
import type {LabelsResponse} from "../../types/label.type.ts";
import {apiGetAllLabels} from "../../services/label.service.ts";

export const useGetAllLabels = () => {
    return useQuery<LabelsResponse>({
        queryKey: ["labels"],
        queryFn: apiGetAllLabels,
    })
}
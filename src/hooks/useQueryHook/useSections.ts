import {useQuery} from "@tanstack/react-query";
import type {Section, SectionResponse} from "../../types/section.type.ts";
import {apiGetAllSections, apiGetASection} from "../../services/section.service.ts";

export const useGetAllSections = () => {
    return useQuery<SectionResponse>({
        queryKey: ['section'],
        queryFn: apiGetAllSections,
    })
}

export const useGetASection = (id: string | null | undefined) => {
    return useQuery<Section>({
        queryKey: ['section-detail', id],
        queryFn: () => apiGetASection(id),
    })
}
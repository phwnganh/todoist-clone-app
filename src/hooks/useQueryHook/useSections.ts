import {useQuery} from "@tanstack/react-query";
import type {SectionResponse} from "../../types/section.type.ts";
import {apiGetAllSections} from "../../services/section.service.ts";

export const useGetAllSections = () => {
    return useQuery<SectionResponse>({
        queryKey: ['section'],
        queryFn: apiGetAllSections,
    })
}
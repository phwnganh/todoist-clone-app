import {api} from "./api.ts";
import type {Section, SectionResponse} from "../types/section.type.ts";

export const apiGetAllSections = () => {
    return api.get<SectionResponse>('/sections');
}

export const apiGetASection = async (sectionId: string | null | undefined) => {
    return api.get<Section>(`/sections/${sectionId}`);
}
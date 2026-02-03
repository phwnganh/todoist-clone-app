import {api} from "./api.ts";
import type {Section, SectionPayload, SectionResponse, UpdateSectionPayload} from "../types/section.type.ts";
import type {SyncResponse} from "../types/api.type.ts";

export const apiGetAllSections = () => {
    return api.get<SectionResponse>('/sections');
}

export const apiGetASection = async (sectionId: string | null | undefined) => {
    return api.get<Section>(`/sections/${sectionId}`);
}

export const apiAddNewSection = async (payload: SectionPayload) => {
    const uuid = crypto.randomUUID()
    const tempId = `temp-section-${uuid}`
    return api.sync<SyncResponse, SectionPayload>([
        {
            type: "section_add",
            uuid,
            temp_id: tempId,
            args: payload
        }
    ])
}

export const apiUpdateSection = async (payload: UpdateSectionPayload)=> {
    const uuid = crypto.randomUUID()
    return api.sync<SyncResponse, UpdateSectionPayload>([
        {
            type: "section_update",
            uuid,
            args: payload
        }
    ])
}

export const apiDeleteSection = async (taskId: string) => {
    return api.delete<null>(`/sections/${taskId}`);
}
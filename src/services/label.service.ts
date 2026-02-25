import {api} from "./api.ts";
import type {LabelPayload, LabelsResponse} from "../types/label.type.ts";
import type {SyncResponse} from "../types/api.type.ts";

export const apiGetAllLabels = () => {
    return api.get<LabelsResponse>(`/labels`);
}

export const apiSearchLabels = (query: string) => {
    return api.get<LabelsResponse>(`/labels/search?query=*${query}*`);
}

export const apiCreateLabel = async (payload: LabelPayload): Promise<SyncResponse> => {
    const uuid = crypto.randomUUID()
    const tempId = `temp-label-${uuid}`;
    return api.sync<SyncResponse, LabelPayload>([
        {
            type: "label_add",
            uuid,
            temp_id: tempId,
            args: payload
        }
    ])
}
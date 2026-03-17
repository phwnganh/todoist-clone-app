import {api} from "./api.ts";
import type {Label, LabelPayload, LabelsResponse, UpdateLabelPayload} from "@/types/label.type.ts";
import type {SyncResponse} from "@/types/api.type.ts";

export const apiGetAllLabels = () => {
    return api.get<LabelsResponse>(`/labels`);
}

export const apiGetALabel = async (labelId?: string) => {
    return api.get<Label>(`/labels/${labelId}`);
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

export const apiUpdateLabel = async (payload: UpdateLabelPayload): Promise<SyncResponse> => {
    const uuid = crypto.randomUUID()
    return api.sync<SyncResponse, UpdateLabelPayload>([
        {
            type: "label_update",
            uuid,
            args: payload
        }
    ])
}

export const apiDeleteLabel = async (labelId: string) => {
    return api.delete<null>(`/labels/${labelId}`);
}
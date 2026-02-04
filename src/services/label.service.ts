import {api} from "./api.ts";
import type {LabelsResponse} from "../types/label.type.ts";

export const apiGetAllLabels = () => {
    return api.get<LabelsResponse>(`/labels`);
}

export const apiSearchLabels = (query: string) => {
    return api.get<LabelsResponse>(`/labels/search?query=*${query}*`);
}
import {api} from "./api.ts";
import type {LabelsResponse} from "../types/label.type.ts";

export const apiGetAllLabels = () => {
    return api.get<LabelsResponse>(`/labels`);
}
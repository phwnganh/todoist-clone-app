import {api} from "./api.ts";
import type {SectionResponse} from "../types/section.type.ts";

export const apiGetAllSections = () => {
    return api.get<SectionResponse>('/sections');
}
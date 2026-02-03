export type Section = {
    id: string | null;
    project_id: string;
    name: string;
    section_order?: number;
}

export type SectionResponse = {
    results: Section[];
    next_cursor: string;
}

export type SectionPayload = {
    name: string;
    project_id: string;
}

export type UpdateSectionPayload = {
    id: string;
    name: string;
    project_id?: string;
}
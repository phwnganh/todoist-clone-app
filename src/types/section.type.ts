export type Section = {
    id: string;
    user_id: string;
    project_id: string;
    added_at: string;
    updated_at: string;
    archived_at: string;
    name: string;
    section_order: number;
    is_archived: boolean;
    is_deleted: boolean;
    is_collapsed: boolean;
}

export type SectionResponse = {
    results: Section[];
    next_cursor: string;
}
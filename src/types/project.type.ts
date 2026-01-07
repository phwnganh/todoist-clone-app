export type Project = {
    id: string;
    name: string;
    description: string;
    color: string;
    is_archived: boolean;
    is_deleted: boolean;
    view_style: string;
    is_favorite: boolean;
    parent_id: string;
}

export type ProjectResponse = {
    results: Project[];
    next_cursor: string;
}
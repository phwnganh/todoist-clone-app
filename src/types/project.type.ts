export type Project = {
    id: string;
    name: string;
    description: string;
    color: string;
    is_archived: boolean;
    is_shared: boolean;
    is_deleted: boolean;
    view_style: string;
    is_favorite: boolean;
    parent_id: string;
}

export type ProjectResponse = {
    results: Project[];
    next_cursor: string;
}

export type ProjectPayload = {
    name: string;
    parent_id?: string;
    color?: string;
    is_favorite?: boolean;
    view_style?: string;
    workspace_id?: string;
}

export type UpdateProjectPayload = {
    id: string;
    name: string;
    parent_id?: string;
    color?: string;
    is_favorite?: boolean;
    view_style?: string;
    workspace_id?: string;
}
import type {Task} from "./task.type.ts";

export type ViewTypes = "PROJECT" | "LABEL" | "WORKSPACE_FILTER" | "FILTER" | "TODAY" | "UPCOMING"
export type GroupedBy = "ADDED_DATE" | "DUE_DATE" | "DEADLINE" | "LABEL" | "PRIORITY"
export type SortedBy = "ALPHABETICALLY" | "ADDED_DATE" | "DUE_DATE" | "DEADLINE" | "LABEL" | "PRIORITY"
export type SortOrder = "ASC" | "DESC"
export type ViewMode = "LIST" | "BOARD"

export type TaskGroup = {
    title: string;
    tasks: Task[]
}

export type ViewOptionsPayload = {
    view_type: ViewTypes;
    object_id: string;
    filtered_by?: string | null;
    grouped_by?: GroupedBy | null;
    sorted_by?: SortedBy | null;
    sort_order?: SortOrder | null;
    show_completed_tasks?: boolean;
    view_mode?: ViewMode;
}

export type DeleteViewOptionsPayload = {
    view_type: ViewTypes;
    object_id: string;
}
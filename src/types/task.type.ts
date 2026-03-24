export type Task = {
    id : string,
    project_id?: string | null,
    section_id?: string | null,
    parent_id?: string | null,
    labels?: string[],
    deadline?: Deadline,
    duration?: Duration,
    checked?: boolean,
    due?: Due | null,
    priority: number,
    child_order?: number,
    content: string,
    description: string,
    completed_at?: string,
    added_at?: string
}

export type Deadline = {
    property1: string,
    property2: string,
}

export type Duration = {
    property1: string,
    property2: string,
}

export type Due = {
    date?: string | null,
    timezone?: null,
    string?: string,
    is_recurring?: boolean,
}

export type TaskResponse = {
    results: Task[],
    next_cursor: string
}

export type TaskNode = {
    task: Task,
    children: TaskNode[]
}

export type Priority = {
    key: string;
    label: string;
    value: number;
    color: string;
}

export type TaskPayload = {
    content: string;
    description: string;
    project_id?: string;
    section_id?: string | null;
    parent_id?: string | null;
    priority?: number;
    labels: string[];
    due: Due | null;
}

export type SubTaskPayload = {
    content: string;
    description: string;
    parent_id: string;
    priority?: number;
    labels: string[];
    due: Due | null;
}

export type UpdateTaskPayload = {
    id: string;
    content: string;
    description?: string;
    priority?: number;
    labels?: string[];
    due?: Due | null;
    child_order?: number;
}

export type MoveTaskPayload = {
    id: string;
    project_id?: string | null;
    section_id?: string | null;
    parent_id?: string | null
}

export type ReorderTaskItem = {
    id: string;
    child_order: number;
}
export type ReorderTaskPayload = {
    items: ReorderTaskItem[]
}

export type TaskQuery = {
    project_id?: string;
    label?: string;
}

export type FlattenTask = {
    taskNode: TaskNode,
    level: number
}
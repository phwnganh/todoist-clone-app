export type Task = {
    id : string,
    project_id?: string | undefined | null,
    section_id?: string | undefined | null,
    parent_id: string | null | undefined,
    labels?: string[],
    deadline?: Deadline,
    duration?: Duration,
    checked?: boolean,
    due?: Due,
    priority: number | undefined,
    child_order?: number,
    content: string,
    description: string,
    is_completed?: boolean,
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
    date: string,
    timezone: null,
    string: string,
    is_recurring: boolean,
}

export type TaskResponse = {
    results: Task[],
    next_cursor: string
}

export type TaskNode = {
    task: Task,
    children: TaskNode[]
}

export type DragMeta = {
    parent: boolean
    section: boolean
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
    project_id: string | undefined;
    section_id: string | undefined | null;
    parent_id: string | undefined | null;
    priority: number | undefined;
}

export type SubTaskPayload = {
    content: string;
    description: string;
    parent_id: string;
    priority: number | undefined;
}

export type UpdateTaskPayload = {
    id: string;
    content: string;
    description?: string;
    priority?: number;
}

export type MoveTaskPayload = {
    id: string;
    project_id?: string | undefined | null;
    section_id?: string | undefined | null;
    parent_id?: string | null
}
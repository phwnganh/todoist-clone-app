export type Task = {
    user_id : string,
    id : string,
    project_id: string,
    section_id: string,
    parent_id: string,
    added_by_uid: string,
    assigned_by_uid: string,
    responsible_uid: string,
    labels: string[],
    deadline: Deadline,
    duration: Duration,
    checked: boolean,
    is_deleted: boolean,
    added_at: string,
    completed_at: string,
    updated_at: string,
    due: Due,
    priority: number,
    child_order: number,
    content: string,
    description: string,
    note_count: number,
    day_order: number,
    is_completed: boolean,
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

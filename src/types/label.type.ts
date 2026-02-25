export type Label = {
    id: string;
    name: string;
    color: string;
    order: number;
}

export type LabelsResponse = {
    results: Label[];
    next_cursor: string;
}

export type LabelPayload = {
    name: string;
    color?: string;
    item_order?: number;
}
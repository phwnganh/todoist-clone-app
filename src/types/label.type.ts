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
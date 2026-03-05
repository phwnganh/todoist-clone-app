import type {Priority} from "../types/task.type.ts";
import type {GroupedBy, SortedBy, SortOrder} from "../types/viewOptions.type.ts";

type GroupingOption = {
    key?: GroupedBy | null;
    label: string;
}

type SortingOption = {
    key?: SortedBy | null;
    label: string;
}

type DirectionOption = {
    key?: SortOrder;
    label: string;
}
export const groupingFilterData: GroupingOption[] = [
    {
        key: null,
        label: "None"
    },
    {
        key: "DUE_DATE",
        label: "Date"
    },
    {
        key: "ADDED_DATE",
        label: "Date added"
    },
    {
        key: "DEADLINE",
        label: "Deadline"
    },
    {
        key: "PRIORITY",
        label: "Priority"
    },
    {
        key: "LABEL",
        label: "Label"
    }
]

export const sortingFilterData: SortingOption[] = [
    {
        key: null,
        label: "Manual"
    },
    {
        key: "ALPHABETICALLY",
        label: "Name"
    },
    {
        key: "DUE_DATE",
        label: "Date"
    },
    {
        key: "ADDED_DATE",
        label: "Date added"
    },
    // {
    //     key: "DEADLINE",
    //     label: "Deadline"
    // },
    {
        key: "PRIORITY",
        label: "Priority"
    }
]

export const directionFilterData: DirectionOption[] = [
    {
        key: "ASC",
        label: "Ascending"
    },
    {
        key: "DESC",
        label: "Descending"
    }
]

export const dateFilterData = [
    {
        key: null,
        label: "All"
    },
    // {
    //     key: "today",
    //     label: "Today"
    // },
    {
        key: "this-week",
        label: "This week"
    },
    // {
    //     key: "next-7-days",
    //     label: "Next 7 days"
    // },
    {
        key: "this-month",
        label: "This month"
    },
    // {
    //     key: "next-30-days",
    //     label: "Next 30 days"
    // },
    {
        key: "no-date",
        label: "No date"
    }
]

export const priorityFilterData: Priority[] = [
    {
        key: "p1",
        label: "Priority 1",
        value: 4,
        color: "product-library-priorities-p1-primary-idle-tint",
    },
    {
        key: "p2",
        label: "Priority 2",
        value: 3,
        color: "product-library-priorities-p2-primary-idle-tint",
    },
    {
        key: "p3",
        label: "Priority 3",
        value: 2,
        color: "product-library-priorities-p3-primary-idle-tint",
    },
    {
        key: "p4",
        label: "Priority 4",
        value: 1,
        color: "product-library-selectable-primary-unselected-tint",
    }
]
import type {Priority} from "../types/task.type.ts";

export const groupingFilterData = [
    {
        key: "none",
        label: "None"
    },
    {
        key: "date",
        label: "Date"
    },
    {
        key: "date-added",
        label: "Date added"
    },
    {
        key: "deadline",
        label: "Deadline"
    },
    {
        key: "priority",
        label: "Priority"
    },
    {
        key: "label",
        label: "Label"
    }
]

export const sortingFilterData = [
    {
        key: "manual",
        label: "Manual"
    },
    {
        key: "name",
        label: "Name"
    },
    {
        key: "date",
        label: "Date"
    },
    {
        key: "date-added",
        label: "Date added"
    },
    {
        key: "deadline",
        label: "Deadline"
    },
    {
        key: "priority",
        label: "Priority"
    }
]

export const dateFilterData = [
    {
        key: "all",
        label: "All"
    },
    {
        key: "today",
        label: "Today"
    },
    {
        key: "this-week",
        label: "This week"
    },
    {
        key: "next-7-days",
        label: "Next 7 days"
    },
    {
        key: "this-month",
        label: "This month"
    },
    {
        key: "next-30-days",
        label: "Next 30 days"
    },
    {
        key: "no-date",
        label: "No date"
    }
]

export const priorityFilterData: Priority[] = [
    {
        key: "priority-1",
        label: "Priority 1",
        value: 4,
        color: "text-product-library-priorities-p1-primary-idle-tint",
    },
    {
        key: "priority-2",
        label: "Priority 2",
        value: 3,
        color: "text-product-library-priorities-p2-primary-idle-tint",
    },
    {
        key: "priority-3",
        label: "Priority 3",
        value: 2,
        color: "text-product-library-priorities-p3-primary-idle-tint",
    },
    {
        key: "priority-4",
        label: "Priority 4",
        value: 1,
        color: "text-product-library-selectable-primary-unselected-tint",
    }
]
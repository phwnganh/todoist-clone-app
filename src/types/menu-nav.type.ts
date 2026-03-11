import type {ComponentType, ReactNode} from "react";
export type MenuNavItem = {
    key: string;
    label: string;
    icon: ComponentType<{className: string}>;
    getTo?: string;
}

export type SettingMenuNavItem = {
    key: string;
    label: string;
    icon: ComponentType<{className: string}>;
    onClick: () => void;
}

export type OpenDropdown = "color" | "workspace" | "parentProject" | null;

export type OpenMyTaskFormDropdown = "date" | "priority" | "reminders" | "project" | "labels" | null;

export type OpenMyTaskDetailAsideDropdown = "project" | "date" | "priority" | "labels" | null;

export type OpenMyTaskFilterDropdown = "grouping" | "sorting" | "direction" | "date" | "priority" | "label" | null;
export type LayoutItem = {
    key: string;
    label: string;
    icon: ComponentType<{className: string}>;
}

export type MyProjectMenuToolbar = | "divider" | {
    label: string;
    danger?: boolean;
    onClick: () => void;
}

type PriorityValue = 4 | 3 | 2 | 1;
export type MyTaskMenuToolbar = | {type: "divider"} | {
    type: "item";
    label: string;
    danger?: boolean;
    onClick: () => void;
    icon: ReactNode;
} | {
    type: "section";
    label: string;
} | {
    type: "icon-row";
    items: {
        icon: ReactNode;
        onClick?: () => void;
        active?: boolean | "" | null;
        priority?: PriorityValue;
    }[]
}

export type MySectionMenuToolbar = | "divider" | {
    label: string;
    danger?: boolean;
    onClick: () => void;
    icon: ReactNode;
}

export type SidebarHeaderMenuDropdown = | "divider" | {
    label: string;
    onClick: () => void;
    icon: ReactNode;
}

export type SuggestedTimeMenuToolbar = {
    label: string;
    onClick?: () => void;
    icon: ReactNode;
    time?: string;
}


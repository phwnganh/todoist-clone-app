import type {ComponentType, ReactNode, SVGProps} from "react";

export type MenuNavItem = {
    key: string;
    label: string;
    icon: string | ComponentType<SVGProps<SVGSVGElement>>;
    getTo?: string;
}

export type OpenDropdown = "color" | "workspace" | "parentProject" | null;

export type OpenMyTaskFormDropdown = "date" | "priority" | "reminders" | "project" | "labels" | null;

export type OpenMyTaskDetailAsideDropdown = "project" | "date" | "priority" | "labels" | null;

export type OpenMyTaskFilterDropdown = "grouping" | "sorting" | "date" | "priority" | null;
export type LayoutItem = {
    key: string;
    label: string;
    icon: string;
}

export type MyProjectMenuToolbar = | "divider" | {
    label: string;
    danger?: boolean;
    onClick: () => void;
}

export type MyTaskMenuToolbar = | "divider" | {
    label: string;
    danger?: boolean;
    onClick: () => void;
    icon: ReactNode;
}
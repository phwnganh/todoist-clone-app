
export type MenuNavItem = {
    key: string;
    label: string;
    icon: string;
    getTo?: string;
}

export type OpenDropdown = "color" | "workspace" | "parentProject" | null;

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
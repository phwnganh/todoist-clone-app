import {type LayoutIconKey, type MenuIconKey} from "../components/icons/IconMap";

export type MenuNavItem = {
    key: MenuIconKey;
    label: string;
    icon: MenuIconKey;
    getTo?: string;
}

export type OpenDropdown = "color" | "workspace" | "parentProject" | null;

export type LayoutItem = {
    key: LayoutIconKey;
    label: string;
    icon: LayoutIconKey;
}

export type MyProjectMenuToolbar = | "divider" | {
    label: string;
    danger?: boolean;
    onClick: () => void;
}
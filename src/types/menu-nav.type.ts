import {type MenuIconKey} from "../components/icons/IconMap";

export type MenuNavItem = {
    key: MenuIconKey;
    label: string;
    icon: MenuIconKey;
    getTo?: string;
}
import type {MenuNavItem} from "../types/menu-nav.type";
import {ACTIVITY, FILTERS_LABEL, INBOX, TODAY, UPCOMING} from "./routes.constants";

export type MenuIconKey = "search" | "inbox" | "today" | "upcomingCalendar" | "filter" | "completed"
export const MENU_NAV_ITEMS: MenuNavItem[] = [
    {
        key: "search",
        label: "Search",
        icon: "search"
    },
    {
        key: "inbox",
        label: "Inbox",
        icon: "inbox",
        getTo: INBOX
    },
    {
        key: "today",
        label: "Today",
        icon: "today",
        getTo: TODAY
    },
    {
        key: "upcomingCalendar",
        label: "Upcoming",
        icon: "upcomingCalendar",
        getTo: UPCOMING
    },
    {
        key: "filter",
        label: "Filters & Labels",
        icon: "filter",
        getTo: FILTERS_LABEL
    },
    {
        key: "completed",
        label: "Completed",
        icon: "completed",
        getTo: ACTIVITY
    }
]




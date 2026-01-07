import type {LayoutItem, MenuNavItem} from "../types/menu-nav.type.ts";
import {ACTIVITY, FILTERS_LABEL, INBOX, TODAY, UPCOMING} from "../constants/routes.constants.ts";

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

export const LAYOUT_ITEMS: LayoutItem[] = [
    {
        key: "list",
        label: "List",
        icon: "list"
    },
    {
        key: "board",
        label: "Board",
        icon: "board"
    },
    {
        key: "calendar",
        label: "Calendar",
        icon: "calendar"
    }
]

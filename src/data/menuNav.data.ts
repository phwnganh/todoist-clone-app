import type {LayoutItem, MenuNavItem} from "../types/menu-nav.type.ts";
import {ACTIVITY, FILTERS_LABEL, INBOX, TODAY, UPCOMING} from "../constants/routes.constants.ts";
import SearchIcon from '../assets/search-icon.svg'
import InboxIcon from '../assets/inbox-icon.svg'
import CalendarIcon from '../components/icons/CalendarIcon.tsx'
import UpcomingCalendarIcon from '../assets/upcoming-calendar-icon.svg'
import FilterIcon from '../assets/filter-icon.svg'
import CompletedIcon from '../assets/completed-icon.svg'

import ListItemIcon from '../assets/list-item-icon.svg'
import BoardItemIcon from '../assets/board-item-icon.svg'
import PremiumCalendarIcon from '../assets/premium-calendar-icon.svg'
export const MENU_NAV_ITEMS: MenuNavItem[] = [
    {
        key: "search",
        label: "Search",
        icon: SearchIcon
    },
    {
        key: "inbox",
        label: "Inbox",
        icon: InboxIcon,
        getTo: INBOX
    },
    {
        key: "today",
        label: "Today",
        icon: CalendarIcon,
        getTo: TODAY
    },
    {
        key: "upcomingCalendar",
        label: "Upcoming",
        icon: UpcomingCalendarIcon,
        getTo: UPCOMING
    },
    {
        key: "filter",
        label: "Filters & Labels",
        icon: FilterIcon,
        getTo: FILTERS_LABEL
    },
    {
        key: "completed",
        label: "Completed",
        icon: CompletedIcon,
        getTo: ACTIVITY
    }
]

export const LAYOUT_ITEMS: LayoutItem[] = [
    {
        key: "LIST",
        label: "List",
        icon: ListItemIcon
    },
    {
        key: "BOARD",
        label: "Board",
        icon: BoardItemIcon
    },
    {
        key: "CALENDAR",
        label: "Calendar",
        icon: PremiumCalendarIcon
    }
]


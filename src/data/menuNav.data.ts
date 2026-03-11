import type {LayoutItem, MenuNavItem, SettingMenuNavItem} from "@/types/menu-nav.type.ts";
import {ACTIVITY, FILTERS_LABEL, INBOX, TODAY, UPCOMING} from "@/constants/routes.constants.ts";
import CalendarIcon from '@/components/icons/CalendarIcon.tsx'

import SearchIcon from "@/components/icons/SearchIcon.tsx";
import InboxIcon from "@/components/icons/InboxIcon.tsx";
import UpcomingCalendarIcon from "@/components/icons/UpcomingCalendarIcon.tsx";
import FilterIcon from "@/components/icons/FilterIcon.tsx";
import CompletedIcon from "@/components/icons/CompletedIcon.tsx";
import AccountIcon from "@/components/icons/AccountIcon.tsx";
import ThemeIcon from "@/components/icons/ThemeIcon.tsx";
import ListItemIcon from "@/components/icons/ListItemIcon.tsx";
import BoardItemIcon from "@/components/icons/BoardItemIcon.tsx";
import PremiumCalendarIcon from "@/components/icons/PremiumCalendarIcon.tsx";
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

export const SETTING_MENU_NAV_ITEMS: SettingMenuNavItem[] = [
    {
        key: "account",
        label: "Account",
        icon: AccountIcon,
        onClick: () => {
            console.log("account")
        }
    },
    {
        key: "theme",
        label: "Theme",
        icon: ThemeIcon,
        onClick: () => {
            console.log("theme")
        }
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


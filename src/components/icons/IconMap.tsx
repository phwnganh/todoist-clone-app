import SearchIcon from "./SearchIcon";
import InboxIcon from "./InboxIcon";
import CalendarIcon from "./CalendarIcon";
import UpcomingCalendarIcon from "./UpcomingCalendarIcon";
import FilterIcon from "./FilterIcon";
import CompletedIcon from "./CompletedIcon";
import ListItemIcon from "./ListItemIcon";
import BoardItemIcon from "./BoardItemIcon";
import CalendarLayoutIcon from "./CalendarLayoutIcon";

export const ICON_MAP = {
    search: SearchIcon,
    inbox: InboxIcon,
    today: CalendarIcon,
    upcomingCalendar: UpcomingCalendarIcon,
    filter: FilterIcon,
    completed: CompletedIcon,
}

export const LAYOUT_MAP = {
    list: ListItemIcon,
    board: BoardItemIcon,
    calendar: CalendarLayoutIcon
}

export type MenuIconKey = keyof typeof ICON_MAP;
export type LayoutIconKey = keyof typeof LAYOUT_MAP;
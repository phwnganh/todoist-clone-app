import SearchIcon from "./SearchIcon";
import InboxIcon from "./InboxIcon";
import CalendarIcon from "./CalendarIcon";
import UpcomingCalendarIcon from "./UpcomingCalendarIcon";
import FilterIcon from "./FilterIcon";
import CompletedIcon from "./CompletedIcon";

export const ICON_MAP = {
    search: SearchIcon,
    inbox: InboxIcon,
    today: CalendarIcon,
    upcomingCalendar: UpcomingCalendarIcon,
    filter: FilterIcon,
    completed: CompletedIcon,
}

export type MenuIconKey = keyof typeof ICON_MAP;
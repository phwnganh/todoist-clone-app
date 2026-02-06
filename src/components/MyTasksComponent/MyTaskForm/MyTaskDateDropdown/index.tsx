import SearchDateInput from "./SearchDateInput.tsx";
import type {SuggestedTimeMenuToolbar} from "../../../../types/menu-nav.type.ts";
import CalendarIcon from "../../../icons/CalendarIcon.tsx";
import TomorrowIcon from "../../../icons/TomorrowIcon.tsx";
import NextWeekIcon from "../../../icons/NextWeekIcon.tsx";
import NextWeekendIcon from "../../../icons/NextWeekendIcon.tsx";
import SuggestedTime from "./SuggestedTime.tsx";
import {
    formatFullDate, formatOnlyDate,
    formatWeekday,
    getNextWeek,
    getNextWeekend,
    getToday,
    getTomorrow
} from "../../../../helpers/formateDate.ts";

type MyTaskDateDropdownProps = {
    onSelectDate: (date: string) => void;
}
const MyTaskDateDropdown = ({onSelectDate}: MyTaskDateDropdownProps) => {
    const today = getToday()
    const tomorrow = getTomorrow()
    const nextWeek = getNextWeek()
    const nextWeekend = getNextWeekend()
    const SUGGEST_TIME_MENU_TOOLBAR: SuggestedTimeMenuToolbar[] = [
        {
            icon: <CalendarIcon/>,
            label: "Today",
            time: formatWeekday(today),
            onClick: () => onSelectDate(formatOnlyDate(today))
        },
        {
            icon: <TomorrowIcon/>,
            label: "Tomorrow",
            time: formatWeekday(tomorrow),
            onClick: () => onSelectDate(formatOnlyDate(tomorrow))
        },
        {
            icon: <NextWeekIcon/>,
            label: "Next week",
            time: formatFullDate(nextWeek),
            onClick: () => onSelectDate(formatOnlyDate(nextWeek))
        },
        {
            icon: <NextWeekendIcon/>,
            label: "Next weekend",
            time: formatFullDate(nextWeekend),
            onClick: () => onSelectDate(formatOnlyDate(nextWeekend))
        }
    ]
    return (
        <div id={"date-listbox"} role={"listbox"} aria-labelledby={"date-trigger"} className={"absolute top-full z-1000 border border-product-library-divider-primary rounded-large shadow-sm overflow-y-auto scrollbar-thin scrollbar-custom w-62.5 bg-white mt-1"}>
            <div className={"flex flex-col gap-xsmall"}>
                <SearchDateInput/>
                <hr className="border-t border-t-product-library-divider-tertiary" />
                {SUGGEST_TIME_MENU_TOOLBAR.map((item, index) => (
                    <SuggestedTime key={index} item={item}/>
                ))}
                <hr className="border-t border-t-product-library-divider-tertiary" />

            </div>
        </div>
    );
};

export default MyTaskDateDropdown;
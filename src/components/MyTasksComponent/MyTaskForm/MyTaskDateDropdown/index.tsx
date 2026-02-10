import SearchDateInput from "./SearchDateInput.tsx";
import type {SuggestedTimeMenuToolbar} from "../../../../types/menu-nav.type.ts";
import CalendarIcon from "../../../icons/CalendarIcon.tsx";
import TomorrowIcon from "../../../icons/TomorrowIcon.tsx";
import NextWeekIcon from "../../../icons/NextWeekIcon.tsx";
import NextWeekendIcon from "../../../icons/NextWeekendIcon.tsx";
import SuggestedTime from "./SuggestedTime.tsx";
import {
    buildDue,
    formatFullDate,
    formatWeekday,
    getNextWeek,
    getNextWeekend,
    getToday,
    getTomorrow
} from "../../../../helpers/formateDate.ts";
import type {Due} from "../../../../types/task.type.ts";
import DatePicker from "../../../ui/DatePicker/DatePicker.tsx";
import {parseISO} from "date-fns";

type MyTaskDateDropdownProps = {
    onSelectDate: (date: Due) => void;
    selectedDate: Due | null;
}
const MyTaskDateDropdown = ({onSelectDate, selectedDate}: MyTaskDateDropdownProps) => {
    const today = getToday()
    const tomorrow = getTomorrow()
    const nextWeek = getNextWeek()
    const nextWeekend = getNextWeekend()
    const SUGGEST_TIME_MENU_TOOLBAR: SuggestedTimeMenuToolbar[] = [
        {
            icon: <CalendarIcon/>,
            label: "Today",
            time: formatWeekday(today),
            onClick: () => onSelectDate(buildDue(today))
        },
        {
            icon: <TomorrowIcon/>,
            label: "Tomorrow",
            time: formatWeekday(tomorrow),
            onClick: () => onSelectDate(buildDue(tomorrow))
        },
        {
            icon: <NextWeekIcon/>,
            label: "Next week",
            time: formatFullDate(nextWeek),
            onClick: () => onSelectDate(buildDue(nextWeek))
        },
        {
            icon: <NextWeekendIcon/>,
            label: "Next weekend",
            time: formatFullDate(nextWeekend),
            onClick: () => onSelectDate(buildDue(nextWeekend))
        }
    ]
    return (
        <div id={"date-listbox"} role={"listbox"} aria-labelledby={"date-trigger"} className={"absolute top-full z-1000 border border-product-library-divider-primary rounded-large shadow-sm overflow-y-auto scrollbar-thin scrollbar-custom min-w-62.5 bg-white mt-1"}>
            <div className={"flex flex-col gap-xsmall"}>
                <SearchDateInput currentDate={selectedDate}/>
                <hr className="border-t border-t-product-library-divider-tertiary" />
                {SUGGEST_TIME_MENU_TOOLBAR.map((item, index) => (
                    <SuggestedTime key={index} item={item}/>
                ))}
                <hr className="border-t border-t-product-library-divider-tertiary" />

                <div className={"mt-2 px-4"}>
                    <DatePicker value={selectedDate?.date ?? null} onChange={value => {
                        if(!value) return;
                        onSelectDate(buildDue(parseISO(value)))
                    }}/>
                </div>
            </div>
        </div>
    );
};

export default MyTaskDateDropdown;
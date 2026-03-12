import {DayPicker} from "react-day-picker"
import {parseISO, startOfToday} from "date-fns";
import {formatOnlyDate} from "@/helpers/formateDate.ts";

type DatePickerProps = {
    value: string | null;
    onChange: (value: string | null) => void;
}
const DatePicker = ({value, onChange}: DatePickerProps) => {
    const today = startOfToday()
    return (
        <DayPicker mode={"single"} selected={value ? parseISO(value) : undefined}
        onSelect={date => {
            if(!date) return;
            onChange(formatOnlyDate(date))
        }}
        weekStartsOn={1}
                   disabled={{before: today}}
        classNames={{
            month_caption: "flex text-base justify-center items-center font-bold text-lg h-9",
            nav: "absolute inset-x-0 flex justify-between items-center h-9",
            button_previous: "hover:bg-product-library-selectable-secondary-hover-fill rounded-small flex justify-center items-center h-6 w-6",
            button_next: "hover:bg-product-library-selectable-secondary-hover-fill  rounded-small flex justify-center items-center h-6 w-6",
            chevron: "stroke-product-library-display-primary-idle-tint",
            weekday: "text-gray-700 text-xs",
            disabled: "text-sm text-gray-400 cursor-not-allowed",
            today: "font-bold text-red-500",
            day: "text-sm",
            selected: "text-sm font-bold bg-red-500 rounded-full text-product-library-display-primary-idle-tint"

        }}
        />
    );
};

export default DatePicker;
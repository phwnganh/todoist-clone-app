import {DayPicker} from "react-day-picker"
import {parseISO} from "date-fns";
import {formatOnlyDate} from "../../../helpers/formateDate.ts";

type DatePickerProps = {
    value: string | null;
    onChange: (value: string | null) => void;
}
const DatePicker = ({value, onChange}: DatePickerProps) => {
    return (
        <DayPicker mode={"single"} selected={value ? parseISO(value) : undefined}
        onSelect={date => {
            if(!date) return;
            onChange(formatOnlyDate(date))
        }}
        weekStartsOn={1}/>
    );
};

export default DatePicker;
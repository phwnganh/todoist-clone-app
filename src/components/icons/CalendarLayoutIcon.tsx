import PremiumCalendarIcon from "./PremiumCalendarIcon.tsx";
import PremiumStarIcon from "./PremiumStarIcon.tsx";

const CalendarLayoutIcon = () => {
    return (
        <div className="relative">
            <PremiumCalendarIcon/>
            <div className="w-3.5 h-3.5 rounded-full absolute -right-0.5 bottom-0 flex justify-center items-center">
                <PremiumStarIcon/>
            </div>
        </div>
    )
}

export default CalendarLayoutIcon;
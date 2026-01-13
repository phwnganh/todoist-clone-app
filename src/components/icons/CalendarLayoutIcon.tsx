import PremiumCalendarIcon from "../../assets/premium-calendar-icon.svg";
import PremiumStarIcon from "../../assets/premium-star-icon.svg";

const CalendarLayoutIcon = () => {
    return (
        <div className="relative">
            <img src={PremiumCalendarIcon} alt={"premium-calendar-icon"} />
            <div className="w-3.5 h-3.5 rounded-full absolute -right-0.5 bottom-0 flex justify-center items-center">
                <img src={PremiumStarIcon} alt={"premium-star-icon"} />
            </div>
        </div>
    )
}

export default CalendarLayoutIcon;
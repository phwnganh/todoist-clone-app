import type {RefObject} from "react";
import type {OpenMyTaskFilterDropdown} from "@/types/menu-nav.type.ts";
import TaskSmallArrowDownIcon from "@/components/icons/TaskSmallArrowDownIcon.tsx";
import MyTaskFilterDateDropdown from "../MyTaskFilterDateDropdown.tsx";

type FilteringDateSectionProps = {
    dateRef: RefObject<HTMLDivElement | null>
    selectedDateQuery: string | null
    displayDate: string;
    openDropdown: OpenMyTaskFilterDropdown;
    onToggleDropdown: () => void;
    onSelectFilteringDate: (dateKey: string | null) => void;
}
const FilteringDateSection = ({dateRef, selectedDateQuery, displayDate, openDropdown, onToggleDropdown, onSelectFilteringDate}: FilteringDateSectionProps) => {
    return (
        <div className={"relative"} ref={dateRef}>
            <button
                className={
                    "py-0.5 px-1 flex items-center justify-between gap-small w-full"
                }
                onClick={onToggleDropdown}
            >
                <p className={"text-sm"}>Date</p>
                <div
                    className={
                        "cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"
                    }
                >
                    <p className={"text-sm"}>{displayDate}</p>
                    <div className={"flex justify-center items-center w-7 h-7"}>
                        <TaskSmallArrowDownIcon />
                    </div>
                </div>
            </button>
            {openDropdown === "date" && <MyTaskFilterDateDropdown selectedFilteringDate={selectedDateQuery} onSelectFilteringDate={onSelectFilteringDate}/>}
        </div>
    );
};

export default FilteringDateSection;
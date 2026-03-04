import type {RefObject} from "react";
import type {SortedBy} from "../../../../types/viewOptions.type.ts";
import type {OpenMyTaskFilterDropdown} from "../../../../types/menu-nav.type.ts";
import TaskSmallArrowDownIcon from "../../../icons/TaskSmallArrowDownIcon.tsx";
import MyTaskFilterSortingDropdown from "../MyTaskFilterSortingDropdown.tsx";

type SortingTaskSectionProps = {
    sortRef: RefObject<HTMLDivElement | null>;
    selectedSorting?: SortedBy | null;
    displayLabel: string;
    openDropdown: OpenMyTaskFilterDropdown;
    onToggleDropdown: () => void;
    onSelectSortingTask: (sort?: SortedBy | null) => void;
}
const SortingTaskSection = ({sortRef, selectedSorting, displayLabel, openDropdown, onToggleDropdown, onSelectSortingTask}: SortingTaskSectionProps) => {
    return (
        <div className={"relative"} ref={sortRef}>
            <button
                className={
                    "py-0.5 px-1 flex items-center justify-between gap-small w-full"
                }
                onClick={onToggleDropdown}
            >
                <p className={"text-sm"}>Sorting</p>
                <div
                    className={
                        "cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"
                    }
                >
                    <p className={"text-sm"}>{displayLabel}</p>
                    <div className={"flex justify-center items-center w-7 h-7"}>
                        <TaskSmallArrowDownIcon />
                    </div>
                </div>
            </button>
            {openDropdown === "sorting" && (
                <MyTaskFilterSortingDropdown
                    selectedSorting={selectedSorting ?? null}
                    onSelectSorting={onSelectSortingTask}
                />
            )}
        </div>
    );
};

export default SortingTaskSection;
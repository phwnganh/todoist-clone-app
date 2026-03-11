import type {RefObject} from "react";
import type {OpenMyTaskFilterDropdown} from "@/types/menu-nav.type.ts";
import type {Priority} from "@/types/task.type.ts";
import TaskSmallArrowDownIcon from "@/components/icons/TaskSmallArrowDownIcon.tsx";
import MyTaskFilterPriorityDropdown from "../MyTaskFilterPriorityDropdown.tsx";

type FilteringPrioritiesSectionProps = {
    priorityRef: RefObject<HTMLDivElement | null>
    selectedPriorityKey: string[]
    displayPriorities: string;
    openDropdown: OpenMyTaskFilterDropdown;
    onToggleDropdown: () => void;
    onSelectFilteringPriorities: (priority?: Priority) => void;
}
const FilteringPrioritiesSection = ({priorityRef, selectedPriorityKey, displayPriorities, openDropdown, onToggleDropdown, onSelectFilteringPriorities}: FilteringPrioritiesSectionProps) => {
    return (
        <div className={"relative"} ref={priorityRef}>
            <button
                className={
                    "py-0.5 px-1 flex items-center justify-between gap-small w-full"
                }
                onClick={onToggleDropdown}
            >
                <p className={"text-sm"}>Priority</p>
                <div
                    className={
                        "cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"
                    }
                >
                    <p className={"text-sm"}>{displayPriorities}</p>
                    <div className={"flex justify-center items-center w-7 h-7"}>
                        <TaskSmallArrowDownIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                    </div>
                </div>
            </button>
            {openDropdown === "priority" && (
                <MyTaskFilterPriorityDropdown
                    selectedFilteringPriority={selectedPriorityKey}
                    onSelectFilteringPriority={onSelectFilteringPriorities}
                />
            )}
        </div>
    );
};

export default FilteringPrioritiesSection;
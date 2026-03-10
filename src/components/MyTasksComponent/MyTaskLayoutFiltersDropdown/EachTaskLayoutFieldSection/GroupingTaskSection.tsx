import type {RefObject} from "react";
import type {GroupedBy} from "@/types/viewOptions.type.ts";
import type {OpenMyTaskFilterDropdown} from "@/types/menu-nav.type.ts";
import TaskSmallArrowDownIcon from "@/components/icons/TaskSmallArrowDownIcon.tsx";
import MyTaskFilterGroupingDropdown from "../MyTaskFilterGroupingDropdown.tsx";

type GroupingTaskSectionProps = {
    groupRef: RefObject<HTMLDivElement | null>;
    selectedGrouping?: GroupedBy | null;
    displayLabel: string;
    openDropdown: OpenMyTaskFilterDropdown;
    onToggleDropdown: () => void;
    onSelectGroupingTask: (group?: GroupedBy | null) => void;
}
const GroupingTaskSection = ({groupRef, selectedGrouping, displayLabel, openDropdown, onToggleDropdown, onSelectGroupingTask}: GroupingTaskSectionProps) => {

    return (
        <div className={"relative"} ref={groupRef}>
            <button
                className={
                    "py-0.5 px-1 flex items-center justify-between gap-small w-full"
                }
                onClick={onToggleDropdown}
            >
                <p className={"text-sm"}>Grouping</p>
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
            {openDropdown === "grouping" && (
                <MyTaskFilterGroupingDropdown
                    selectedGrouping={selectedGrouping ?? null}
                    onSelectGrouping={onSelectGroupingTask}
                />
            )}
        </div>
    );
};

export default GroupingTaskSection;
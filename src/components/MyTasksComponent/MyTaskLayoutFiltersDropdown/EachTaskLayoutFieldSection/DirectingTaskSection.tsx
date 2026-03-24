import type {RefObject} from "react";
import type {SortOrder} from "@/types/viewOptions.type.ts";
import type {OpenMyTaskFilterDropdown} from "@/types/menu-nav.type.ts";
import TaskSmallArrowDownIcon from "@/components/icons/TaskSmallArrowDownIcon.tsx";
import MyTaskFilterDirectionDropdown from "../MyTaskFilterDirectionDropdown.tsx";

type DirectingTaskSectionProps = {
    directRef: RefObject<HTMLDivElement | null>;
    selectedDirecting?: SortOrder | null;
    displayLabel: string;
    openDropdown: OpenMyTaskFilterDropdown;
    onToggleDropdown: () => void;
    onSelectDirectingTask: (direction?: SortOrder) => void;
}
const DirectingTaskSection = ({directRef, selectedDirecting, displayLabel, openDropdown, onToggleDropdown, onSelectDirectingTask}: DirectingTaskSectionProps) => {
    return (
        <div className={"relative"} ref={directRef}>
            <button
                className={
                    "py-0.5 px-1 flex items-center justify-between gap-small w-full"
                }
                onClick={onToggleDropdown}
            >
                <p className={"text-sm"}>Direction</p>
                <div
                    className={
                        "cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"
                    }
                >
                    <p className={"text-sm"}>{displayLabel}</p>
                    <div className={"flex justify-center items-center w-7 h-7"}>
                        <TaskSmallArrowDownIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                    </div>
                </div>
            </button>
            {openDropdown === "direction" && (
                <MyTaskFilterDirectionDropdown
                    selectedDirection={selectedDirecting}
                    onSelectDirection={onSelectDirectingTask}
                />
            )}
        </div>
    );
};

export default DirectingTaskSection;
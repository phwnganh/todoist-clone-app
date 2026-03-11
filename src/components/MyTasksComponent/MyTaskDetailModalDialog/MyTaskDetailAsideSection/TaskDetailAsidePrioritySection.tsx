import type {Priority} from "@/types/task.type.ts";
import type {RefObject} from "react";
import PriorityIcon from "@/components/icons/PriorityIcon.tsx";
import TaskSmallArrowDownIcon from "@/components/icons/TaskSmallArrowDownIcon.tsx";
import MyTaskPriorityDropdown from "../../MyTaskForm/MyTaskPriorityDropdown.tsx";

type TaskDetailAsidePrioritySectionProps = {
    selectedPriority: Priority | null;
    priorityRef: RefObject<HTMLDivElement | null>;
    isOpenMyTaskDetailAside: boolean;
    onToggle: () => void;
    onSelectPriority: (priority: Priority) => void;
}
const TaskDetailAsidePrioritySection = ({selectedPriority, priorityRef, isOpenMyTaskDetailAside, onToggle, onSelectPriority}: TaskDetailAsidePrioritySectionProps) => {
    return (
        <>
            <div className={"flex flex-col gap-1.5"}>
                <p
                    className={
                        "text-product-library-display-secondary-idle-tint font-medium text-sm"
                    }
                >
                    Priority
                </p>
                <div className={"relative"} ref={priorityRef}>
                    <div
                        role={"listbox"}
                        onClick={onToggle}
                        className={
                            "cursor-pointer flex items-center justify-between gap-1.5 hover:bg-product-library-display-accent-secondary-fill rounded-sm p-1.5 group/priority"
                        }
                    >
                        <div className={"flex justify-center items-center"}>
                            <div className={"flex justify-center items-center w-4 h-4"}>
                                <PriorityIcon className={`text-${selectedPriority?.color}`} />
                            </div>
                            <div className={"ml-xsmall text-sm pr-xsmall"}>
                                {selectedPriority?.label}
                            </div>
                        </div>
                        <div
                            className={
                                "group-hover/priority:flex justify-center items-center hidden"
                            }
                        >
                            <TaskSmallArrowDownIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                        </div>
                    </div>
                    {isOpenMyTaskDetailAside && (
                        <MyTaskPriorityDropdown
                            selectedPriority={selectedPriority}
                            onSelect={onSelectPriority}
                        />
                    )}
                </div>
            </div>
            <hr className="border-t border-t-product-library-divider-tertiary" />
        </>
    );
};

export default TaskDetailAsidePrioritySection;
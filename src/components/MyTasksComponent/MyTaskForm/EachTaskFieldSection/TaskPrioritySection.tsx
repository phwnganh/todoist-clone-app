import type {RefObject} from "react";
import type {OpenMyTaskFormDropdown} from "@/types/menu-nav.type.ts";
import type {Priority} from "@/types/task.type.ts";
import PriorityIcon from "@/components/icons/PriorityIcon.tsx";
import MyTaskPriorityDropdown from "@/components/MyTasksComponent/MyTaskForm/MyTaskPriorityDropdown.tsx";
import TaskFlagPriorityIcon from "@/components/icons/TaskFlagPriorityIcon.tsx";

type TaskPrioritySectionProps = {
    priorityRef: RefObject<HTMLDivElement | null>;
    onToggleDropdown: (openDropdown: OpenMyTaskFormDropdown) => void;
    priorityValue: Priority | null;
    variant?: string;
    onRemovePriority: () => void;
    openDropdown: OpenMyTaskFormDropdown;
    onSelectPriority: (priority: Priority) => void;
}
const TaskPrioritySection = ({priorityRef, onToggleDropdown, priorityValue, variant, onRemovePriority, openDropdown, onSelectPriority}: TaskPrioritySectionProps) => {
    return (
        <div className={"relative"} ref={priorityRef}>
            <div
                role={"button"}
                onClick={() => onToggleDropdown("priority")}
                className={
                    "px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill cursor-pointer"
                }
            >
                {priorityValue ? (
                    <div className={"flex justify-between items-start"}>
                        <div className={"flex items-center"}>
                            <div className={"w-4 h-4 flex justify-center items-center"}>
                                <PriorityIcon className={`text-${priorityValue.color}`} />
                            </div>
                            {variant === "list" ? (
                                <div
                                    className={
                                        "ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"
                                    }
                                >
                                    {priorityValue.label}
                                </div>
                            ) : (
                                <div
                                    className={
                                        "ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"
                                    }
                                >
                                    {priorityValue.key.toUpperCase()}
                                </div>
                            )}
                        </div>
                        <button type={"button"} onClick={onRemovePriority} className={"w-5 h-5 flex justify-center items-center"}>x</button>

                    </div>
                ) : (
                    <div className={"flex items-center"}>
                        <div className={"w-4 h-4 flex justify-center items-center"}>
                            <TaskFlagPriorityIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                        </div>
                        {variant === "list" && (
                            <div
                                className={
                                    "ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"
                                }
                            >
                                Priority
                            </div>
                        )}
                    </div>
                )}
            </div>
            {openDropdown === "priority" && (
                <MyTaskPriorityDropdown
                    selectedPriority={priorityValue}
                    onSelect={onSelectPriority}
                />
            )}
        </div>
    );
};

export default TaskPrioritySection;
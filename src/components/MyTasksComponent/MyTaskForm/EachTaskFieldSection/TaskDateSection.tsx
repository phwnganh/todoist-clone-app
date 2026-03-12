import type {RefObject} from "react";
import type {Due} from "@/types/task.type.ts";
import type {OpenMyTaskFormDropdown} from "@/types/menu-nav.type.ts";
import MyTaskDateDropdown from "@/components/MyTasksComponent/MyTaskForm/MyTaskDateDropdown";
import TaskSmallCalendarIcon from "@/components/icons/TaskSmallCalendarIcon.tsx";

type TaskDateSectionProps = {
    dateRef: RefObject<HTMLDivElement | null>;
    onToggleDropdown: (openDropdown: OpenMyTaskFormDropdown) => void;
    dueValue: Due | null;
    variant?: string;
    onRemoveDate: () => void;
    openDropdown: OpenMyTaskFormDropdown;
    onSelectDate: (date: Due) => void;
}
const TaskDateSection = ({dateRef, onToggleDropdown, dueValue,variant, onRemoveDate, openDropdown, onSelectDate}: TaskDateSectionProps) => {
    return (
        <div className={"relative"} ref={dateRef}>
            <div
                role={"button"}
                onClick={() => onToggleDropdown("date")}
                className={
                    "px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill cursor-pointer"
                }
            >
                {dueValue ? (
                    <div className={"flex justify-between items-start"}>
                        <div className={"flex items-center"}>
                            <div className={"w-4 h-4 flex justify-center items-center"}>
                                <TaskSmallCalendarIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                            </div>
                            {variant === "list" && (
                                <div className={"ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"}>{dueValue.string}</div>
                            )}
                        </div>
                        <button type={"button"} onClick={onRemoveDate} className={"w-5 h-5 flex justify-center items-center"}>x</button>

                    </div>
                ) : (
                    <div className={"flex items-center"}>
                        <div className={"w-4 h-4 flex justify-center items-center"}>
                            <TaskSmallCalendarIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                        </div>
                        {variant === "list" && (
                            <div
                                className={
                                    "ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"
                                }
                            >
                                Date
                            </div>
                        )}
                    </div>
                )}

            </div>
            {openDropdown === "date" && <MyTaskDateDropdown selectedDate={dueValue} onSelectDate={onSelectDate}/>}
        </div>
    );
};

export default TaskDateSection;
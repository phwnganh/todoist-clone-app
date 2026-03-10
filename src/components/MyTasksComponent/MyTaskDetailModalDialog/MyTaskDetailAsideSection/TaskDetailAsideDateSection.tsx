import type {Due} from "@/types/task.type.ts";
import type {RefObject} from "react";
import SmallCalendarIcon from "@/assets/small-calendar-icon.svg";
import SmallPlusAddIcon from "@/components/icons/SmallPlusAddIcon.tsx";
import {DUE_COLOR_CLASS} from "@/constants/color.constants.ts";
import MyTaskDateDropdown from "../../MyTaskForm/MyTaskDateDropdown";

type TaskDetailAsideDateSectionProps = {
    selectedDue: Due | null;
    category: string;
    label: string | null;
    isOpenMyTaskDetailAside: boolean;
    dateRef: RefObject<HTMLDivElement | null>;
    onToggle: () => void;
    onSelectDate: (date: Due) => void;
    onRemoveDate: () => void;
}
const TaskDetailAsideDateSection = ({selectedDue, category, label, isOpenMyTaskDetailAside, dateRef, onToggle, onSelectDate, onRemoveDate}: TaskDetailAsideDateSectionProps) => {
    return (
        <>
            <div className={"relative"} ref={dateRef}>
                {selectedDue === null ? (
                    <div
                        role={"listbox"}
                        onClick={onToggle}
                        className={
                            "cursor-pointer flex justify-between items-center hover:bg-product-library-display-accent-secondary-fill rounded-sm p-1.5"
                        }
                    >
                        <p
                            className={
                                "text-product-library-display-secondary-idle-tint font-medium text-sm"
                            }
                        >
                            Date
                        </p>
                        <button
                            type={"button"}
                            className={"flex justify-center items-center"}
                        >
                            <SmallPlusAddIcon />
                        </button>
                    </div>
                ) : (
                    <div className={"flex flex-col gap-1.5"}>
                        <p
                            className={
                                "text-product-library-display-secondary-idle-tint font-medium text-sm"
                            }
                        >
                            Date
                        </p>
                        <button
                            type={"button"}
                            className={
                                "flex justify-between items-center group hover:bg-product-library-display-accent-secondary-fill rounded-sm p-2"
                            }
                            onClick={onToggle}
                        >
                            <div className={"flex items-center gap-1.5"}>
                                <div
                                    className={`flex gap-1.5 text-xs ${DUE_COLOR_CLASS[category]}`}
                                >
                                    <img src={SmallCalendarIcon} alt={"small-calendar-icon"} />
                                    <span>{label}</span>
                                </div>
                            </div>
                            <div
                                role={"button"}
                                className={"text-sm group-hover:opacity-100 opacity-0"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveDate();
                                }}
                            >
                                x
                            </div>
                        </button>
                    </div>
                )}

                {isOpenMyTaskDetailAside && (
                    <MyTaskDateDropdown
                        onSelectDate={onSelectDate}
                        selectedDate={selectedDue}
                    />
                )}
            </div>

            <hr className="border-t border-t-product-library-divider-tertiary" />
        </>
    );
};

export default TaskDetailAsideDateSection;
import TaskSmallCalendarIcon from '../../../assets/task-small-calendar-icon.svg'
import TaskFlagIcon from '../../../assets/task-flag-priority-icon.svg'
import TaskClockIcon from '../../../assets/task-clock-reminders-icon.svg'
import TaskSmallThreeDotsIcon from '../../icons/TaskSmallThreeDotsIcon'
import TaskSmallHashtagIcon from "../../../assets/task-small-hashtag-icon.svg";
import TaskSmallDropdownIcon from "../../../assets/task-small-dropdown-icon.svg"
import {type FormEvent, useRef, useState} from "react";
import type {OpenMyTaskFormDropdown} from "../../../types/menu-nav.type.ts";
import {useClickOutside} from "../../../hooks/useClickOutside.ts";

export type MyTaskFormValues = {
    content: string;
    description: string;
    due_date: string;
    priority: number;
    project_id: string;
}
type AddMyTaskFormProps = {
    onCloseAddMyTask: () => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    submittingLabel: string;
    values: MyTaskFormValues;
    onChange: (values: MyTaskFormValues) => void;
    isPending?: boolean;
    errorMessage?: string | null
}
const AddMyTaskForm = ({onCloseAddMyTask, onSubmit, values, onChange, submitLabel, submittingLabel, isPending, errorMessage}: AddMyTaskFormProps) => {
    const [isOpenAddMyTaskDropdown, setIsOpenAddMyTaskDropdown] = useState<OpenMyTaskFormDropdown>(null)
    const dateRef = useRef<HTMLButtonElement | null>(null)
    const priorityRef = useRef<HTMLButtonElement | null>(null)
    const remindersRef = useRef<HTMLButtonElement | null>(null)
    const projectRef = useRef<HTMLButtonElement | null>(null)
    const dummyRef = useRef<HTMLButtonElement | null>(null)
    const handleToggleDropdown = (name: OpenMyTaskFormDropdown) => {
        setIsOpenAddMyTaskDropdown(prev => (prev === name ? null: name))
    }

    const handleSelectProject = () => {
        // onChange(projectId)
        setIsOpenAddMyTaskDropdown(null)
    }

    useClickOutside({
        ref: isOpenAddMyTaskDropdown === "date" ? dateRef : isOpenAddMyTaskDropdown === "priority" ? priorityRef : isOpenAddMyTaskDropdown === "reminders" ? remindersRef : isOpenAddMyTaskDropdown === "project" ? projectRef : dummyRef,
        handler: () => setIsOpenAddMyTaskDropdown(null),
        enabled: isOpenAddMyTaskDropdown !== null
    })
    return (
        <li>
            <form className={"border border-product-library-border-idle-tint rounded-large"}>
                <div className={"pt-small px-small rounded-large"}>
                    <div className={"max-h-50 mb-small flex flex-col gap-xsmall"}>
                        <input type={"text"} className={"mr-7 leading-tight font-medium text-sm text-product-library-display-primary-idle-tint outline-none"} placeholder={"Content"}></input>
                        <input type={"text"} className={"text-xs leading-tight text-product-library-display-primary-idle-tint my-0.5 outline-none"} placeholder={"Description"}/>
                        <div className={"mb-small flex gap-small"}>
                            {/*date*/}
                            <button className={"px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill"}
                            >
                                <div className={"flex items-center"}>
                                    <div className={"flex justify-center items-center"}>
                                        <img src={TaskSmallCalendarIcon} alt={"calendar"} />
                                    </div>
                                    <div className={"ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"}>Date</div>
                                </div>
                            </button>

                            {/*priority*/}
                            <button className={"px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill"}>
                                <div className={"flex items-center"}>
                                    <div className={"flex justify-center items-center"}>
                                        <img src={TaskFlagIcon} alt={"flag-icon"} />
                                    </div>
                                    <div className={"ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"}>Priority</div>
                                </div>
                            </button>

                            {/*reminders*/}
                            <button className={"px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill"}>
                                <div className={"flex items-center"}>
                                    <div className={"flex justify-center items-center"}>
                                        <img src={TaskClockIcon} alt={"clock-icon"} />
                                    </div>
                                    <div className={"ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"}>Reminders</div>
                                </div>
                            </button>

                            <button className={"px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill"}>
                                <div className={"flex justify-center items-center"}>
                                    <TaskSmallThreeDotsIcon/>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"mt-small flex items-center justify-between border-t border-t-product-library-border-idle-tint p-small"}>
                    <button className={"mr-small pl-xsmall pr-small py-1.5 flex gap-xsmall text-sm relative hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}>
                        <div className={"flex justify-center items-center"}>
                            <img src={TaskSmallHashtagIcon} alt={"task-small-hashtag-icon"}/>
                        </div>
                        <span className={"text-product-library-display-secondary-idle-tint font-medium"}>Test</span>
                        <div className={"flex justify-center items-center"}>
                            <img src={TaskSmallDropdownIcon} alt={"task-small-dropdown-icon"}/>
                        </div>
                    </button>

                    <div className={"flex gap-2.5"}>
                        <button
                            type="button"
                            className="px-3 py-1.5 rounded-small bg-product-library-actionable-secondary-idle-fill flex justify-center items-center min-w-17"
                            onClick={onCloseAddMyTask}
                        >
              <span className="text-sm font-medium text-product-library-actionable-secondary-on-idle-tint">
                Cancel
              </span>
                        </button>
                        <button
                            type="submit"
                            className={`px-3 py-1.5 rounded-small flex justify-center items-center min-w-17 bg-product-library-actionable-primary-idle-fill hover:bg-product-library-actionable-primary-hover-fill
                            `}
                            // disabled={isAddButtonDisabled}
                        >
              <span className="text-sm font-medium text-product-library-actionable-primary-on-idle-tint">
                {/*{isPending ? submittingLabel : submitLabel}*/}Add task
              </span>
                        </button>
                    </div>
                </div>
            </form>
        </li>
    );
};

export default AddMyTaskForm;
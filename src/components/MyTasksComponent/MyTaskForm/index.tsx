import TaskSmallCalendarIcon from '../../../assets/task-small-calendar-icon.svg'
import TaskFlagIcon from '../../../assets/task-flag-priority-icon.svg'
import TaskClockIcon from '../../../assets/task-clock-reminders-icon.svg'
import TaskSmallDropdownIcon from "../../../assets/task-small-dropdown-icon.svg"
import {type ChangeEvent, type FormEvent, useRef, useState} from "react";
import type {OpenMyTaskFormDropdown} from "../../../types/menu-nav.type.ts";
import {useClickOutside} from "../../../hooks/useClickOutside.ts";
import MyTaskProjectDropdown from "./MyTaskProjectDropdown";
import {updateMyTaskField} from "../../../helpers/updateMyTaskField.ts";
import MyTaskPriorityDropdown from "./MyTaskPriorityDropdown.tsx";
import LabelIcon from '../../../assets/label-icon.svg'
import HashtagIcon from "../../icons/HashtagIcon.tsx";
import {getProjectColorClass} from "../../../helpers/getProjectColorClass.ts";
import type {Project} from "../../../types/project.type.ts";
import {useProjectStore} from "../../../stores/project.store.ts";
import {useGetAProject} from "../../../hooks/useProjects.ts";
import {replaceProjectHashtagFromContent} from "../../../helpers/replaceProjectHashtagFromContent.ts";

export type MyTaskFormValues = {
    content: string;
    description: string;
    due_date: string;
    priority: number;
    project: Project | null;
}
type MyTaskFormProps = {
    onCloseMyTaskForm: () => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    submittingLabel: string;
    values: MyTaskFormValues;
    onChange: (values: MyTaskFormValues) => void;
    isPending?: boolean;
    errorMessage?: string | null;
    hideProjectContentTag?: boolean;
}
const MyTaskForm = ({onCloseMyTaskForm, onSubmit, values, onChange, submitLabel, hideProjectContentTag, submittingLabel, isPending, errorMessage}: MyTaskFormProps) => {
    const [isOpenAddMyTaskDropdown, setIsOpenAddMyTaskDropdown] = useState<OpenMyTaskFormDropdown>(null)
    const dateRef = useRef<HTMLDivElement | null>(null)
    const priorityRef = useRef<HTMLDivElement | null>(null)
    const projectRef = useRef<HTMLDivElement | null>(null)
    const dummyRef = useRef<HTMLDivElement | null>(null)
    const projectId = useProjectStore(state => state.projectId)
    const {data: projectDetail} = useGetAProject(projectId)
    const handleToggleDropdown = (name: OpenMyTaskFormDropdown) => {
        setIsOpenAddMyTaskDropdown(prev => (prev === name ? null: name))
    }

    const handleSelectPriority = (priority: number) => {
        onChange(updateMyTaskField(values, "priority", priority))
        setIsOpenAddMyTaskDropdown(null)
    }

    const handleSelectProject = (project: Project) => {
        const hashtag = `#${project.name}`
        const replacedContent = replaceProjectHashtagFromContent(values.content, values.project)

        onChange({
            ...values,
            project,
            content: replacedContent ? `${replacedContent} ${hashtag} ` : `${hashtag} `,
        })
        setIsOpenAddMyTaskDropdown(null)
    }

    const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...values,
            content: e.target.value,
        })
    }

    useClickOutside({
        ref: isOpenAddMyTaskDropdown === "date" ? dateRef : isOpenAddMyTaskDropdown === "priority" ? priorityRef : isOpenAddMyTaskDropdown === "project" ? projectRef : dummyRef,
        handler: () => setIsOpenAddMyTaskDropdown(null),
        enabled: isOpenAddMyTaskDropdown !== null
    })
    return (
        <li>
            <form className={"border border-product-library-border-idle-tint rounded-large"} onSubmit={onSubmit}>
                <div className={"pt-small px-small rounded-large"}>
                    <div className={"max-h-50 mb-small flex flex-col gap-xsmall"}>
                        <input type={"text"} className={"mr-7 leading-tight font-medium text-sm text-product-library-display-primary-idle-tint outline-none"} placeholder={"Content"} value={values.content} onChange={handleContentChange}></input>
                        <input type={"text"} className={"text-xs leading-tight text-product-library-display-primary-idle-tint my-0.5 outline-none"} placeholder={"Description"} value={values.description} onChange={e => onChange(updateMyTaskField(values, "description", e.target.value))} />
                        <div className={"mb-small flex gap-small"}>
                            {/*date*/}
                            <div role={"button"} className={"px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill cursor-pointer"}
                            >
                                <div className={"flex items-center"}>
                                    <div className={"flex justify-center items-center"}>
                                        <img src={TaskSmallCalendarIcon} alt={"calendar"} />
                                    </div>
                                    <div className={"ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"}>Date</div>
                                </div>
                            </div>

                            {/*priority*/}
                            <div className={"relative"} ref={priorityRef}>
                                <div role={"button"} onClick={() => handleToggleDropdown("priority")} className={"px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill cursor-pointer"}>
                                    <div className={"flex items-center"}>
                                        <div className={"flex justify-center items-center"}>
                                            <img src={TaskFlagIcon} alt={"flag-icon"} />
                                        </div>
                                        <div className={"ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"}>Priority</div>
                                    </div>
                                </div>
                                {isOpenAddMyTaskDropdown === "priority" && (
                                    <MyTaskPriorityDropdown/>
                                )}
                            </div>

                            {/*reminders*/}
                            <div role={"button"} className={"px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill cursor-pointer"}>
                                <div className={"flex items-center"}>
                                    <div className={"flex justify-center items-center"}>
                                        <img src={TaskClockIcon} alt={"clock-icon"} />
                                    </div>
                                    <div className={"ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"}>Reminders</div>
                                </div>
                            </div>

                            <button className={"px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill cursor-pointer"}>
                                <div className={"flex justify-center items-center mr-2.5"}>
                                   <img src={LabelIcon} alt={"label-icon"} />
                                </div>
                                <p className={"text-sm text-product-library-display-secondary-idle-tint"}>Labels</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"mt-small flex items-center justify-between border-t border-t-product-library-border-idle-tint p-small"}>
                    <div className={"relative"} ref={projectRef}>
                        <button type={"button"} aria-haspopup={"listbox"} aria-expanded={isOpenAddMyTaskDropdown === "project"} aria-controls={"project-listbox"} onClick={() => handleToggleDropdown("project")}
                        className={"mr-small pl-xsmall pr-small py-1.5 flex items-center gap-xsmall text-sm hover:bg-product-library-selectable-secondary-hover-fill rounded-small cursor-pointer"}>
                            <div className={"flex justify-center items-center w-4 h-4"}>
                                <HashtagIcon className={getProjectColorClass(projectDetail?.color)}/>
                            </div>
                            <span className={"text-product-library-display-secondary-idle-tint font-medium"}>{projectDetail?.name}</span>
                            <div className={"flex justify-center items-center"}>
                                <img src={TaskSmallDropdownIcon} alt={"task-small-dropdown-icon"}/>
                            </div>
                        </button>
                        {isOpenAddMyTaskDropdown === "project" && (
                            <MyTaskProjectDropdown selectedProject={values.project} onSelect={(project: Project) => handleSelectProject(project)}/>
                        )}
                    </div>

                    <div className={"flex gap-2.5"}>
                        <button
                            type="button"
                            className="px-3 py-1.5 rounded-small bg-product-library-actionable-secondary-idle-fill flex justify-center items-center min-w-17"
                            onClick={onCloseMyTaskForm}
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
                {/*{isPending ? submittingLabel : submitLabel}*/}{submitLabel}
              </span>
                        </button>
                    </div>
                </div>
            </form>
        </li>
    );
};

export default MyTaskForm;
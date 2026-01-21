import type {TaskNode} from "../../types/task.type.ts";
import SmallCalendarIcon from '../../assets/small-calendar-icon.svg'
import EditIcon from '../icons/EditIcon.tsx'
import DueDateIcon from "../icons/DueDateIcon.tsx";
import CommentIcon from "../icons/CommentIcon.tsx";
import MenuIcon from "../icons/MenuIcon.tsx";
import MyTaskContent from "./MyTaskContent";
import TaskSmallArrowDownIcon from '../icons/TaskSmallArrowDownIcon.tsx'
import {useState} from "react";
import TaskSmallArrowRightIcon from "../icons/TaskSmallArrowRightIcon.tsx";
import {getTaskIndentClass} from "../../helpers/getTaskIndentClass.ts";
import EditMyTaskModalDialog from "./EditMyTaskComponent";
import {useTaskStore} from "../../stores/task.store.ts";
import VerifiedIcon from "../icons/VerifiedIcon.tsx";
import ChildrenIcon from '../../assets/children-icon.svg'
type MyTaskListItemProps = {
    taskNode: TaskNode
    level: number
}
const MyTaskListItem = ({taskNode, level}: MyTaskListItemProps) => {
    const {task, children} = taskNode
    const [isExpanded, setIsExpanded] = useState(true);
    const {editingTaskId, onOpenEditTask, onCloseEditTask} = useTaskStore()

    const isEditing = editingTaskId === task.id
    const hasChildren = children.length > 0


    return (
        <>
            {isEditing ? (<EditMyTaskModalDialog task={task} onCloseEditMyTask={onCloseEditTask}/>) : (
                <li className={`px-2 border-b border-b-product-library-divider-primary flex justify-between items-start group relative ${getTaskIndentClass(level)}`}>
                    <div role={"button"} className={"flex items-start"}>
                        {hasChildren && (
                            <button type={"button"}
                                    onClick={() => setIsExpanded(prev => !prev)}
                                    className={"absolute pr-0.75 top-2 -left-4 flex justify-center items-center rounded-small hover:bg-product-library-selectable-secondary-hover-fill"}>
                                {isExpanded ? <TaskSmallArrowDownIcon/> : <TaskSmallArrowRightIcon/>}
                            </button>
                        )}

                        {/*btn toggle checked complete the task*/}
                        <button type={"button"} aria-checked={"false"} aria-label={"Mark task as complete"} className={"mt-2 mr-1.5 -ml-0.75 relative group/check"}>
                            <div className={"h-5 w-5 rounded-full border-2 border-product-library-priorities-p4-primary-idle-fill"}></div>
                            <div className={"inset-0 absolute group-hover/check:flex justify-center items-center hidden"}>
                                <VerifiedIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                            </div>
                        </button>
                        {/*task list item*/}
                        <div className={"py-2 mr-7.5 flex flex-col"}>
                            <div className={"mb-0.75 text-sm"}>
                                <MyTaskContent content={task.content}/>
                            </div>
                            <p className={"text-xs mb-0.5 text-product-library-display-secondary-idle-tint line-clamp-1"}>{task.description}</p>
                            <div className={"flex gap-small items-center"}>
                                {hasChildren &&
                                    <div className={"flex gap-0.5 text-xs text-product-library-display-secondary-idle-tint"}>
                                        <img src={ChildrenIcon} alt={"children-icon"}/>
                                        <span>0/{children.length}</span>
                                    </div>
                                }

                        <button type={"button"} className={"flex gap-0.5 text-xs text-product-library-actionable-primary-idle-fill"}>
                                <img src={SmallCalendarIcon} alt={"small-calendar-icon"}/>
                                <span>Tomorrow</span>
                        </button>

                            </div>
                        </div>
                    </div>
                    <div className={"group-hover:flex hidden mt-2 pl-4 gap-small"}>
                        <button type={"button"} onClick={() => onOpenEditTask(task.id)} aria-label={"edit"} className={"rounded-small hover:bg-product-library-selectable-secondary-hover-fill"}>
                            <EditIcon/>
                        </button>
                        <button type={"button"} aria-label={"due-date"} className={"rounded-small hover:bg-product-library-selectable-secondary-hover-fill"}>
                            <DueDateIcon/>
                        </button>
                        <button type={"button"} aria-label={"comment"} className={"rounded-small hover:bg-product-library-selectable-secondary-hover-fill"}>
                            <CommentIcon/>
                        </button>
                        <button type={"button"} aria-label={"menu"} className={"rounded-small hover:bg-product-library-selectable-secondary-hover-fill"}>
                            <MenuIcon/>
                        </button>
                    </div>
                </li>
            )}
            {hasChildren && isExpanded && children.map(child => (<MyTaskListItem key={child.task.id} taskNode={child} level={level + 1}/>))}
        </>
    );
};

export default MyTaskListItem;
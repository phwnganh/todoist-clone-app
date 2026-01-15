import type {Task} from "../../types/task.type.ts";
import SmallCalendarIcon from '../../assets/small-calendar-icon.svg'
import EditIcon from '../icons/EditIcon.tsx'
import DueDateIcon from "../icons/DueDateIcon.tsx";
import CommentIcon from "../icons/CommentIcon.tsx";
import MenuIcon from "../icons/MenuIcon.tsx";
import MyTaskContent from "./MyTaskContent";
type MyTaskListItemProps = {
    task: Task
}
const MyTaskListItem = ({task}: MyTaskListItemProps) => {
    return (
        <li className={"px-2 border-b border-b-product-library-divider-primary flex justify-between items-start group"}>
            <div role={"button"} className={"flex items-start"}>
                {/*btn toggle checked complete the task*/}
                <button type={"button"} aria-checked={"false"} aria-label={"Mark task as complete"} className={"mt-2 mr-1.5 -ml-0.75"}>
                    <div className={"h-5 w-5 rounded-full border-2 border-product-library-priorities-p4-primary-idle-fill"}></div>
                </button>
                {/*task list item*/}
                <div className={"py-2 mr-7.5 flex flex-col"}>
                    <div className={"mb-0.75 text-sm"}>
                        <MyTaskContent content={task.content}/>
                    </div>
                    <button type={"button"}>
                        <span className={"flex gap-0.5 text-xs text-product-library-actionable-primary-idle-fill"}>
                                <img src={SmallCalendarIcon} alt={"small-calendar-icon"}/>
                                <span>Tomorrow</span>
                        </span>
                    </button>
                </div>
            </div>
            <div className={"group-hover:flex hidden mt-2 pl-4 gap-small"}>
                <button type={"button"} aria-label={"edit"} className={"rounded-small hover:bg-product-library-selectable-secondary-hover-fill"}>
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
    );
};

export default MyTaskListItem;
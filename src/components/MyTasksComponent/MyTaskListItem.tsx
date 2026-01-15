import type {Task} from "../../types/task.type.ts";
import SmallCalendarIcon from '../../assets/small-calendar-icon.svg'
type MyTaskListItemProps = {
    task: Task
}
const MyTaskListItem = ({task}: MyTaskListItemProps) => {
    return (
        <li className={"px-2 border-b border-b-product-library-divider-primary"}>
            <div role={"button"} className={"flex items-start"}>
                {/*btn toggle checked complete the task*/}
                <button type={"button"} aria-checked={"false"} aria-label={"Mark task as complete"} className={"mt-2 mr-1.5 -ml-0.75"}>
                    <div className={"h-5 w-5 rounded-full border-2 border-product-library-priorities-p4-primary-idle-fill"}></div>
                </button>
                {/*task list item*/}
                <div className={"py-2 mr-7.5 flex flex-col"}>
                    <div className={"mb-0.75 text-sm text-product-library-display-primary-idle-tint"}>{task.content}</div>
                    <button type={"button"}>
                        <span className={"flex gap-0.5 text-xs text-product-library-actionable-primary-idle-fill"}>
                                <img src={SmallCalendarIcon} alt={"small-calendar-icon"}/>
                                <span>Tomorrow</span>
                        </span>
                    </button>
                </div>
            </div>
        </li>
    );
};

export default MyTaskListItem;
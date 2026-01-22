import TaskSmallArrowDownIcon from "../../icons/TaskSmallArrowDownIcon.tsx";
import TaskSmallArrowRightIcon from "../../icons/TaskSmallArrowRightIcon.tsx";
import MenuIcon from "../../icons/MenuIcon.tsx";
import type {Task} from "../../../types/task.type.ts";

type MyTaskSectionHeaderProps = {
    isExpanded: boolean;
    onExpanded: () => void;
    name: string;
    tasks: Task[] | undefined | null;
    onOpenEditMyTaskSection: () => void;
}

const MyTaskListSectionHeader = ({isExpanded, onExpanded, name, tasks, onOpenEditMyTaskSection}: MyTaskSectionHeaderProps) => {
    return (
        <div className={"flex justify-between items-start px-4"}>
            <div role={"button"} className={"flex items-start"}>
                <button type={"button"} className={"absolute pr-0.75 top-1.5 -left-4 flex justify-center items-center rounded-small hover:bg-product-library-selectable-secondary-hover-fill"} onClick={onExpanded}>
                    {isExpanded ? <TaskSmallArrowDownIcon/> : <TaskSmallArrowRightIcon/>}
                </button>
                <div className={"flex items-center"}>
                    <div role={"button"} onClick={onOpenEditMyTaskSection} className={"font-bold text-sm pt-1.5 pr-1.5 pb-1.25"}>{name}</div>
                    <span className={"text-sm text-product-library-display-secondary-idle-tint"}>{tasks?.length}</span>
                </div>

            </div>
            <button type={"button"} className={"flex justify-center items-center"}>
                <MenuIcon/>
            </button>
        </div>
    );
};

export default MyTaskListSectionHeader;
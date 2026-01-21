import TaskSmallArrowDownIcon from "../icons/TaskSmallArrowDownIcon.tsx";
import TaskSmallArrowRightIcon from "../icons/TaskSmallArrowRightIcon.tsx";
import MenuIcon from "../icons/MenuIcon.tsx";
import type {Task} from "../../types/task.type.ts";

type MyTaskSectionHeaderProps = {
    isExpanded: boolean;
    onExpanded: () => void;
    name: string;
    tasks: Task[] | undefined | null;
}

const MyTaskSectionHeader = ({isExpanded, onExpanded, name, tasks}: MyTaskSectionHeaderProps) => {
    return (
        <div className={"px-4 border-b border-b-product-library-divider-primary flex justify-between items-start relative"}>
            <div role={"button"} className={"flex items-start"} onClick={onExpanded}>
                <button type={"button"} className={"absolute pr-0.75 top-0.5 -left-4 flex justify-center items-center rounded-small hover:bg-product-library-selectable-secondary-hover-fill"}>
                    {isExpanded ? <TaskSmallArrowDownIcon/> : <TaskSmallArrowRightIcon/>}
                </button>
                <div className={"flex items-center"}>
                    <span className={"font-bold text-sm pt-1.5 pr-1.5 pb-1.25"}>{name}</span>
                    <span className={"text-sm text-product-library-display-secondary-idle-tint"}>{tasks?.length}</span>
                </div>

            </div>
            <button type={"button"} className={"flex justify-center items-center"}>
                <MenuIcon/>
            </button>
        </div>
    );
};

export default MyTaskSectionHeader;
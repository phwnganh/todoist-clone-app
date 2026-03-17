import type {Task} from "@/types/task.type.ts";
import {useExpanded} from "@/hooks/useExpanded.ts";
import TaskSmallArrowDownIcon from "../../icons/TaskSmallArrowDownIcon.tsx";
import TaskSmallArrowRightIcon from "../../icons/TaskSmallArrowRightIcon.tsx";
import MyTaskListItem from "../MyTaskListItem.tsx";
import type {Section} from "@/types/section.type.ts";

type MyTaskGroupSectionProps = {
    title: string;
    tasks: Task[];
    sections?: Section[]
    isSortable?: boolean
}
const MyTaskListGroupSection = ({title, tasks, sections, isSortable}: MyTaskGroupSectionProps) => {
    const { isExpanded, handleExpanded } = useExpanded(true);
    return (
        <section className={"pb-4.5 px-3 lg:px-0"}>
            <div className={"flex items-center gap-1.5"}>
                <button
                    type={"button"}
                    className={
                        "flex justify-center items-center rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                    }
                    onClick={handleExpanded}
                >
                    {isExpanded ? (
                        <TaskSmallArrowDownIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                    ) : (
                        <TaskSmallArrowRightIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                    )}
                </button>
                <p className={"font-bold text-sm pt-1.5 pr-1.5 pb-1.25"}>{title}</p>
            </div>
            <div className={"border-b border-b-product-library-divider-primary"}></div>

            {isExpanded && (
                <ul className={"mt-1.25 flex flex-col flex-wrap"}>
                    {tasks.map(task => (
                        <MyTaskListItem key={task.id} taskNode={{task, children: []}} level={0}
                                        sections={sections} isSortable={isSortable}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
};

export default MyTaskListGroupSection;
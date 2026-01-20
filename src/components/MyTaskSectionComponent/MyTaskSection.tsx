import {useGetAllTasks} from "../../hooks/useTasks.ts";
import {Fragment, useState} from "react";
import MyTaskListItem from "../MyTasksComponent/MyTaskListItem.tsx";
import AddMyTaskModalDialog from "../MyTasksComponent/AddMyTaskComponent";
import AddMyTaskSection from "../MyTasksComponent/AddMyTaskSection.tsx";
import {useTaskTreeMultiLevel} from "../../hooks/useTaskTreeMultiLevel.ts";
import {useProjectStore} from "../../stores/project.store.ts";
import MenuIcon from "../icons/MenuIcon.tsx";
import LoadingSpin from "../ui/LoadingSpin.tsx";
import TaskSmallArrowDownIcon from "../icons/TaskSmallArrowDownIcon.tsx";
import type {Section} from "../../types/section.type.ts";
import {useSectionExpand} from "../../hooks/useSectionExpand.ts";
import TaskSmallArrowRightIcon from "../icons/TaskSmallArrowRightIcon.tsx";

type MyTaskSectionProps = {
    section: Section
}
const MyTaskSection = ({section}: MyTaskSectionProps) => {
    const {data: tasks, isLoading} = useGetAllTasks()
    const projectId = useProjectStore(state => state.projectId)
    const [openAddMyTask, setOpenAddMyTask] = useState(false);
    const {isExpanded, handleExpanded} = useSectionExpand(true)
    const taskTree = useTaskTreeMultiLevel(tasks?.results, projectId, section.id)

    const handleOpenAddMyTask = () => {
        setOpenAddMyTask(true)
    }

    const handleCloseAddMyTask = () => {
        setOpenAddMyTask(false)
    }

    if (isLoading) {
        return (
            <div className={"mt-medium"}>
                <LoadingSpin />
            </div>
        );
    }
    // const filteredTasksBySection = tasks.results.filter(task => task.section_id === )
    return (
        <section>
            <div className={"px-4 border-b border-b-product-library-divider-primary flex justify-between items-start relative"}>
                <div role={"button"} className={"flex items-start"} onClick={handleExpanded}>
                    <button type={"button"} className={"absolute pr-0.75 top-0.5 -left-4 flex justify-center items-center rounded-small hover:bg-product-library-selectable-secondary-hover-fill"}>
                        {isExpanded ? <TaskSmallArrowDownIcon/> : <TaskSmallArrowRightIcon/>}
                    </button>
                    <div className={"flex items-center"}>
                        <span className={"font-bold text-sm"}>{section.name}</span>
                    </div>

                </div>
                <button type={"button"} className={"flex justify-center items-center"}>
                    <MenuIcon/>
                </button>
            </div>

            {isExpanded && (
                <ul className={"mt-1.25 flex flex-col flex-wrap"}>
                    {taskTree.map(taskNode => (
                        <Fragment key={taskNode.task.id}>
                            <MyTaskListItem taskNode={taskNode} level={0}/>
                        </Fragment>
                    ))}
                    {openAddMyTask ? (
                        <AddMyTaskModalDialog onCloseAddMyTask={handleCloseAddMyTask}/>
                    ) : (<AddMyTaskSection onOpenAddMyTask={handleOpenAddMyTask}/>
                    )}
                </ul>
            )}

        </section>

    );
};

export default MyTaskSection;
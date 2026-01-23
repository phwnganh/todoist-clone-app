import {useGetAllTasks} from "../../../hooks/useQueryHook/useTasks.ts";
import {Fragment, useMemo} from "react";
import MyTaskListItem from "../../MyTasksComponent/MyTaskListItem.tsx";
import AddMyTaskModalDialog from "../../MyTasksComponent/AddMyTaskComponent";
import AddMyTaskButtonSection from "../../MyTasksComponent/AddMyTaskButtonSection.tsx";
import {useTaskTreeMultiLevel} from "../../../hooks/useTaskTreeMultiLevel.ts";
import {useProjectStore} from "../../../stores/project.store.ts";
import LoadingSpin from "../../ui/LoadingSpin.tsx";
import type {Section} from "../../../types/section.type.ts";
import {useExpanded} from "../../../hooks/useExpanded.ts";
import MyTaskListSectionHeader from "./MyTaskListSectionHeader.tsx";
import MyTaskListSectionFooter from "./MyTaskListSectionFooter.tsx";
import {useSectionStore} from "../../../stores/section.store.ts";
import AddMyTaskSectionComponent from "../AddMyTaskSectionComponent";
import EditMyTaskSectionComponent from "../EditMyTaskSectionComponent";
import {useTaskStore} from "../../../stores/task.store.ts";
import {type MouseEvent} from "react";

type MyTaskSectionProps = {
    section: Section
}
const MyTaskListSection = ({section}: MyTaskSectionProps) => {
    const {data: tasks, isLoading} = useGetAllTasks()
    const projectId = useProjectStore(state => state.projectId)
    const {isExpanded, handleExpanded} = useExpanded(true)
    const taskTree = useTaskTreeMultiLevel(tasks?.results, projectId, section.id)
    const {editingSectionId, onOpenEditSection, onCloseEditSection, addSectionId, onOpenAddSectionForm, onCloseAddSectionForm} = useSectionStore()
    const {addingTaskId, onOpenAddMyTask, onCloseAddMyTask, openTaskDetailToolbar, onOpenTaskDetailToolbar, onCloseTaskDetailToolbar} = useTaskStore()
    const filteredTasks = useMemo(() => {
        return tasks?.results.filter(task => task.project_id === projectId && task.section_id === section.id)
    }, [projectId, section.id, tasks?.results])

    const isSectionAdding = addSectionId === section.id
    const isEditing = editingSectionId === section.id
    const isAddingTask = addingTaskId === section.id;
    const handleOpenTaskDetailToolbar = (id: string, e: MouseEvent<HTMLButtonElement>)=> {
        e.stopPropagation();
        onOpenTaskDetailToolbar(id)
    }

    if (isLoading) {
        return (
            <div className={"mt-medium"}>
                <LoadingSpin />
            </div>
        );
    }
    return (
        <section className={"pb-4.5"}>
            {section.id !== null &&
                <div className={"border-b border-b-product-library-divider-primary relative"}>
                    {/*click to edit section here*/}
                    {isEditing ? (<EditMyTaskSectionComponent onCancelEditMyTaskSection={onCloseEditSection} section={section}/>) : (
                        <MyTaskListSectionHeader onOpenEditMyTaskSection={() => onOpenEditSection(section.id)} isExpanded={isExpanded} onExpanded={handleExpanded} name={section.name} tasks={filteredTasks}/>
                        )}
                </div>
            }

            {isExpanded && (
                <ul className={"mt-1.25 flex flex-col flex-wrap"}>
                    {taskTree.map(taskNode => (
                        <Fragment key={taskNode.task.id}>
                            <MyTaskListItem taskNode={taskNode} level={0} isOpenTaskDetailToolbar={openTaskDetailToolbar === taskNode.task.id} onOpenTaskDetailToolbar={(e) => {
                                handleOpenTaskDetailToolbar(taskNode.task.id, e)
                            }} onCloseTaskDetailToolbar={onCloseTaskDetailToolbar}/>
                        </Fragment>
                    ))}
                    {isAddingTask ? (
                        <li>
                            <AddMyTaskModalDialog variant={"list"} onCloseAddMyTask={onCloseAddMyTask}/>
                        </li>
                    ) : (
                        <li className={"pr-5 pl-px"}>
                        <AddMyTaskButtonSection onOpenAddMyTask={() => onOpenAddMyTask(section.id)}/>
                    </li>
                    )}
                </ul>
            )}
            {isSectionAdding ? (
                <AddMyTaskSectionComponent onCancelAddMyTaskSection={onCloseAddSectionForm}/>
            ) : (
                <MyTaskListSectionFooter onAddMyTaskSectionForm={() => onOpenAddSectionForm(section.id)}/>
            )}
        </section>

    );
};

export default MyTaskListSection;
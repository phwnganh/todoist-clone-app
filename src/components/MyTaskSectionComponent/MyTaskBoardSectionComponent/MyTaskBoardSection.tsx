import {useGetAllTasks} from "../../../hooks/useQueryHook/useTasks.ts";
import {useProjectStore} from "../../../stores/project.store.ts";
import {useSectionStore} from "../../../stores/section.store.ts";
import {useTaskStore} from "../../../stores/task.store.ts";
import type {Section} from "../../../types/section.type.ts";
import {Fragment, useMemo} from "react";
import LoadingSpin from "../../ui/LoadingSpin.tsx";
import EditMyTaskSectionComponent from "../EditMyTaskSectionComponent";
import MyTaskBoardSectionHeader from "./MyTaskBoardSectionHeader.tsx";
import MyTaskBoardItem from "../../MyTasksComponent/MyTaskBoardItem.tsx";
import AddMyTaskModalDialog from "../../MyTasksComponent/AddMyTaskComponent";
import AddMyTaskButtonSection from "../../MyTasksComponent/AddMyTaskButtonSection.tsx";
type MyTaskBoardSectionProps = {
    section: Section
}
const MyTaskBoardSection = ({section}: MyTaskBoardSectionProps) => {
    const {data: tasks, isLoading} = useGetAllTasks()
    const projectId = useProjectStore(state => state.projectId)
    const {editingSectionId, onOpenEditSection, onCloseEditSection} = useSectionStore()
    const {addingTaskId, onOpenAddMyTask, onCloseAddMyTask} = useTaskStore()

    const filteredTasksNoParent = useMemo(() => {
        return tasks?.results.filter(task => task.project_id === projectId && task.section_id === section.id && task.parent_id === null)
    }, [projectId, section.id, tasks?.results])

    const isEditing = editingSectionId === section.id
    const isAddingTask = addingTaskId === section.id
    if (isLoading) {
        return (
            <div className={"mt-medium"}>
                <LoadingSpin />
            </div>
        );
    }
    return (
        <div className={"relative mr-2"}>
            <div className={"rounded-large outline outline-transparent hover:outline-border-hover py-2 px-4 shrink-0 w-70 flex flex-col gap-small"}>
                {section.id !== null ? <div className={"relative"}>
                    {/*click to edit section here*/}
                    {isEditing ? (<EditMyTaskSectionComponent onCancelEditMyTaskSection={onCloseEditSection} section={section}/>) : (
                        <MyTaskBoardSectionHeader onOpenEditMyTaskSection={() => onOpenEditSection(section.id)} name={section.name} tasks={filteredTasksNoParent}/>
                    )}
                </div> : (<div className={"flex items-center"}>
                    <div role={"button"} className={"font-bold text-sm pt-1.5 pr-1.5 pb-1.25"}>{section.name}</div>
                    <span className={"text-sm text-product-library-display-secondary-idle-tint"}>{filteredTasksNoParent?.length}</span>
                </div>)}

                {filteredTasksNoParent?.map(task => {
                    return (
                        <Fragment key={task.id}>
                            <MyTaskBoardItem task={task}/>
                        </Fragment>
                    )
                })}

                {isAddingTask ? (
                    <AddMyTaskModalDialog onCloseAddMyTask={onCloseAddMyTask}/>
                ) : (
                    <AddMyTaskButtonSection onOpenAddMyTask={() => onOpenAddMyTask(section.id)}/>
                )}
            </div>
        </div>
    );
};

export default MyTaskBoardSection;
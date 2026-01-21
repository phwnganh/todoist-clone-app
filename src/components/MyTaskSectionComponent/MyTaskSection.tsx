import {useGetAllTasks} from "../../hooks/useTasks.ts";
import {Fragment, useState} from "react";
import MyTaskListItem from "../MyTasksComponent/MyTaskListItem.tsx";
import AddMyTaskModalDialog from "../MyTasksComponent/AddMyTaskComponent";
import AddMyTaskButtonSection from "../MyTasksComponent/AddMyTaskButtonSection.tsx";
import {useTaskTreeMultiLevel} from "../../hooks/useTaskTreeMultiLevel.ts";
import {useProjectStore} from "../../stores/project.store.ts";
import LoadingSpin from "../ui/LoadingSpin.tsx";
import type {Section} from "../../types/section.type.ts";
import {useSectionExpand} from "../../hooks/useSectionExpand.ts";
import MyTaskSectionHeader from "./MyTaskSectionHeader.tsx";
import MyTaskSectionFooter from "./MyTaskSectionFooter.tsx";
import {useSectionStore} from "../../stores/section.store.ts";
import AddMyTaskSectionComponent from "./AddMyTaskSectionComponent";
import EditMyTaskSectionComponent from "./EditMyTaskSectionComponent";

type MyTaskSectionProps = {
    section: Section
}
const MyTaskSection = ({section}: MyTaskSectionProps) => {
    const {data: tasks, isLoading} = useGetAllTasks()
    const projectId = useProjectStore(state => state.projectId)
    const [openAddMyTask, setOpenAddMyTask] = useState(false);
    const {isExpanded, handleExpanded} = useSectionExpand(true)
    const taskTree = useTaskTreeMultiLevel(tasks?.results, projectId, section.id)
    const {editingSectionId, onOpenEditSection, onCloseEditSection} = useSectionStore()

    const filteredTasks = tasks?.results.filter(task => task.project_id === projectId && task.section_id === section.id)
    const handleOpenAddMyTask = () => {
        setOpenAddMyTask(true)
    }
    const {addSectionId, setAddSectionId} = useSectionStore()
    const handleCloseAddMyTask = () => {
        setOpenAddMyTask(false)
    }

    const handleOpenAddSectionForm = (id: string | null) => {
        setAddSectionId(id)
    }

    const handleCloseAddSectionForm = () => {
        setAddSectionId(undefined)
    }

    const isSectionAdding = addSectionId === section.id
    const isEditing = editingSectionId === section.id
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
                        <MyTaskSectionHeader onOpenEditMyTaskSection={() => onOpenEditSection(section.id)} isExpanded={isExpanded} onExpanded={handleExpanded} name={section.name} tasks={filteredTasks}/>
                        )}
                </div>
            }

            {isExpanded && (
                <ul className={"mt-1.25 flex flex-col flex-wrap"}>
                    {taskTree.map(taskNode => (
                        <Fragment key={taskNode.task.id}>
                            <MyTaskListItem taskNode={taskNode} level={0}/>
                        </Fragment>
                    ))}
                    {openAddMyTask ? (
                        <AddMyTaskModalDialog onCloseAddMyTask={handleCloseAddMyTask}/>
                    ) : (<AddMyTaskButtonSection onOpenAddMyTask={handleOpenAddMyTask}/>
                    )}
                </ul>
            )}
            {isSectionAdding ? (
                <AddMyTaskSectionComponent onCancelAddMyTaskSection={handleCloseAddSectionForm}/>
            ) : (
                <MyTaskSectionFooter onAddMyTaskForm={() => handleOpenAddSectionForm(section.id)}/>
            )}
        </section>

    );
};

export default MyTaskSection;
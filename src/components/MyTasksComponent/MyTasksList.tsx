import MyTaskListItem from "./MyTaskListItem.tsx";
import {useGetAllTasks} from "../../hooks/useTasks.ts";
import {Fragment, useState} from "react";
import AddMyTaskSection from "./AddMyTaskSection.tsx";
import LoadingSpin from "../ui/LoadingSpin.tsx";
import {useTaskTreeMultiLevel} from "../../hooks/useTaskTreeMultiLevel.ts";
import AddMyTaskModalDialog from "./AddMyTaskComponent";
import {useProjectStore} from "../../stores/project.store.ts";

const MyTasksList = () => {
    const {data: tasks, isLoading} = useGetAllTasks()
    const projectId = useProjectStore(state => state.projectId)
    const [openAddMyTask, setOpenAddMyTask] = useState(false);
    const taskTree = useTaskTreeMultiLevel(tasks?.results, projectId)
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
    return (
        <ul className={"mt-1.25 pb-21 flex flex-col flex-wrap"}>
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
    );
};

export default MyTasksList;
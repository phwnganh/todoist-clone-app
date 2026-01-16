import MyTaskListItem from "./MyTaskListItem.tsx";
import {useGetAllTasks} from "../../hooks/useTasks.ts";
import {Fragment} from "react";
import AddMyTaskSection from "./AddMyTaskSection.tsx";
import LoadingSpin from "../ui/LoadingSpin.tsx";
import {useTaskTreeMultiLevel} from "../../hooks/useTaskTreeMultiLevel.ts";

type MyTaskListProps = {
    projectId: string;
}
const MyTasksList = ({projectId}: MyTaskListProps) => {
    const {data: tasks, isLoading} = useGetAllTasks()
    const taskTree = useTaskTreeMultiLevel(tasks?.results, projectId)
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
            <AddMyTaskSection/>
        </ul>
    );
};

export default MyTasksList;
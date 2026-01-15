import MyTaskListItem from "./MyTaskListItem.tsx";
import {useGetAllTasks} from "../../hooks/useTasks.ts";
import {Fragment} from "react";
import AddMyTaskSection from "./AddMyTaskSection.tsx";
import LoadingSpin from "../ui/LoadingSpin.tsx";

type MyTaskListProps = {
    projectId: string;
}
const MyTasksList = ({projectId}: MyTaskListProps) => {
    const {data: tasks, isLoading} = useGetAllTasks()

    if (isLoading) {
        return (
            <div className={"mt-medium"}>
                <LoadingSpin />
            </div>
        );
    }
    const filteredTasks= tasks?.results.filter(task => task.project_id === projectId)
    return (
        <ul className={"mt-1.25 flex flex-col flex-wrap"}>
            {filteredTasks?.map(task => (
                <Fragment key={task.id}>
                    <MyTaskListItem task={task}/>
                </Fragment>
            ))}
            <AddMyTaskSection/>
        </ul>
    );
};

export default MyTasksList;
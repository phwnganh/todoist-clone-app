import type {Task} from "@/types/task.type.ts";
import MyTaskListItem from "@/components/MyTasksComponent/MyTaskListItem.tsx";
import type {Section} from "@/types/section.type.ts";
import LoadingSpin from "@/components/ui/LoadingSpin.tsx";
import type {Project} from "@/types/project.type.ts";
import EmptyList from "@/components/ui/EmptyList.tsx";

type MyTaskListLabelSectionProps = {
    tasks?: Task[]
    sections?: Section[]
    isLoading: boolean;
    isSortable?: boolean;
    isTasksLabelView?: boolean
    projects?: Project[]
}
const MyTaskListLabelSection = ({tasks, sections, isLoading, isSortable, isTasksLabelView, projects}: MyTaskListLabelSectionProps) => {
    if(isLoading){
        return <LoadingSpin/>
    }

    if(tasks?.length === 0){
        return <EmptyList/>
    }
    return (
        <ul className={"mt-1.25 flex flex-col flex-wrap"}>
            {tasks?.map(task =>
                <MyTaskListItem key={task.id} taskNode={{task, children: []}} level={0} sections={sections} isSortable={isSortable} isTasksLabelView={isTasksLabelView} projects={projects}/>)}
        </ul>
    );
};

export default MyTaskListLabelSection;
import type {TaskResponse} from "@/types/task.type.ts";
import MyTaskListItem from "@/components/MyTasksComponent/MyTaskListItem.tsx";
import type {SectionResponse} from "@/types/section.type.ts";
import LoadingSpin from "@/components/ui/LoadingSpin.tsx";
import type {ProjectResponse} from "@/types/project.type.ts";

type MyTaskListLabelSectionProps = {
    tasksData?: TaskResponse
    sectionsData?: SectionResponse
    isLoading: boolean;
    isSortable?: boolean;
    isTasksLabelView?: boolean
    projectsData?: ProjectResponse
}
const MyTaskListLabelSection = ({tasksData, sectionsData, isLoading, isSortable, isTasksLabelView, projectsData}: MyTaskListLabelSectionProps) => {
    if(isLoading){
        return <LoadingSpin/>
    }
    return (
        <ul className={"mt-1.25 flex flex-col flex-wrap"}>
            {tasksData?.results.map(task =>
            <MyTaskListItem key={task.id} taskNode={{task, children: []}} level={0} sections={sectionsData?.results} isSortable={isSortable} isTasksLabelView={isTasksLabelView} projectsData={projectsData}/>)}
        </ul>
    );
};

export default MyTaskListLabelSection;
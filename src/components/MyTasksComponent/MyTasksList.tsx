import MyTaskListSection from "../MyTaskSectionComponent/MyTaskListSectionComponent/MyTaskListSection.tsx";
import type { Section } from "@/types/section.type.ts";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import MyTaskListGroupSection from "./TasksGroupComponent/MyTaskListGroupSection.tsx";
import type { TaskGroup } from "@/types/viewOptions.type.ts";
type MyTasksListProps = {
  filteredSectionsByProject?: Section[];
  isGrouping: boolean;
  groupedTasks: TaskGroup[]
  noSection?: Section
};
const MyTasksList = ({ filteredSectionsByProject, isGrouping, groupedTasks, noSection }: MyTasksListProps) => {
  return (
    <>
        {isGrouping ?
            (
                groupedTasks.map((group, index) => <MyTaskListGroupSection key={index} title={group.title} tasks={group.tasks} sections={filteredSectionsByProject}/>)
            )
         : (
             <>
                <MyTaskListSection section={noSection}/>
                <SortableContext items={(filteredSectionsByProject ?? [])?.map(s => s.id!)} strategy={verticalListSortingStrategy}>
                    {filteredSectionsByProject?.map((section) => (
                        <MyTaskListSection key={section.id} section={section}/>
                    ))}
                </SortableContext>
            </>
            )}

    </>
  );
};

export default MyTasksList;

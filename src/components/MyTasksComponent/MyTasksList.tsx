import MyTaskListSection from "../MySectionComponent/MyTaskListSectionComponent/MyTaskListSection.tsx";
import type { Section } from "@/types/section.type.ts";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import MyTaskListGroupSection from "./TasksGroupComponent/MyTaskListGroupSection.tsx";
import type { TaskGroup } from "@/types/viewOptions.type.ts";
import type {Task} from "@/types/task.type.ts";
type MyTasksListProps = {
  filteredSectionsByProject?: Section[];
  isGrouping: boolean;
  groupedTasks: TaskGroup[]
  noSection?: Section
  tasks: Task[]
  isLoading: boolean;
};
const MyTasksList = ({ filteredSectionsByProject, isGrouping, groupedTasks, tasks, noSection, isLoading }: MyTasksListProps) => {
  return (
    <>
        {isGrouping ?
            (
                groupedTasks.map((group, index) => <MyTaskListGroupSection key={index} title={group.title} tasks={group.tasks} sections={filteredSectionsByProject}/>)
            )
         : (
             <>
                <MyTaskListSection section={noSection} tasks={tasks} isLoading={isLoading}/>
                <SortableContext items={(filteredSectionsByProject ?? [])?.map(s => s.id!)} strategy={verticalListSortingStrategy}>
                    {filteredSectionsByProject?.map((section) => (
                        <MyTaskListSection key={section.id} section={section} tasks={tasks} isLoading={isLoading}/>
                    ))}
                </SortableContext>
            </>
            )}

    </>
  );
};

export default MyTasksList;

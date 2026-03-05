import MyTaskListSection from "../MyTaskSectionComponent/MyTaskListSectionComponent/MyTaskListSection.tsx";
import { useProjectStore } from "../../stores/project.store.ts";
import type { Section } from "../../types/section.type.ts";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {queryClient} from "../../main.tsx";
import type {ViewOptionsPayload} from "../../types/viewOptions.type.ts";
import {useMemo} from "react";
import {useTasksWithView} from "../../hooks/useQueryHook/useViewOptions.ts";
import MyTaskGroupSection from "./TasksGroupComponent/MyTaskGroupSection.tsx";
type MyTasksListProps = {
  filteredSectionsByProject: Section[] | undefined;
};
const MyTasksList = ({ filteredSectionsByProject }: MyTasksListProps) => {
  const projectId = useProjectStore((state) => state.projectId);
    const { data: tasks } = useTasksWithView({project_id: projectId}, "PROJECT", projectId)

    const viewOptions = queryClient.getQueryData<ViewOptionsPayload>(["viewOptions", "PROJECT", projectId])
    const groupedBy = viewOptions?.grouped_by;
    const isGrouping = groupedBy !== null

    const groupedTasks = useMemo(() => {
        if(!isGrouping) return []
        return tasks?.grouped ?? []
    }, [isGrouping, tasks?.grouped])
  const NO_SECTION = {
    id: null,
    name: "(No section)",
    project_id: projectId,
  } as Section;

  return (
    <>
        {isGrouping ?
            (
                groupedTasks.map((group, index) => <MyTaskGroupSection key={index} title={group.title} tasks={group.tasks}/>)
            )
         : (
             <>
                <MyTaskListSection section={NO_SECTION}/>
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

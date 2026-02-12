import MyTaskListSection from "../MyTaskSectionComponent/MyTaskListSectionComponent/MyTaskListSection.tsx";
import { useProjectStore } from "../../stores/project.store.ts";
import type { Section } from "../../types/section.type.ts";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
type MyTasksListProps = {
  filteredSectionsByProject: Section[] | undefined;
};
const MyTasksList = ({ filteredSectionsByProject }: MyTasksListProps) => {
  const projectId = useProjectStore((state) => state.projectId);

  const NO_SECTION = {
    id: null,
    name: "(No section)",
    project_id: projectId,
  } as Section;

  return (
    <>
      <MyTaskListSection section={NO_SECTION} />
      <SortableContext items={(filteredSectionsByProject ?? [])?.map(s => s.id!)} strategy={verticalListSortingStrategy}>
      {filteredSectionsByProject?.map((section) => (
        <MyTaskListSection key={section.id} section={section} />
      ))}
      </SortableContext>
    </>
  );
};

export default MyTasksList;

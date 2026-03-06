import type { Section } from "../../types/section.type.ts";
import MyTaskBoardSection from "../MyTaskSectionComponent/MyTaskBoardSectionComponent/MyTaskBoardSection.tsx";
import { useProjectStore } from "../../stores/project.store.ts";
import {Fragment, useMemo, useState} from "react";
import AddMyTaskBoardSectionFinalButton from "../MyTaskSectionComponent/MyTaskBoardSectionComponent/AddMyTaskBoardSectionFinalButton.tsx";
import AddMyTaskSection from "../MyTaskSectionComponent/AddMyTaskSectionComponent";
import AddMyTaskBoardSectionSlot from "../MyTaskSectionComponent/MyTaskBoardSectionComponent/AddMyTaskBoardSectionSlot";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import {useGroupingTaskStore} from "../../stores/groupingTask.store.ts";
import {useTasksWithView} from "../../hooks/useQueryHook/useViewOptions.ts";
import MyTaskBoardGroupSection from "./TasksGroupComponent/MyTaskBoardGroupSection";

type MyTasksBoardProps = {
  filteredSectionsByProject: Section[] | undefined;
};
const MyTasksBoard = ({ filteredSectionsByProject }: MyTasksBoardProps) => {
  const projectId = useProjectStore((state) => state.projectId);
  const {groupedBy} = useGroupingTaskStore()
  const {data: tasks} = useTasksWithView({project_id: projectId}, "PROJECT", projectId)
  const isGrouping = groupedBy != null

  const groupedTasks = useMemo(() => {
    if(!isGrouping) return []
    return tasks?.grouped ?? []
  }, [isGrouping, tasks?.grouped])
  const NO_SECTION = {
    id: null,
    name: "(No section)",
    project_id: projectId,
  } as Section;

  const [
    openAddNewTaskSectionFormModalDialog,
    setOpenAddNewTaskSectionFormModalDialog,
  ] = useState(false);

  const handleOpenAddNewTaskSectionFormModalDialog = () => {
    setOpenAddNewTaskSectionFormModalDialog(true);
  };

  const handleCloseAddNewTaskSectionFormModalDialog = () => {
    setOpenAddNewTaskSectionFormModalDialog(false);
  };
  return (
    <section
      className={
        "flex items-start overflow-x-auto scrollbar-thin scrollbar-custom"
      }
    >
      {isGrouping ? (
          groupedTasks.map((group, index) => <MyTaskBoardGroupSection key={index} title={group.title} tasks={group.tasks} sections={filteredSectionsByProject}/>)
      ) : <>
        <MyTaskBoardSection section={NO_SECTION} />
        <AddMyTaskBoardSectionSlot addedSectionId={NO_SECTION.id} />
        <SortableContext items={(filteredSectionsByProject ?? []).map(s => s.id!)} strategy={horizontalListSortingStrategy}>
          {filteredSectionsByProject?.map((section) => {
            return (
                <Fragment key={section.id}>
                  <MyTaskBoardSection section={section} />
                  <AddMyTaskBoardSectionSlot addedSectionId={section.id} />
                </Fragment>
            );
          })}

        </SortableContext>
        {openAddNewTaskSectionFormModalDialog ? (
            <AddMyTaskSection
                onCancelAddMyTaskSection={handleCloseAddNewTaskSectionFormModalDialog}
            />
        ) : (
            <AddMyTaskBoardSectionFinalButton
                onOpenAddNewTaskSectionForm={
                  handleOpenAddNewTaskSectionFormModalDialog
                }
            />
        )}
      </>}

    </section>
  );
};

export default MyTasksBoard;

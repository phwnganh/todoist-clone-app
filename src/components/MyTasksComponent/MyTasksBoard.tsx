import type { Section } from "@/types/section.type.ts";
import MyTaskBoardSection from "../MyTaskSectionComponent/MyTaskBoardSectionComponent/MyTaskBoardSection.tsx";
import {Fragment, useState} from "react";
import AddMyTaskBoardSectionFinalButton from "../MyTaskSectionComponent/MyTaskBoardSectionComponent/AddMyTaskBoardSectionFinalButton.tsx";
import AddMyTaskSection from "../MyTaskSectionComponent/AddMyTaskSectionComponent";
import AddMyTaskBoardSectionSlot from "../MyTaskSectionComponent/MyTaskBoardSectionComponent/AddMyTaskBoardSectionSlot";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import MyTaskBoardGroupSection from "./TasksGroupComponent/MyTaskBoardGroupSection";
import type {TaskGroup} from "@/types/viewOptions.type.ts";

type MyTasksBoardProps = {
  filteredSectionsByProject: Section[] | undefined;
  isGrouping: boolean;
  groupedTasks: TaskGroup[];
  noSection?: Section;
};
const MyTasksBoard = ({ filteredSectionsByProject, isGrouping, groupedTasks, noSection }: MyTasksBoardProps) => {

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
        <MyTaskBoardSection section={noSection} />
        <AddMyTaskBoardSectionSlot addedSectionId={noSection?.id} />
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

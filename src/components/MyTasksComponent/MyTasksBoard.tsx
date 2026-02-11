import type { Section } from "../../types/section.type.ts";
import MyTaskBoardSection from "../MyTaskSectionComponent/MyTaskBoardSectionComponent/MyTaskBoardSection.tsx";
import { useProjectStore } from "../../stores/project.store.ts";
import { Fragment, useState } from "react";
import AddMyTaskBoardSectionFinalButton from "../MyTaskSectionComponent/MyTaskBoardSectionComponent/AddMyTaskBoardSectionFinalButton.tsx";
import AddMyTaskSection from "../MyTaskSectionComponent/AddMyTaskSectionComponent";
import AddMyTaskBoardSectionSlot from "../MyTaskSectionComponent/MyTaskBoardSectionComponent/AddMyTaskBoardSectionSlot";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";

type MyTasksBoardProps = {
  filteredSectionsByProject: Section[] | undefined;
};
const MyTasksBoard = ({ filteredSectionsByProject }: MyTasksBoardProps) => {
  const projectId = useProjectStore((state) => state.projectId);

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
    </section>
  );
};

export default MyTasksBoard;

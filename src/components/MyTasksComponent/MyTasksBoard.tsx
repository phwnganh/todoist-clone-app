import type { Section } from "@/types/section.type.ts";
import MyTaskBoardSection from "../MySectionComponent/MyTaskBoardSectionComponent/MyTaskBoardSection.tsx";
import {Fragment} from "react";
import AddMyTaskBoardSectionFinalButton from "../MySectionComponent/MyTaskBoardSectionComponent/AddMyTaskBoardSectionFinalButton.tsx";
import AddMyTaskSection from "../MySectionComponent/AddMySectionComponent/AddMySection.tsx";
import AddMyTaskBoardSectionSlot from "../MySectionComponent/MyTaskBoardSectionComponent/AddMyTaskBoardSectionSlot";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import MyTaskBoardGroupSection from "./TasksGroupComponent/MyTaskBoardGroupSection";
import type {TaskGroup} from "@/types/viewOptions.type.ts";
import type {Task} from "@/types/task.type.ts";
import { useSectionStore } from "@/stores/section.store.ts";

type MyTasksBoardProps = {
  filteredSectionsByProject: Section[] | undefined;
  isGrouping: boolean;
  groupedTasks: TaskGroup[];
  noSection?: Section;
  tasks: Task[]
  isLoading: boolean;
};
const MyTasksBoard = ({ filteredSectionsByProject, isGrouping, groupedTasks, tasks, noSection, isLoading }: MyTasksBoardProps) => {
  const {addFinalSectionId} = useSectionStore()
  const hasNoSectionTasks = tasks.some(task => task.section_id === null && task.parent_id === null)
  return (
    <section
      className={
        "flex items-start overflow-x-auto scrollbar-thin scrollbar-custom"
      }
    >
      {isGrouping ? (
          groupedTasks.map((group, index) => <MyTaskBoardGroupSection key={index} title={group.title} tasks={group.tasks} sections={filteredSectionsByProject}/>)
      ) : <>
        {hasNoSectionTasks && (
            <>
              <MyTaskBoardSection section={noSection} tasks={tasks} isLoading={isLoading}/>
              <AddMyTaskBoardSectionSlot sectionId={noSection?.id} />
            </>
        )}
        <SortableContext items={(filteredSectionsByProject ?? []).map(s => s.id!)} strategy={horizontalListSortingStrategy}>
          {filteredSectionsByProject?.map((section) => {
            return (
                <Fragment key={section.id}>
                  <MyTaskBoardSection section={section} tasks={tasks} isLoading={isLoading}/>
                  <AddMyTaskBoardSectionSlot sectionId={section.id} />
                </Fragment>
            );
          })}

        </SortableContext>
        {addFinalSectionId ? (
            <AddMyTaskSection
            />
        ) : (
            <AddMyTaskBoardSectionFinalButton/>
        )}
      </>}

    </section>
  );
};

export default MyTasksBoard;

import { useGetAllTasks } from "../../../hooks/useQueryHook/useTasks.ts";
import { Fragment, useMemo } from "react";
import MyTaskListItem from "../../MyTasksComponent/MyTaskListItem.tsx";
import AddMyTaskModalDialog from "../../MyTasksComponent/AddMyTaskComponent";
import AddMyTaskButtonSection from "../../MyTasksComponent/AddMyTaskButtonSection.tsx";
import { useTaskTreeMultiLevel } from "../../../hooks/useTaskTreeMultiLevel.ts";
import { useProjectStore } from "../../../stores/project.store.ts";
import LoadingSpin from "../../ui/LoadingSpin.tsx";
import type { Section } from "../../../types/section.type.ts";
import { useExpanded } from "../../../hooks/useExpanded.ts";
import MyTaskListSectionHeader from "./MyTaskListSectionHeader.tsx";
import MyTaskListSectionFooter from "./MyTaskListSectionFooter.tsx";
import { useSectionStore } from "../../../stores/section.store.ts";
import AddMyTaskSectionComponent from "../AddMyTaskSectionComponent";
import EditMyTaskSectionComponent from "../EditMyTaskSectionComponent";
import { useTaskStore } from "../../../stores/task.store.ts";
import { type MouseEvent } from "react";
import {SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import DragDropIcon from "../../icons/DragDropIcon.tsx";

type MyTaskSectionProps = {
  section: Section;
};
const MyTaskListSection = ({ section }: MyTaskSectionProps) => {
  const projectId = useProjectStore((state) => state.projectId);
  const { data: tasks, isLoading } = useGetAllTasks({project_id: projectId});
  const { isExpanded, handleExpanded } = useExpanded(true);
  const taskTree = useTaskTreeMultiLevel(tasks?.results, section.id);
  const {
    editingSectionId,
    onOpenEditSection,
    onCloseEditSection,
    addSectionId,
    onOpenAddSectionForm,
    onCloseAddSectionForm,
  } = useSectionStore();
  const {
    addingTaskId,
    onOpenAddMyTask,
    onCloseAddMyTask,
    openTaskDetailToolbar,
    onOpenTaskDetailToolbar,
    onCloseTaskDetailToolbar,
  } = useTaskStore();
  const filteredTasks = useMemo(() => {
    return tasks?.results.filter(
      (task) => task.section_id === section.id,
    );
  }, [section.id, tasks?.results]);

  const {setNodeRef, attributes, listeners} = useSortable({id: section.id ?? "", data: {
    type: "section"
    }})
  const isSectionAdding = addSectionId === section.id;
  const isEditing = editingSectionId === section.id;
  const isAddingTask = addingTaskId === section.id;
  const handleOpenTaskDetailToolbar = (
    id: string,
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    onOpenTaskDetailToolbar(id);
  };

  if (isLoading) {
    return (
      <div className={"mt-medium"}>
        <LoadingSpin />
      </div>
    );
  }
  return (
    <section className={"pb-4.5 px-3 lg:px-0"}>
      {section.id !== null && (
          <div className={`flex items-center gap-5`} ref={setNodeRef}>
            <button type={"button"} className={`flex justify-center items-center cursor-grab active:cursor-grabbing ${!isEditing ? "visible w-6 h-6" : "invisible"}`} {...attributes} {...listeners}>
              <DragDropIcon/>
            </button>
            <div
                className={
                  "border-b border-b-product-library-divider-primary relative w-full"
                }
            >
              {/*click to edit section here*/}
              {isEditing ? (
                <>
                
                  <EditMyTaskSectionComponent
                      onCancelEditMyTaskSection={onCloseEditSection}
                      section={section}
                  /></>

              ) : (
                  <MyTaskListSectionHeader
                      onOpenEditMyTaskSection={() => onOpenEditSection(section.id)}
                      isExpanded={isExpanded}
                      onExpanded={handleExpanded}
                      section={section}
                      tasks={filteredTasks}
                  />
              )}
            </div>
          </div>

      )}

      {isExpanded && (
        <ul className={"mt-1.25 flex flex-col flex-wrap"}>
          <SortableContext items={taskTree.map(node => node.task.id)} strategy={verticalListSortingStrategy}>
            {taskTree.map((taskNode) => (
                <Fragment key={taskNode.task.id}>
                  <MyTaskListItem
                      taskNode={taskNode}
                      level={0}
                      isOpenTaskDetailToolbar={
                          openTaskDetailToolbar === taskNode.task.id
                      }
                      onOpenTaskDetailToolbar={(e) => {
                        handleOpenTaskDetailToolbar(taskNode.task.id, e);
                      }}
                      onCloseTaskDetailToolbar={onCloseTaskDetailToolbar}
                  />
                </Fragment>
            ))}
          </SortableContext>
          <li>
            {isAddingTask ? (
                <AddMyTaskModalDialog
                    variant={"list"}
                    onCloseAddMyTask={onCloseAddMyTask}
                />
            ) : (
                <AddMyTaskButtonSection
                    taskType={"task"}
                    onOpenAddMyTask={() => onOpenAddMyTask(section.id)}
                />
            )}

            {isSectionAdding ? (
                <AddMyTaskSectionComponent
                    onCancelAddMyTaskSection={onCloseAddSectionForm}
                />

            ) : (
                <MyTaskListSectionFooter
                    onAddMyTaskSectionForm={() => onOpenAddSectionForm(section.id)}
                />
            )}

          </li>

        </ul>
      )}

    </section>
  );
};

export default MyTaskListSection;

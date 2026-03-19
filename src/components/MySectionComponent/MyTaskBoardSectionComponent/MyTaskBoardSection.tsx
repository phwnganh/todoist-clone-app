import { useSectionStore } from "@/stores/section.store.ts";
import { useTaskStore } from "@/stores/task.store.ts";
import type { Section } from "@/types/section.type.ts";
import { Fragment, useMemo, type MouseEvent } from "react";
import EditMySection from "@/components/MyTaskSectionComponent/EditMySectionComponent";
import MyTaskBoardSectionHeader from "./MyTaskBoardSectionHeader.tsx";
import MyTaskBoardItem from "../../MyTasksComponent/MyTaskBoardItem.tsx";
import AddMyTaskModalDialog from "../../MyTasksComponent/AddMyTaskComponent";
import AddMyTaskButtonSection from "../../MyTasksComponent/AddMyTaskButtonSection.tsx";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import DragDropIcon from "@/components/icons/DragDropIcon.tsx";
import {CSS} from "@dnd-kit/utilities";
import type {Task} from "@/types/task.type.ts";
import LoadingSpin from "@/components/ui/LoadingSpin.tsx";
type MyTaskBoardSectionProps = {
  section?: Section;
  tasks: Task[];
  isLoading: boolean;
};
const MyTaskBoardSection = ({ section, tasks, isLoading }: MyTaskBoardSectionProps) => {
  const { editingSectionId, onOpenEditSection, onCloseEditSection } =
    useSectionStore();
  const {
    addingTaskId,
    onOpenAddMyTask,
    onCloseAddMyTask,
    openTaskDetailToolbar,
    onOpenTaskDetailToolbar,
  } = useTaskStore();

  const filteredTasksNoParent = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.section_id === section?.id &&
        task.parent_id === null,
    );
  }, [section?.id, tasks]);

  const {setNodeRef, attributes, listeners, transition, transform} = useSortable({id: section?.id ?? "", data: {
    type: "section"
    }})
  const isEditing = editingSectionId === section?.id;
  const isAddingTask = addingTaskId === section?.id;
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

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
    <div className={"relative mr-2"}>
      <div
        className={
          "rounded-large ring ring-transparent hover:ring-border-hover py-2 px-4 shrink-0 w-70 flex flex-col gap-small"
        }
      >
        {section?.id !== null ? (
          <div className={"relative flex items-center"} ref={setNodeRef} style={style}>
            <button type={"button"} className={`flex justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill rounded-small ${!isEditing ? "w-6 h-6 visible" : "invisible"}`} {...attributes} {...listeners}>
              <DragDropIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
            </button>
            {/*click to edit section here*/}
            {isEditing ? (
              <EditMySection
                onCancelEditMyTaskSection={onCloseEditSection}
                section={section}
              />
            ) : (
              <MyTaskBoardSectionHeader
                onOpenEditMyTaskSection={() => onOpenEditSection(section?.id)}
                section={section}
                tasks={filteredTasksNoParent}
              />
            )}
          </div>
        ) : (
          <div className={"flex items-center"}>
            <div
              role={"button"}
              className={"font-bold text-sm pt-1.5 pr-1.5 pb-1.25"}
            >
              {section.name}
            </div>
            <span
              className={
                "text-sm text-product-library-display-secondary-idle-tint"
              }
            >
              {filteredTasksNoParent?.length}
            </span>
          </div>
        )}
        <SortableContext items={(filteredTasksNoParent ?? [])?.map(t => t.id)}>
          {filteredTasksNoParent?.map((task) => {
            return (
                <Fragment key={task.id}>
                  <MyTaskBoardItem
                      task={task}
                      isOpenTaskDetailToolbar={openTaskDetailToolbar === task.id}
                      onOpenTaskDetailToolbar={(e) => {
                        handleOpenTaskDetailToolbar(task.id, e);
                      }}
                      tasks={tasks || []}
                  />
                </Fragment>
            );
          })}
        </SortableContext>


        {isAddingTask ? (
          <AddMyTaskModalDialog
            variant={"board"}
            onCloseAddMyTask={onCloseAddMyTask}
          />
        ) : (
          <AddMyTaskButtonSection
              taskType={"task"}
            onOpenAddMyTask={() => onOpenAddMyTask(section?.id)}
          />
        )}
      </div>
    </div>
  );
};

export default MyTaskBoardSection;

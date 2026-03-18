import { Fragment, useMemo } from "react";
import MyTaskListItem from "../../MyTasksComponent/MyTaskListItem.tsx";
import AddMyTaskModalDialog from "../../MyTasksComponent/AddMyTaskComponent";
import AddMyTaskButtonSection from "../../MyTasksComponent/AddMyTaskButtonSection.tsx";
import {useTaskTreeMultiLevel} from "@/hooks/useTaskTreeMultiLevel.ts";
import type { Section } from "@/types/section.type.ts";
import { useExpanded } from "@/hooks/useExpanded.ts";
import MyTaskListSectionHeader from "./MyTaskListSectionHeader.tsx";
import MyTaskListSectionFooter from "./MyTaskListSectionFooter.tsx";
import { useSectionStore } from "@/stores/section.store.ts";
import AddMyTaskSectionComponent from "../AddMyTaskSectionComponent";
import EditMyTaskSectionComponent from "../EditMyTaskSectionComponent";
import { useTaskStore } from "@/stores/task.store.ts";
import {SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import DragDropIcon from "@/components/icons/DragDropIcon.tsx";
import {CSS} from '@dnd-kit/utilities'
import type {Task} from "@/types/task.type.ts";
import LoadingSpin from "@/components/ui/LoadingSpin.tsx";
type MyTaskSectionProps = {
  section?: Section;
  tasks: Task[];
  isLoading: boolean;
};
const MyTaskListSection = ({ section, tasks, isLoading }: MyTaskSectionProps) => {
  const { isExpanded, handleExpanded } = useExpanded(true);
  const taskTree = useTaskTreeMultiLevel(tasks, section?.id);
  const {
    editingSectionId,
    onOpenEditSection,
    onCloseEditSection,
    addSectionId,
    onOpenAddSectionForm,
  } = useSectionStore();
  const {
    addingTaskId,
    onOpenAddMyTask,
    onCloseAddMyTask,
  } = useTaskStore();
  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) => task.section_id === section?.id,
    );
  }, [section?.id, tasks]);

  const {setNodeRef, attributes, listeners, transform, transition} = useSortable({id: section?.id ?? "", data: {
    type: "section"
    }})
  const isSectionAdding = addSectionId === section?.id;
  const isEditing = editingSectionId === section?.id;
  const isAddingTask = addingTaskId === section?.id;

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isLoading) {
    return (
      <div className={"mt-medium"}>
        <LoadingSpin />
      </div>
    );
  }
  return (
    <section className={"pb-4.5 px-3 lg:px-0"}>
      {section?.id !== null && (
          <div className={`flex items-center gap-5`} ref={setNodeRef} style={style}>
            <button type={"button"} className={`flex justify-center items-center cursor-grab active:cursor-grabbing hover:bg-product-library-selectable-secondary-hover-fill rounded-small ${!isEditing ? "visible w-6 h-6" : "invisible"}`} {...attributes} {...listeners}>
              <DragDropIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
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
                      onOpenEditMyTaskSection={() => onOpenEditSection(section?.id)}
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
          <SortableContext items={taskTree.map(task => task.task.id)} strategy={verticalListSortingStrategy}>
            {taskTree.map((taskNode) => (
                <Fragment key={taskNode.task.id}>
                  <MyTaskListItem
                      taskNode={taskNode}
                      level={0}
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
                    onOpenAddMyTask={() => onOpenAddMyTask(section?.id)}
                />
            )}

            {isSectionAdding ? (
                <AddMyTaskSectionComponent
                />

            ) : (
                <MyTaskListSectionFooter
                    onAddMyTaskSectionForm={() => onOpenAddSectionForm(section?.id)}
                />
            )}

          </li>

        </ul>
      )}

    </section>
  );
};

export default MyTaskListSection;

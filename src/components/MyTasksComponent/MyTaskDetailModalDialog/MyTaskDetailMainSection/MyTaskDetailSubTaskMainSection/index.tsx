import TaskSmallArrowDownIcon from "@/components/icons/TaskSmallArrowDownIcon.tsx";

import AddMyTaskButtonSection from "../../../AddMyTaskButtonSection.tsx";
import { useTaskStore } from "@/stores/task.store.ts";
import type { Task } from "@/types/task.type.ts";
import { Fragment, useMemo } from "react";
import ChildrenTaskItem from "./ChildrenTaskItem.tsx";
import AddMyTaskDetailMainSubChildrenForm from "../AddMyTaskDetailMainSubChildrenForm";
import { useExpanded } from "@/hooks/useExpanded.ts";
import TaskSmallArrowRightIcon from "@/components/icons/TaskSmallArrowRightIcon.tsx";
import { type MouseEvent } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type MyTaskDetailSubTaskMainSectionProps = {
  taskDetail?: Task | null;
  tasks: Task[] | undefined;
};
const MyTaskDetailSubTaskMainSection = ({
  taskDetail,
  tasks,
}: MyTaskDetailSubTaskMainSectionProps) => {
  const {
    onOpenAddSubTask,
    addingSubTaskId,
    onCloseAddSubTask,
    openSubTaskDetailToolbar,
    onOpenSubTaskDetailToolbar,
  } = useTaskStore();
  const isTaskAdding = addingSubTaskId === taskDetail?.id;
  const { isExpanded, handleExpanded } = useExpanded(true);
  const childrenTasks = useMemo(() => {
    return tasks?.filter((t) => t.parent_id === taskDetail?.id);
  }, [tasks, taskDetail?.id]);
  if (!childrenTasks) return null;
  const handleOpenSubTaskDetailToolbar = (
    id: string,
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    onOpenSubTaskDetailToolbar(id);
  };

  const completedChildrenLength = childrenTasks.filter(
    (task) => task.checked || task.completed_at,
  ).length;
  return (
    <>
      <div className={"flex items-center gap-1.5 px-3"}>
        <button
          type={"button"}
          onClick={handleExpanded}
          className={"flex justify-center items-center w-6 h-6"}
        >
          {isExpanded ? (
            <TaskSmallArrowDownIcon />
          ) : (
            <TaskSmallArrowRightIcon />
          )}
        </button>

        <p className={"text-sm font-medium"}>Sub-tasks</p>
        <p
          className={"text-sm text-product-library-display-secondary-idle-tint"}
        >
          {completedChildrenLength}/{childrenTasks?.length}
        </p>
      </div>
      <hr className={"border-t border-product-library-divider-tertiary"} />
      {isExpanded && (
        <SortableContext
          items={childrenTasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {childrenTasks?.map((children) => {
            const subChildren = tasks?.filter(
              (t) => t.parent_id === children.id,
            );
            const subSubChildren = subChildren?.filter(
              (child) => child.parent_id === children.id,
            );
            if (!subChildren || !subSubChildren) return null;
            const hasSubChildren = subSubChildren.length > 0;

            return (
              <Fragment key={children.id}>
                <ChildrenTaskItem
                  hasSubChildren={hasSubChildren}
                  childrenTask={children}
                  subChildren={subChildren}
                  onOpenSubTaskDetailToolbar={(e) => {
                    handleOpenSubTaskDetailToolbar(children.id, e);
                  }}
                  isOpenSubTaskDetailToolbar={
                    openSubTaskDetailToolbar === children.id
                  }
                />
              </Fragment>
            );
          })}
          <hr className={"border-t border-product-library-divider-tertiary"} />
          <div className={"pl-4"}>
            {isTaskAdding ? (
              <AddMyTaskDetailMainSubChildrenForm
                onCloseAddMySubTask={onCloseAddSubTask}
              />
            ) : (
              <AddMyTaskButtonSection
                taskType={"sub-task"}
                onOpenAddMyTask={() =>
                  onOpenAddSubTask(taskDetail?.id as string)
                }
              />
            )}
          </div>
        </SortableContext>
      )}
    </>
  );
};

export default MyTaskDetailSubTaskMainSection;

import TaskSmallArrowDownIcon from "../../../../icons/TaskSmallArrowDownIcon.tsx";

import AddMyTaskButtonSection from "../../../AddMyTaskButtonSection.tsx";
import { useTaskStore } from "../../../../../stores/task.store.ts";
import AddMyTaskModalDialog from "../../../AddMyTaskComponent";
import type { Task } from "../../../../../types/task.type.ts";
import { Fragment, useMemo } from "react";
import ChildrenTaskItem from "./ChildrenTaskItem.tsx";

type MyTaskDetailSubTaskMainSectionProps = {
  taskDetail: Task | null;
  tasks: Task[] | undefined;
};
const MyTaskDetailSubTaskMainSection = ({
  taskDetail,
  tasks,
}: MyTaskDetailSubTaskMainSectionProps) => {
  const { onOpenAddMyTask, addingTaskId, onCloseAddMyTask } = useTaskStore();
  const isTaskAdding = addingTaskId === taskDetail?.id;

  const childrenTasks = useMemo(() => {
    return tasks?.filter((t) => t.parent_id === taskDetail?.id);
  }, [tasks, taskDetail?.id]);

  if (!childrenTasks) return null;

  return (
    <>
      <div className={"flex items-center gap-1.5 px-3"}>
        <div className={"flex justify-center items-center w-6 h-6"}>
          <TaskSmallArrowDownIcon />
        </div>
        <p className={"text-sm font-medium"}>Sub-tasks</p>
        <p
          className={"text-sm text-product-library-display-secondary-idle-tint"}
        >
          0/{childrenTasks?.length}
        </p>
      </div>
      <hr className={"border-t border-product-library-divider-tertiary"} />
      {childrenTasks?.map((children) => {
        const subChildren = tasks?.filter((t) => t.parent_id === children.id);
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
            />
          </Fragment>
        );
      })}
      <hr className={"border-t border-product-library-divider-tertiary"} />
      <div className={"px-2"}>
        {isTaskAdding ? (
          <AddMyTaskModalDialog
            variant={"list"}
            onCloseAddMyTask={onCloseAddMyTask}
          />
        ) : (
          <AddMyTaskButtonSection
            taskType={"sub-task"}
            onOpenAddMyTask={() => onOpenAddMyTask(taskDetail?.id as string)}
          />
        )}
      </div>
    </>
  );
};

export default MyTaskDetailSubTaskMainSection;

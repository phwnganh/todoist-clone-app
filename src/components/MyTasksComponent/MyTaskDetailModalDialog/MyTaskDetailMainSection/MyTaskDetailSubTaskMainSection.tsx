import TaskSmallArrowDownIcon from "../../../icons/TaskSmallArrowDownIcon.tsx";
import VerifiedIcon from "../../../icons/VerifiedIcon.tsx";
import ChildrenIcon from "../../../../assets/children-icon.svg";
import AddMyTaskButtonSection from "../../AddMyTaskButtonSection.tsx";
import { useTaskStore } from "../../../../stores/task.store.ts";
import AddMyTaskModalDialog from "../../AddMyTaskComponent";
import type { Task } from "../../../../types/task.type.ts";
import { Fragment, useMemo } from "react";

type MyTaskDetailSubTaskMainSectionProps = {
  taskId: string | null;
  tasks: Task[] | undefined;
};
const MyTaskDetailSubTaskMainSection = ({
  taskId,
  tasks,
}: MyTaskDetailSubTaskMainSectionProps) => {
  const { onOpenAddMyTask, addingTaskId, onCloseAddMyTask } = useTaskStore();
  const isTaskAdding = addingTaskId === taskId;

  const childrenTasks = useMemo(() => {
    return tasks?.filter((t) => t.parent_id === taskId);
  }, [tasks, taskId]);

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
            <div className={"flex items-start gap-1.5"}>
              <div
                className={"w-6 h-6 flex justify-center items-center shrink-0"}
              ></div>
              <button
                type={"button"}
                aria-checked={"false"}
                aria-label={"Mark task as complete"}
                className={"mr-1.5 -ml-0.75 relative group/check"}
              >
                <div
                  className={
                    "h-5 w-5 rounded-full border-2 border-product-library-priorities-p4-primary-idle-fill"
                  }
                ></div>
                <div
                  className={
                    "inset-0 absolute group-hover/check:flex justify-center items-center hidden"
                  }
                >
                  <VerifiedIcon
                    className={
                      "text-product-library-actionable-quaternary-idle-tint"
                    }
                  />
                </div>
              </button>
              <div className={"flex flex-col gap-1.5"}>
                <p className={"text-sm"}>{children.content}</p>
                <p
                  className={
                    "text-xs text-product-library-display-secondary-idle-tint line-clamp-1"
                  }
                >
                  {children.description}
                </p>
                {hasSubChildren && (
                  <div
                    className={
                      "flex gap-0.5 text-xs text-product-library-display-secondary-idle-tint"
                    }
                  >
                    <img src={ChildrenIcon} alt={"children-icon"} />
                    <span>0/{subChildren?.length}</span>
                  </div>
                )}
              </div>
            </div>
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
            onOpenAddMyTask={() => onOpenAddMyTask(taskId)}
          />
        )}
      </div>
    </>
  );
};

export default MyTaskDetailSubTaskMainSection;

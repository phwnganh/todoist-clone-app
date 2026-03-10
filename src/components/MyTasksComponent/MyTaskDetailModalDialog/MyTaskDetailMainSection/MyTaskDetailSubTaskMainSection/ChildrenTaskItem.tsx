import VerifiedIcon from "@/components/icons/VerifiedIcon.tsx";
import ChildrenIcon from "@/assets/children-icon.svg";
import type { Task } from "@/types/task.type.ts";
import EditIcon from "@/components/icons/EditIcon.tsx";
import DueDateIcon from "@/components/icons/DueDateIcon.tsx";
import CommentIcon from "@/components/icons/CommentIcon.tsx";
import MenuIcon from "@/components/icons/MenuIcon.tsx";
import { useTaskStore } from "@/stores/task.store.ts";
import EditMyTaskDetailMainSubChildrenForm from "../EditMyTaskDetailMainSubChildrenForm";
import type { MouseEvent } from "react";
import {
  PRIORITY_BORDER_CLASS_MAPPING,
  PRIORITY_VERIFIED_CLASS_MAPPING,
} from "@/constants/priority.constants";
import { useCompleteTask } from "@/hooks/useQueryHook/useTasks.ts";
import { getDueInfo } from "@/helpers/formateDate.ts";
import { DUE_COLOR_CLASS } from "@/constants/color.constants.ts";
import SmallCalendarIcon from "@/assets/small-calendar-icon.svg";
import LabelIcon from "@/assets/label-icon.svg";
import MyTasksToolbarDropdown from "../../../MyTasksToolbarDropdown.tsx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragDropIcon from "@/components/icons/DragDropIcon.tsx";
type ChildrenTaskItemProps = {
  hasSubChildren: boolean;
  childrenTask: Task;
  subChildren: Task[];
  onOpenSubTaskDetailToolbar: (e: MouseEvent<HTMLButtonElement>) => void;
  isOpenSubTaskDetailToolbar: boolean;
};
const ChildrenTaskItem = ({
  hasSubChildren,
  childrenTask,
  subChildren,
  onOpenSubTaskDetailToolbar,
  isOpenSubTaskDetailToolbar,
}: ChildrenTaskItemProps) => {
  const { editingTaskId, onOpenEditTask, onCloseEditTask } = useTaskStore();
  const isEditing = editingTaskId === childrenTask.id;
  const { mutate } = useCompleteTask();
  const handleCompleteTask = (taskId: string) => {
    mutate({
      taskId: taskId,
    });
  };
  const completedSubChildrenLength = subChildren.filter(
    (task) => task.checked || task.completed_at,
  ).length;
  const { category, label } = getDueInfo(childrenTask.due?.date);
  const { setNodeRef, attributes, listeners, transition, transform } =
    useSortable({
      id: childrenTask.id,
      data: {
        type: "subTask",
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <>
      {isEditing ? (
        <EditMyTaskDetailMainSubChildrenForm
          onCloseEditMySubTask={onCloseEditTask}
          taskDetail={childrenTask}
        />
      ) : (
        <div
          className={"flex items-start gap-3"}
          ref={setNodeRef}
          style={style}
        >
          <button
            type={"button"}
            className={
              "flex justify-center w-6 h-6 shrink-0 hover:bg-product-library-selectable-secondary-hover-fill rounded-small"
            }
            {...attributes}
            {...listeners}
          >
            <DragDropIcon />
          </button>
          <div
            className={
              "flex justify-between items-start w-full lg:items-center group"
            }
          >
            <div className={"flex items-start gap-1.5"}>
              <button
                type={"button"}
                onClick={() => handleCompleteTask(childrenTask.id)}
                aria-checked={"false"}
                aria-label={"Mark task as complete"}
                className={"mr-1.5 -ml-0.75 relative group/check"}
              >
                <div
                  className={`h-5 w-5 rounded-full border-2 ${PRIORITY_BORDER_CLASS_MAPPING[childrenTask?.priority]}`}
                ></div>
                <div
                  className={
                    "inset-0 absolute group-hover/check:flex justify-center items-center hidden"
                  }
                >
                  <VerifiedIcon
                    className={`${PRIORITY_VERIFIED_CLASS_MAPPING[childrenTask?.priority]} opacity-50`}
                  />
                </div>
              </button>
              <div className={"flex flex-col gap-1"}>
                <p className={"text-sm"}>{childrenTask.content}</p>
                <p
                  className={
                    "text-xs text-product-library-display-secondary-idle-tint line-clamp-1"
                  }
                >
                  {childrenTask.description}
                </p>
                <div className={"flex gap-large sm:gap-small items-center"}>
                  {hasSubChildren && (
                    <div
                      className={
                        "flex gap-0.5 text-xs text-product-library-display-secondary-idle-tint"
                      }
                    >
                      <img src={ChildrenIcon} alt={"children-icon"} />
                      <span>
                        {completedSubChildrenLength}/{subChildren?.length}
                      </span>
                    </div>
                  )}
                  {childrenTask.due && (
                    <button
                      type={"button"}
                      className={`flex gap-0.5 text-xs ${DUE_COLOR_CLASS[category]}`}
                    >
                      <img
                        src={SmallCalendarIcon}
                        alt={"small-calendar-icon"}
                      />
                      <span>{label}</span>
                    </button>
                  )}
                  {childrenTask.labels?.map((label) => (
                    <div
                      key={label}
                      className={
                        "flex gap-0.5 text-xs text-product-library-display-secondary-idle-tint"
                      }
                    >
                      <div
                        className={"w-4 h-4 flex justify-center items-center"}
                      >
                        <img src={LabelIcon} alt={"label-icon"} />
                      </div>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className={
                "flex pl-4 gap-small opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
              }
            >
              <button
                onClick={() => onOpenEditTask(childrenTask.id)}
                type={"button"}
                aria-label={"edit"}
                className={
                  "w-6 h-6 rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                }
              >
                <EditIcon />
              </button>
              <button
                type={"button"}
                aria-label={"due-date"}
                className={
                  "w-6 h-6 rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                }
              >
                <DueDateIcon />
              </button>
              <button
                type={"button"}
                aria-label={"comment"}
                className={
                  "w-6 h-6 rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                }
              >
                <CommentIcon />
              </button>
              <div className={"relative"}>
                <button
                  onClick={onOpenSubTaskDetailToolbar}
                  type={"button"}
                  aria-label={"menu"}
                  className={
                    "w-6 h-6 rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                  }
                >
                  <MenuIcon />
                </button>
                {isOpenSubTaskDetailToolbar && (
                  <div
                    className={"absolute right-9 z-50"}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MyTasksToolbarDropdown
                      taskId={childrenTask.id}
                      task={childrenTask}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChildrenTaskItem;

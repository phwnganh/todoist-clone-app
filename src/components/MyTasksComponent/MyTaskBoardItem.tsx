import type { Task } from "../../types/task.type.ts";
import VerifiedIcon from "../icons/VerifiedIcon.tsx";
import MyTaskContent from "./MyTaskContent.tsx";
import ChildrenIcon from "../../assets/children-icon.svg";
import SmallCalendarIcon from "../../assets/small-calendar-icon.svg";
import MenuIcon from "../icons/MenuIcon.tsx";
import { type MouseEvent, useMemo } from "react";
import MyTasksToolbarDropdown from "./MyTasksToolbarDropdown.tsx";
import { useTaskStore } from "../../stores/task.store.ts";
import EditMyTaskModalDialog from "./EditMyTaskComponent";
import DeleteMyTaskModalDialog from "./DeleteMyTaskComponent";
import {PRIORITY_BORDER_CLASS_MAPPING, PRIORITY_VERIFIED_CLASS_MAPPING} from "../../constants/priority.constants.ts";
import MyTaskDetailModalDialog from "./MyTaskDetailModalDialog";

type MyTaskBoardItemProps = {
  task: Task;
  isOpenTaskDetailToolbar: boolean;
  onOpenTaskDetailToolbar: (e: MouseEvent<HTMLButtonElement>) => void;
  tasks: Task[];
};
const MyTaskBoardItem = ({
  task,
  isOpenTaskDetailToolbar,
  onOpenTaskDetailToolbar,
  tasks,
}: MyTaskBoardItemProps) => {
  const { editingTaskId, onCloseEditTask, deleteTaskId, taskDetailId, onOpenTaskDetail, onCloseTaskDetail } = useTaskStore();
  const isEditing = editingTaskId === task.id;
  const isDeleting = deleteTaskId === task.id;
  const isOpeningTaskDetail = taskDetailId === task.id;
  const childrenTasks = useMemo(() => {
    return tasks.filter((t) => t.parent_id === task.id);
  }, [tasks, task.id]);
  return (
    <>
      {isEditing ? (
        <EditMyTaskModalDialog
          variant={"board"}
          task={task}
          onCloseEditMyTask={onCloseEditTask}
        />
      ) : (
        <div
          className={
            "flex items-start outline outline-border-idle hover:outline-border-hover shadow-sm rounded-large p-2.5 group relative"
          }
        >
          <button
            type={"button"}
            aria-checked={"false"}
            aria-label={"Mark task as complete"}
            className={"mt-2 mr-1.5 -ml-0.75 relative group/check"}
          >
            <div
              className={
                `h-5 w-5 rounded-full border-2 ${PRIORITY_BORDER_CLASS_MAPPING[task.priority]}`
              }
            ></div>
            <div
              className={
                "inset-0 absolute group-hover/check:flex justify-center items-center hidden"
              }
            >
              <VerifiedIcon
                className={
                  `${PRIORITY_VERIFIED_CLASS_MAPPING[task.priority]} opacity-50`
                }
              />
            </div>
          </button>

          <div role={"button"} className={"py-2 flex flex-col min-w-0 mr-3 cursor-pointer"} onClick={() => onOpenTaskDetail(task.id)}>
            <div className={"mb-0.75 text-sm"}>
              <MyTaskContent content={task.content} />
            </div>
            <p
              className={
                "text-xs mb-0.5 text-product-library-display-secondary-idle-tint line-clamp-1"
              }
            >
              {task.description}
            </p>
            <div className={"flex gap-small items-center"}>
              {childrenTasks.length > 0 && (
                <div
                  className={
                    "flex gap-0.5 text-xs text-product-library-display-secondary-idle-tint"
                  }
                >
                  <img src={ChildrenIcon} alt={"children-icon"} />
                  <span>0/{childrenTasks.length}</span>
                </div>
              )}

              <button
                type={"button"}
                className={
                  "flex gap-0.5 text-xs text-product-library-actionable-primary-idle-fill"
                }
              >
                <img src={SmallCalendarIcon} alt={"small-calendar-icon"} />
                <span>Tomorrow</span>
              </button>
            </div>
          </div>
          <button
            onClick={onOpenTaskDetailToolbar}
            type={"button"}
            aria-label={"menu"}
            className={
              "absolute right-2 top-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
            }
          >
            <MenuIcon />
          </button>
          {isOpenTaskDetailToolbar && (
            <div
              className={"absolute top-9 right-9 left-6 z-50"}
              onClick={(e) => e.stopPropagation()}
            >
              <MyTasksToolbarDropdown taskId={task.id} />
            </div>
          )}
        </div>
      )}
      {isDeleting && (
          <DeleteMyTaskModalDialog task={task}/>
      )}
      {isOpeningTaskDetail && (
          <MyTaskDetailModalDialog onCloseTaskDetail={onCloseTaskDetail}/>
      )}
    </>
  );
};

export default MyTaskBoardItem;

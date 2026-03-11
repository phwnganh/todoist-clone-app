import type { Task } from "@/types/task.type.ts";
import VerifiedIcon from "@/components/icons/VerifiedIcon.tsx";
import MyTaskContent from "./MyTaskContent.tsx";
import MenuIcon from "@/components/icons/MenuIcon.tsx";
import {type MouseEvent, useMemo, useRef} from "react";
import MyTasksToolbarDropdown from "./MyTasksToolbarDropdown.tsx";
import { useTaskStore } from "@/stores/task.store.ts";
import EditMyTaskModalDialog from "./EditMyTaskComponent";
import DeleteMyTaskModalDialog from "./DeleteMyTaskComponent";
import {PRIORITY_BORDER_CLASS_MAPPING, PRIORITY_VERIFIED_CLASS_MAPPING} from "@/constants/priority.constants.ts";
import MyTaskDetailModalDialog from "./MyTaskDetailModalDialog";
import MyTaskBoardLabelsPreview from "./MyTaskForm/MyTaskLabelsDropdown/MyTaskBoardLabelsPreview.tsx";
import {useCompleteTask} from "@/hooks/useQueryHook/useTasks.ts";
import {getDueInfo} from "@/helpers/formateDate.ts";
import {DUE_COLOR_CLASS} from "@/constants/color.constants.ts";
import {useSortable} from "@dnd-kit/sortable";
import DragDropIcon from "@/components/icons/DragDropIcon.tsx";
import {CSS} from "@dnd-kit/utilities";
import {useGroupingTaskStore} from "@/stores/groupingTask.store.ts";
import type {Section} from "@/types/section.type.ts";
import SmallCalendarIcon from "@/components/icons/SmallCalendarIcon.tsx";
import ChildrenIcon from "@/components/icons/ChildrenIcon.tsx";
import {useClickOutside} from "@/hooks/useClickOutside.ts";

type MyTaskBoardItemProps = {
  task: Task;
  isOpenTaskDetailToolbar: boolean;
  onOpenTaskDetailToolbar: (e: MouseEvent<HTMLButtonElement>) => void;
  tasks: Task[];
  sections?: Section[];
};
const MyTaskBoardItem = ({
  task,
  isOpenTaskDetailToolbar,
  onOpenTaskDetailToolbar,
  tasks,
    sections
}: MyTaskBoardItemProps) => {
  const { editingTaskId, onCloseEditTask, deleteTaskId, taskDetailId, onOpenTaskDetail, onCloseTaskDetail, onCloseTaskDetailToolbar, openTaskDetailToolbar } = useTaskStore();
  const {groupedBy} = useGroupingTaskStore()
  const isEditing = editingTaskId === task.id;
  const isDeleting = deleteTaskId === task.id;
  const isOpeningTaskDetail = taskDetailId === task.id;
  const isOpenTaskToolbar = openTaskDetailToolbar === task.id;
  const isGrouping = groupedBy != null
  const {category, label} = getDueInfo(task?.due?.date)
  const taskToolbarRef = useRef<HTMLDivElement>(null);
  const {setNodeRef, attributes, listeners, transition, transform} = useSortable({id: task.id})
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }
  const {mutate} = useCompleteTask()
  const handleCompleteTask = (taskId: string) => {
    mutate({
      taskId: taskId,
    })
  }
  const childrenTasks = useMemo(() => {
    return tasks.filter((t) => t.parent_id === task.id);
  }, [tasks, task.id]);

  const sectionName = sections?.find(s => s.id === task.section_id)?.name
  const completedChildrenLength = childrenTasks.filter(task => task.checked || task.completed_at).length

  useClickOutside({
    ref: taskToolbarRef,
    handler: onCloseTaskDetailToolbar,
    enabled: isOpenTaskToolbar
  })
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
            ref={setNodeRef}
            style={style}
          className={
            "flex items-start outline outline-product-library-divider-primary hover:outline-product-library-divider-on-dark shadow-sm rounded-large p-2.5 group relative"
          }
        >
          {!isGrouping &&
              <button type={"button"} {...attributes} {...listeners} className={"flex justify-center items-center w-6 h-6 cursor-grab active:cursor-grabbing hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}>
                <DragDropIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
              </button>
          }

          <button
            type={"button"}
            onClick={() => handleCompleteTask(task.id)}
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
                    "flex gap-0.5 text-xs text-product-library-display-secondary-idle-tint shrink-0"
                  }
                >
                  <ChildrenIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                  <span>{completedChildrenLength}/{childrenTasks.length}</span>
                </div>
              )}

              {task.due &&
                  <button
                      type={"button"}
                      className={
                        `flex gap-0.5 text-xs ${DUE_COLOR_CLASS[category]}`
                      }
                  >
                    <SmallCalendarIcon className={`${DUE_COLOR_CLASS[category]}`}/>
                    <span>{label}</span>
                  </button>}

              <MyTaskBoardLabelsPreview labels={task.labels} />

              {sectionName && isGrouping && <p className={"text-xs text-product-library-display-secondary-idle-tint"}>/{sectionName}</p>}
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
            <div ref={taskToolbarRef}
              className={"absolute top-9 right-9 left-6 z-50"}
              onClick={(e) => e.stopPropagation()}
            >
              <MyTasksToolbarDropdown taskId={task.id} task={task}/>
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

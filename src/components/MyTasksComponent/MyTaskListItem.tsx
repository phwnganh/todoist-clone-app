import type { TaskNode } from "../../types/task.type.ts";
import SmallCalendarIcon from "../../assets/small-calendar-icon.svg";
import EditIcon from "../icons/EditIcon.tsx";
import DueDateIcon from "../icons/DueDateIcon.tsx";
import CommentIcon from "../icons/CommentIcon.tsx";
import MenuIcon from "../icons/MenuIcon.tsx";
import MyTaskContent from "./MyTaskContent";
import TaskSmallArrowDownIcon from "../icons/TaskSmallArrowDownIcon.tsx";
import TaskSmallArrowRightIcon from "../icons/TaskSmallArrowRightIcon.tsx";
import { getTaskIndentClass } from "../../helpers/getTaskIndentClass.ts";
import EditMyTaskModalDialog from "./EditMyTaskComponent";
import { useTaskStore } from "../../stores/task.store.ts";
import VerifiedIcon from "../icons/VerifiedIcon.tsx";
import ChildrenIcon from "../../assets/children-icon.svg";
import LabelIcon from '../../assets/label-icon.svg'
import { useExpanded } from "../../hooks/useExpanded.ts";
import {type MouseEvent, useRef} from "react";
import MyTasksToolbarDropdown from "./MyTasksToolbarDropdown.tsx";
import MyTaskDetailModalDialog from "./MyTaskDetailModalDialog";
import DeleteMyTaskModalDialog from "./DeleteMyTaskComponent";
import {PRIORITY_BORDER_CLASS_MAPPING, PRIORITY_VERIFIED_CLASS_MAPPING} from "../../constants/priority.constants";
import {useCompleteTask} from "../../hooks/useQueryHook/useTasks.ts";
import {getDueInfo} from "../../helpers/formateDate.ts";
import {DUE_COLOR_CLASS} from "../../constants/color.constants.ts";
import {SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import DragDropIcon from "../icons/DragDropIcon.tsx";
import {CSS} from "@dnd-kit/utilities";
import {useClickOutside} from "../../hooks/useClickOutside.ts";
import {useGroupingTaskStore} from "../../stores/groupingTask.store.ts";
import type {Section} from "../../types/section.type.ts";

type MyTaskListItemProps = {
  taskNode: TaskNode;
  level: number;
  onCloseTaskDetailToolbar: () => void;
  sections?: Section[]
};
const MyTaskListItem = ({
  taskNode,
  level,
  onCloseTaskDetailToolbar,
    sections,
}: MyTaskListItemProps) => {
  const { task, children } = taskNode;
  const { isExpanded, handleExpanded } = useExpanded(true);
  const { editingTaskId, deleteTaskId, onOpenEditTask, onCloseEditTask, taskDetailId, onOpenTaskDetail, onCloseTaskDetail, openTaskDetailToolbar, onOpenTaskDetailToolbar } = useTaskStore();
  const {groupedBy} = useGroupingTaskStore()
  const isEditing = editingTaskId === task.id;
  const isOpenTaskDetail = taskDetailId === task.id;
  const isDeleting = deleteTaskId === task.id;
  const isOpenTaskDetailToolbar = openTaskDetailToolbar === task.id;
  const hasChildren = children.length > 0;
  const completedChildrenLength = children.filter(child => child.task.checked || child.task.completed_at).length
  const isGrouping = groupedBy != null
  const {category, label} = getDueInfo(task?.due?.date)
  const {setNodeRef, attributes, listeners, transition, transform} = useSortable({id: task.id, data: {
    type: "task"
  }})
  const taskToolbarRef = useRef<HTMLDivElement | null>(null)

  const sectionName = sections?.find(s => s.id === task.section_id)?.name
  useClickOutside({
    ref: taskToolbarRef,
    handler: onCloseTaskDetailToolbar,
    enabled: isOpenTaskDetailToolbar
  })
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

  const handleOpenTaskToolbarDropdown = (e: MouseEvent, taskId: string) => {
    e.stopPropagation()
    onOpenTaskDetailToolbar(taskId)
  }
  return (
    <>
      {isEditing ? (
        <EditMyTaskModalDialog
          variant={"list"}
          task={task}
          onCloseEditMyTask={onCloseEditTask}
        />
      ) : (
          <div ref={setNodeRef} style={style} className={"flex items-start gap-5 px-2 border-b border-b-product-library-divider-primary"}>
            {!isGrouping &&
                <button type={"button"} className={"flex justify-center items-center w-6 h-6 hover:bg-product-library-selectable-secondary-hover-fill rounded-small"} {...attributes} {...listeners}>
                  <DragDropIcon/>
                </button>
            }
            <li
                className={`flex justify-between w-full items-start group relative ${getTaskIndentClass(level)}`}
            >
              <div role={"button"} className={"flex items-start"}>
                {hasChildren && (
                    <button
                        type={"button"}
                        onClick={handleExpanded}
                        className={
                          "absolute pr-0.75 top-2 -left-4 flex justify-center items-center rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                        }
                    >
                      {isExpanded ? (
                          <TaskSmallArrowDownIcon />
                      ) : (
                          <TaskSmallArrowRightIcon />
                      )}
                    </button>
                )}

                {/*btn toggle checked complete the task*/}
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
                {/*task list item*/}
                <div role={"button"} className={"py-2 mr-7.5 flex flex-col cursor-pointer"}
                     onClick={() => onOpenTaskDetail(task.id)}>
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
                    {hasChildren && (
                        <div
                            className={
                              "flex gap-0.5 text-xs text-product-library-display-secondary-idle-tint"
                            }
                        >
                          <img src={ChildrenIcon} alt={"children-icon"} />
                          <span>{completedChildrenLength}/{children.length}</span>
                        </div>
                    )}
                    {task.due &&
                        <button
                            type={"button"}
                            className={
                              `flex gap-0.5 text-xs ${DUE_COLOR_CLASS[category]}`
                            }
                        >
                          <img src={SmallCalendarIcon} alt={"small-calendar-icon"} />
                          <span>{label}</span>
                        </button>}

                    {task.labels?.map((label) => (
                        <div key={label} className={"flex gap-0.5 text-xs text-product-library-display-secondary-idle-tint"}>
                          <div className={"w-4 h-4 flex justify-center items-center"}>
                            <img src={LabelIcon} alt={"label-icon"} />
                          </div>
                          <span>{label}</span>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={"flex flex-col justify-between"}>
                <div className={"group-hover:opacity-100 opacity-0 pointer-events-none group-hover:pointer-events-auto flex mt-2 pl-4 gap-small"}>
                  <button
                      type={"button"}
                      onClick={() => onOpenEditTask(task.id)}
                      aria-label={"edit"}
                      className={
                        "rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                      }
                  >
                    <EditIcon />
                  </button>
                  <button
                      type={"button"}
                      aria-label={"due-date"}
                      className={
                        "rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                      }
                  >
                    <DueDateIcon />
                  </button>
                  <button
                      type={"button"}
                      aria-label={"comment"}
                      className={
                        "rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                      }
                  >
                    <CommentIcon />
                  </button>
                  <div className={"relative"} ref={taskToolbarRef}>
                    <button
                        type={"button"}
                        onClick={(e) => {
                          handleOpenTaskToolbarDropdown(e, task.id);
                        }}
                        aria-label={"menu"}
                        className={
                          "rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                        }
                    >
                      <MenuIcon />
                    </button>
                    {isOpenTaskDetailToolbar && (
                        <div
                            onClick={(e) => e.stopPropagation()}
                        >
                          <MyTasksToolbarDropdown taskId={task.id} task={task}/>
                        </div>
                    )}
                  </div>
                </div>
                {sectionName && isGrouping &&
                    <p className={"self-end text-xs text-product-library-display-secondary-idle-tint"}>/{sectionName}</p>
                }

              </div>
            </li>
          </div>

      )}
      {hasChildren &&
        isExpanded &&
          <SortableContext items={children.map(child => child.task.id)} strategy={verticalListSortingStrategy}>
            {children.map((child) => (
                <MyTaskListItem
                    key={child.task.id}
                    taskNode={child}
                    level={level + 1}
                    onCloseTaskDetailToolbar={onCloseTaskDetailToolbar}
                    sections={sections}
                />
            ))}
          </SortableContext>
        }

      {isOpenTaskDetail && (
          <MyTaskDetailModalDialog onCloseTaskDetail={onCloseTaskDetail} />
      )}
      {isDeleting && (
          <DeleteMyTaskModalDialog task={task}/>
      )}
    </>
  );
};

export default MyTaskListItem;

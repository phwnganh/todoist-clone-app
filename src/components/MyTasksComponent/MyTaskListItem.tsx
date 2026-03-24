import type {Task, TaskNode} from "@/types/task.type.ts";
import EditIcon from "@/components/icons/EditIcon.tsx";
import DueDateIcon from "@/components/icons/DueDateIcon.tsx";
import CommentIcon from "@/components/icons/CommentIcon.tsx";
import MenuIcon from "@/components/icons/MenuIcon.tsx";
import MyTaskContent from "./MyTaskContent";
import TaskSmallArrowDownIcon from "@/components/icons/TaskSmallArrowDownIcon.tsx";
import TaskSmallArrowRightIcon from "@/components/icons/TaskSmallArrowRightIcon.tsx";
import { getTaskIndentClass } from "@/helpers/getTaskIndentClass.ts";
import EditMyTaskModalDialog from "./EditMyTaskComponent";
import { useTaskStore } from "@/stores/task.store.ts";
import VerifiedIcon from "@/components/icons/VerifiedIcon.tsx";
import { useExpanded } from "@/hooks/useExpanded.ts";
import {type MouseEvent, useRef} from "react";
import MyTasksToolbarDropdown from "./MyTasksToolbarDropdown.tsx";
import MyTaskDetailModalDialog from "./MyTaskDetailModalDialog";
import DeleteMyTaskModalDialog from "./DeleteMyTaskComponent";
import {PRIORITY_BORDER_CLASS_MAPPING, PRIORITY_VERIFIED_CLASS_MAPPING} from "@/constants/priority.constants";
import {useCompleteTask} from "@/hooks/useQueryHook/useTasks.ts";
import {getDueInfo} from "@/helpers/formateDate.ts";
import {DUE_COLOR_CLASS} from "@/constants/color.constants.ts";
import {SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import DragDropIcon from "@/components/icons/DragDropIcon.tsx";
import {CSS} from "@dnd-kit/utilities";
import {useClickOutside} from "@/hooks/useClickOutside.ts";
import {useGroupingTaskStore} from "@/stores/groupingTask.store.ts";
import type {Section} from "@/types/section.type.ts";
import SmallCalendarIcon from "@/components/icons/SmallCalendarIcon.tsx";
import LabelIcon from "@/components/icons/LabelIcon.tsx";
import ChildrenIcon from "@/components/icons/ChildrenIcon.tsx";
import type {Project} from "@/types/project.type.ts";
import HashtagIcon from "@/components/icons/HashtagIcon.tsx";
import {getProjectColorClass} from "@/helpers/getProjectColorClass.ts";

type MyTaskListItemProps = {
  taskNode: TaskNode;
  level: number;
  sections?: Section[]
  isSortable?: boolean;
  isTasksLabelView?: boolean;
  projects?: Project[]
  tasks?: Task[]
};
const MyTaskListItem = ({
  taskNode,
  level,
    sections,
    isSortable = true, isTasksLabelView = false,
    projects,
    tasks
}: MyTaskListItemProps) => {
    const taskToolbarRef = useRef<HTMLDivElement | null>(null)
  const { task, children } = taskNode;
    const sectionName = sections?.find(s => s.id === task.section_id)?.name
  const projectName = projects?.find(p => p.id === task.project_id)?.name
  const projectColor = projects?.find(p => p.id === task.project_id)?.color

  const { isExpanded, handleExpanded } = useExpanded(true);
  const { editingTaskId, deleteTaskId, onOpenEditTask, onCloseEditTask, taskDetailId, onOpenTaskDetail, onCloseTaskDetail, openTaskDetailToolbar, onOpenTaskDetailToolbar, onCloseTaskDetailToolbar } = useTaskStore();
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
  },
  disabled: !isSortable})

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

    useClickOutside({
    ref: taskToolbarRef,
    handler: onCloseTaskDetailToolbar,
    enabled: isOpenTaskDetailToolbar
  })
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
            {!isGrouping && isSortable &&
                <button type={"button"} className={"flex justify-center items-center w-6 h-6 hover:bg-product-library-selectable-secondary-hover-fill rounded-small"} {...attributes} {...listeners}>
                  <DragDropIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
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
                          <TaskSmallArrowDownIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                      ) : (
                          <TaskSmallArrowRightIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
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
                  <div className={"mb-0.75 text-sm text-product-library-display-primary-idle-tint"}>
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
                          <ChildrenIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                          <span>{completedChildrenLength}/{children.length}</span>
                        </div>
                    )}
                    {task.due &&
                        <button
                            type={"button"}
                            className={
                              `flex gap-0.5 items-center text-xs ${DUE_COLOR_CLASS[category]}`
                            }
                        >
                          <SmallCalendarIcon className={`${DUE_COLOR_CLASS[category]}`}/>
                          <span>{label}</span>
                        </button>}

                    {task.labels?.map((label) => (
                        <div key={label} className={"flex gap-0.5 text-xs text-product-library-display-secondary-idle-tint"}>
                          <div className={"w-4 h-4 flex justify-center items-center"}>
                            <LabelIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                          </div>
                          <span>{label}</span>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={"flex flex-col justify-between"}>
                <div className={`${isOpenTaskDetailToolbar ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"} flex mt-2 pl-4 gap-small`}>
                  <button
                      type={"button"}
                      onClick={() => onOpenEditTask(task.id)}
                      aria-label={"edit"}
                      className={
                        "rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                      }
                  >
                    <EditIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                  </button>
                  <button
                      type={"button"}
                      aria-label={"due-date"}
                      className={
                        "rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                      }
                  >
                    <DueDateIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                  </button>
                  <button
                      type={"button"}
                      aria-label={"comment"}
                      className={
                        "rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                      }
                  >
                    <CommentIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
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
                      <MenuIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
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
                {projectName && isTasksLabelView &&
                    (
                        <div className={"flex gap-0.5 justify-end items-center"}>
                          <p className={"text-xs text-product-library-display-secondary-idle-tint"}>{projectName}</p>
                          {sectionName && <span className={"text-xs text-product-library-display-secondary-idle-tint"}>/{sectionName}</span>}
                          <div className={"flex items-center justify-center w-3 h-3"}>
                            <HashtagIcon className={`${getProjectColorClass(projectColor)}`}/>
                          </div>
                        </div>

                    )
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
                    sections={sections}
                    isTasksLabelView={isTasksLabelView}
                    projects={projects}
                    tasks={tasks}
                />
            ))}
          </SortableContext>
        }

      {isOpenTaskDetail && (
          <MyTaskDetailModalDialog onCloseTaskDetail={onCloseTaskDetail} taskDetail={task} tasks={tasks}/>
      )}
      {isDeleting && (
          <DeleteMyTaskModalDialog task={task}/>
      )}
    </>
  );
};

export default MyTaskListItem;

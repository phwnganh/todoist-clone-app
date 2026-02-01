import VerifiedIcon from "../../../../icons/VerifiedIcon.tsx";
import ChildrenIcon from "../../../../../assets/children-icon.svg";
import type { Task } from "../../../../../types/task.type.ts";
import EditIcon from "../../../../icons/EditIcon.tsx";
import DueDateIcon from "../../../../icons/DueDateIcon.tsx";
import CommentIcon from "../../../../icons/CommentIcon.tsx";
import MenuIcon from "../../../../icons/MenuIcon.tsx";
import {useTaskStore} from "../../../../../stores/task.store.ts";
import EditMyTaskDetailMainSubChildrenForm from "../EditMyTaskDetailMainSubChildrenForm";
import type {MouseEvent} from "react";
import MySubTaskToolbarDropdown from "../MySubTaskToolbarDropdown/MySubTaskToolbarDropdown.tsx";
import {PRIORITY_BORDER_CLASS_MAPPING} from "../../../../../constants/priority.constants";
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
    const {editingSubTaskId, onOpenEditSubTask, onCloseEditSubTask} = useTaskStore()
    const isEditing = editingSubTaskId === childrenTask.id

  return (
      <>
          {isEditing ? <EditMyTaskDetailMainSubChildrenForm onCloseEditMySubTask={onCloseEditSubTask} taskDetail={childrenTask} /> : (
              <div className={"flex justify-between items-center group"}>
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
                                  `h-5 w-5 rounded-full border-2 ${PRIORITY_BORDER_CLASS_MAPPING[childrenTask?.priority]}`
                              }
                          ></div>
                          <div
                              className={
                                  "inset-0 absolute group-hover/check:flex justify-center items-center hidden"
                              }
                          >
                              <VerifiedIcon
                                  className={"text-product-library-actionable-quaternary-idle-tint"}
                              />
                          </div>
                      </button>
                      <div className={"flex flex-col gap-1.5"}>
                          <p className={"text-sm"}>{childrenTask.content}</p>
                          <p
                              className={
                                  "text-xs text-product-library-display-secondary-idle-tint line-clamp-1"
                              }
                          >
                              {childrenTask.description}
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
                  <div className={"group-hover:flex hidden pl-4 gap-small"}>
                      <button onClick={() => onOpenEditSubTask(childrenTask.id)} type={"button"} aria-label={"edit"} className={"rounded-small hover:bg-product-library-selectable-secondary-hover-fill"}>
                          <EditIcon/>
                      </button>
                      <button type={"button"} aria-label={"due-date"} className={"rounded-small hover:bg-product-library-selectable-secondary-hover-fill"}>
                          <DueDateIcon/>
                      </button>
                      <button type={"button"} aria-label={"comment"} className={"rounded-small hover:bg-product-library-selectable-secondary-hover-fill"}>
                          <CommentIcon/>
                      </button>
                      <div className={"relative"}>
                          <button onClick={onOpenSubTaskDetailToolbar} type={"button"} aria-label={"menu"} className={"rounded-small hover:bg-product-library-selectable-secondary-hover-fill"}>
                              <MenuIcon />
                          </button>
                          {isOpenSubTaskDetailToolbar && <div className={"absolute right-9 z-50"}
                          onClick={e => e.stopPropagation()}>
                              <MySubTaskToolbarDropdown taskId={childrenTask.id}/>
                          </div>}
                      </div>

                  </div>
              </div>
          )}
      </>
  );
};

export default ChildrenTaskItem;

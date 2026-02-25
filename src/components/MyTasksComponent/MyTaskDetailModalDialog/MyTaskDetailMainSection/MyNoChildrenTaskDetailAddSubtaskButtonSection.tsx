import PlusAddIcon from "../../../../assets/add-icon.svg";
import { useTaskStore } from "../../../../stores/task.store.ts";
import AddMyTaskDetailMainSubChildrenForm from "./AddMyTaskDetailMainSubChildrenForm";
import type { Task } from "../../../../types/task.type.ts";
const MyNoChildrenTaskDetailAddSubtaskButtonSection = ({
  taskId,
  taskDetail,
}: {
  taskId: string | undefined | null;
  taskDetail?: Task;
}) => {
  const { addingSubTaskId, onOpenAddSubTask, onCloseAddSubTask } =
    useTaskStore();
  const isAdding = addingSubTaskId === taskId;
  return (
    <div className={"mt-3 ml-8"}>
      <button
        type={"button"}
        onClick={() => onOpenAddSubTask(taskId)}
        className={
          "flex items-center gap-1.5 text-xs text-product-library-actionable-quaternary-idle-tint font-medium rounded-sm hover:bg-product-library-selectable-secondary-hover-fill px-2"
        }
      >
        <div className={"flex justify-center items-center w-6 h-6"}>
          <img src={PlusAddIcon} alt="plus-icon" />
        </div>
        <p>Add sub-task</p>
      </button>
      {isAdding && (
        <AddMyTaskDetailMainSubChildrenForm
          onCloseAddMySubTask={onCloseAddSubTask}
          taskDetail={taskDetail}
        />
      )}
    </div>
  );
};

export default MyNoChildrenTaskDetailAddSubtaskButtonSection;

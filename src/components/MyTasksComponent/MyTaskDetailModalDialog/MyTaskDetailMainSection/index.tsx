import MyTaskDetailHeaderMainSection from "./MyTaskDetailHeaderMainSection";
import MyTaskDetailSubTaskMainSection from "./MyTaskDetailSubTaskMainSection";
import MyNoChildrenTaskDetailAddSubtaskButtonSection from "./MyNoChildrenTaskDetailAddSubtaskButtonSection.tsx";
import { useTaskStore } from "@/stores/task.store.ts";
import type { Task } from "@/types/task.type.ts";
import AddMyTaskDetailMainSubChildrenForm from "./AddMyTaskDetailMainSubChildrenForm";

type MyTaskDetailMainSectionProps = {
  taskDetail?: Task;
  tasks?: Task[];
};
const MyTaskDetailMainSection = ({
  taskDetail,
  tasks,
}: MyTaskDetailMainSectionProps) => {
  const { taskDetailId, addingSubTaskId, onCloseAddSubTask } = useTaskStore();
  const isTaskAdding = addingSubTaskId === taskDetailId;
  const hasChildren = tasks?.some(
    (task) => task.parent_id === taskDetail?.id,
  );
  return (
    <section className={"px-large pt-large w-full flex-1 min-w-0"}>
      <div className={"flex flex-col gap-small"}>
        <MyTaskDetailHeaderMainSection taskDetail={taskDetail} />
        {hasChildren ? (
          <MyTaskDetailSubTaskMainSection
            taskDetail={taskDetail}
            tasks={tasks}
          />
        ) : (
          <div className={"pt-2"}>
            {isTaskAdding ? (
              <div className={"pl-8 text-product-library-display-primary-idle-tint"}>
                <AddMyTaskDetailMainSubChildrenForm
                  onCloseAddMySubTask={onCloseAddSubTask}
                  taskDetail={taskDetail}
                />
              </div>
            ) : (
              <MyNoChildrenTaskDetailAddSubtaskButtonSection
                taskId={taskDetail?.id}
                taskDetail={taskDetail}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyTaskDetailMainSection;

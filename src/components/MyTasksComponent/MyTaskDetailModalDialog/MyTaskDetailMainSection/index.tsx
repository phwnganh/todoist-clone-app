import { useTaskStore } from "../../../../stores/task.store.ts";
import {
  useGetAllTasks,
  useGetATask,
} from "../../../../hooks/useQueryHook/useTasks.ts";
import MyTaskDetailHeaderMainSection from "./MyTaskDetailHeaderMainSection";
import MyTaskDetailSubTaskMainSection from "./MyTaskDetailSubTaskMainSection";
import MyNoParentTaskDetailAddSubtaskButtonSection from "./MyNoParentTaskDetailAddSubtaskButtonSection.tsx";

const MyTaskDetailMainSection = () => {
  const { taskDetailId } = useTaskStore();
  const { data: taskDetail, isLoading } = useGetATask(taskDetailId);
  const { data: tasks } = useGetAllTasks();
  return (
    <section className={"px-large pt-large w-full"}>
      <div className={"flex flex-col gap-small"}>
        <MyTaskDetailHeaderMainSection
          taskDetail={taskDetail}
          isLoading={isLoading}
        />
        {taskDetail?.parent_id !== null ?
            <MyTaskDetailSubTaskMainSection
            taskId={taskDetailId}
            tasks={tasks?.results}
        /> : <MyNoParentTaskDetailAddSubtaskButtonSection taskId={taskDetailId}/>}

      </div>
    </section>
  );
};

export default MyTaskDetailMainSection;

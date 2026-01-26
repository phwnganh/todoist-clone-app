import { useTaskStore } from "../../../../stores/task.store.ts";
import {
  useGetAllTasks,
  useGetATask,
} from "../../../../hooks/useQueryHook/useTasks.ts";
import MyTaskDetailHeaderMainSection from "./MyTaskDetailHeaderMainSection";
import MyTaskDetailSubTaskMainSection from "./MyTaskDetailSubTaskMainSection";

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
        <MyTaskDetailSubTaskMainSection
          taskId={taskDetailId}
          tasks={tasks?.results}
        />
      </div>
    </section>
  );
};

export default MyTaskDetailMainSection;

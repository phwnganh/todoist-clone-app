import { useTaskStore } from "../../../../stores/task.store.ts";
import {
  useGetAllTasks,
} from "../../../../hooks/useQueryHook/useTasks.ts";
import MyTaskDetailHeaderMainSection from "./MyTaskDetailHeaderMainSection";
import MyTaskDetailSubTaskMainSection from "./MyTaskDetailSubTaskMainSection";
import MyNoParentTaskDetailAddSubtaskButtonSection from "./MyNoParentTaskDetailAddSubtaskButtonSection.tsx";

const MyTaskDetailMainSection = () => {
  const { taskDetail } = useTaskStore();
  const { data: tasks } = useGetAllTasks();
  return (
    <section className={"px-large pt-large w-full"}>
      <div className={"flex flex-col gap-small"}>
        <MyTaskDetailHeaderMainSection
          taskDetail={taskDetail}
        />
        {taskDetail?.parent_id !== null ?
            <MyTaskDetailSubTaskMainSection
            taskDetail={taskDetail}
            tasks={tasks?.results}
        /> : <MyNoParentTaskDetailAddSubtaskButtonSection taskId={taskDetail?.id}/>}

      </div>
    </section>
  );
};

export default MyTaskDetailMainSection;

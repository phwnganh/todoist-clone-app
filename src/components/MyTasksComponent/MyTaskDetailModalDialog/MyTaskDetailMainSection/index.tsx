import { useTaskStore } from "../../../../stores/task.store.ts";
import {
  useGetAllTasks,
} from "../../../../hooks/useQueryHook/useTasks.ts";
import MyTaskDetailHeaderMainSection from "./MyTaskDetailHeaderMainSection";
import MyTaskDetailSubTaskMainSection from "./MyTaskDetailSubTaskMainSection";
import MyNoChildrenTaskDetailAddSubtaskButtonSection from "./MyNoChildrenTaskDetailAddSubtaskButtonSection.tsx";

const MyTaskDetailMainSection = () => {
  const { taskDetail } = useTaskStore();
  const { data: tasks } = useGetAllTasks();
  const hasChildren = tasks?.results?.some(task => task.parent_id === taskDetail?.id)
  return (
    <section className={"px-large pt-large w-full"}>
      <div className={"flex flex-col gap-small"}>
        <MyTaskDetailHeaderMainSection
          taskDetail={taskDetail}
        />
        {hasChildren ?
            <MyTaskDetailSubTaskMainSection
            taskDetail={taskDetail}
            tasks={tasks?.results}
        /> : <MyNoChildrenTaskDetailAddSubtaskButtonSection taskId={taskDetail?.id}/>}

      </div>
    </section>
  );
};

export default MyTaskDetailMainSection;

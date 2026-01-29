import { useTaskStore } from "../../../../stores/task.store.ts";
import {
  useGetAllTasks,
} from "../../../../hooks/useQueryHook/useTasks.ts";
import MyTaskDetailHeaderMainSection from "./MyTaskDetailHeaderMainSection";
import MyTaskDetailSubTaskMainSection from "./MyTaskDetailSubTaskMainSection";
import MyNoChildrenTaskDetailAddSubtaskButtonSection from "./MyNoChildrenTaskDetailAddSubtaskButtonSection.tsx";
import AddMyTaskModalDialog from "../../AddMyTaskComponent";

const MyTaskDetailMainSection = () => {
  const { taskDetail, addingTaskId, onCloseAddMyTask } = useTaskStore();
  const { data: tasks } = useGetAllTasks();
  const isTaskAdding = addingTaskId === taskDetail?.id;
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
        /> : (
          <div className={"pt-2"}>
            {isTaskAdding ? (<div className={"pl-8"}><AddMyTaskModalDialog
                variant={"list"}
                onCloseAddMyTask={onCloseAddMyTask}
            /></div>) : (<MyNoChildrenTaskDetailAddSubtaskButtonSection taskId={taskDetail?.id}/>)}

          </div>
            )
        }
      </div>
    </section>
  );
};

export default MyTaskDetailMainSection;

import { createPortal } from "react-dom";
import { useProjectStore } from "@/stores/project.store.ts";
import { useGetAProject } from "@/hooks/useQueryHook/useProjects.ts";
import MyTaskDetailAside from "./MyTaskDetailAsideSection";
import MyTaskDetailMainSection from "./MyTaskDetailMainSection";
import MyTaskDetailTitleSection from "./MyTaskDetailTitleSection.tsx";
import { useGetAllTasks } from "@/hooks/useQueryHook/useTasks.ts";
import { useMemo } from "react";
import { useTaskStore } from "@/stores/task.store.ts";
import { useGetAllSections } from "@/hooks/useQueryHook/useSections.ts";
import CustomDetailModalDialog from "@/components/ui/CustomDetailModalDialog.tsx";

type MyTaskDetailModalDialogProps = {
  onCloseTaskDetail: () => void;
};
const MyTaskDetailModalDialog = ({
  onCloseTaskDetail,
}: MyTaskDetailModalDialogProps) => {
  const projectId = useProjectStore((state) => state.projectId);
  const { taskDetailId } = useTaskStore();
  const { data: projectDetail } = useGetAProject(projectId);
  const { data: tasks } = useGetAllTasks({ project_id: projectId });
  const taskDetail = useMemo(() => {
    return tasks?.results?.find((task) => task.id === taskDetailId);
  }, [taskDetailId, tasks?.results]);
  const { data: sections } = useGetAllSections({ project_id: projectId });
  const sectionDetail = useMemo(() => {
    if (!taskDetail?.section_id) return null;
    return sections?.results.find((sec) => sec.id === taskDetail?.section_id);
  }, [taskDetail?.section_id, sections?.results]);

  return (
    <CustomDetailModalDialog aria-labelledby={"task-detail"} className={"flex flex-col"}>
      <MyTaskDetailTitleSection
          sectionDetail={sectionDetail}
          projectDetail={projectDetail}
          onCloseTaskDetail={onCloseTaskDetail}
      />
      <main className={"flex md:flex-1 flex-col md:flex-row"}>
        <MyTaskDetailMainSection taskDetail={taskDetail} tasks={tasks} />
        <MyTaskDetailAside taskDetail={taskDetail} />
      </main>
    </CustomDetailModalDialog>
  );
};

export default MyTaskDetailModalDialog;

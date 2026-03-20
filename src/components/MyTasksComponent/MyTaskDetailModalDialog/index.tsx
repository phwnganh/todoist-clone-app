import { useProjectStore } from "@/stores/project.store.ts";
import { useGetAProject } from "@/hooks/useQueryHook/useProjects.ts";
import MyTaskDetailAside from "./MyTaskDetailAsideSection";
import MyTaskDetailMainSection from "./MyTaskDetailMainSection";
import MyTaskDetailTitleSection from "./MyTaskDetailTitleSection.tsx";
import { useMemo } from "react";
import { useGetAllSections } from "@/hooks/useQueryHook/useSections.ts";
import CustomDetailModalDialog from "@/components/ui/CustomDetailModalDialog.tsx";
import type {Task} from "@/types/task.type.ts";

type MyTaskDetailModalDialogProps = {
  onCloseTaskDetail: () => void;
  taskDetail: Task;
  tasks?: Task[]
};
const MyTaskDetailModalDialog = ({
  onCloseTaskDetail,
    taskDetail,
    tasks
}: MyTaskDetailModalDialogProps) => {
  const projectId = useProjectStore((state) => state.projectId);
  const { data: projectDetail } = useGetAProject(projectId);
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

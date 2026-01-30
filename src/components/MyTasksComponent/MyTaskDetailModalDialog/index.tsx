import {createPortal} from "react-dom";
import {useProjectStore} from "../../../stores/project.store.ts";
import {useGetAProject} from "../../../hooks/useQueryHook/useProjects.ts";
import MyTaskDetailAside from "./MyTaskDetailAside.tsx";
import MyTaskDetailMainSection from "./MyTaskDetailMainSection";
import MyTaskDetailTitleSection from "./MyTaskDetailTitleSection.tsx";
import {useGetAllTasks} from "../../../hooks/useQueryHook/useTasks.ts";
import {useMemo} from "react";
import {useTaskStore} from "../../../stores/task.store.ts";
import {useGetAllSections} from "../../../hooks/useQueryHook/useSections.ts";

type MyTaskDetailModalDialogProps = {
    onCloseTaskDetail: () => void;
}
const MyTaskDetailModalDialog = ({onCloseTaskDetail}: MyTaskDetailModalDialogProps) => {
    const projectId = useProjectStore(state => state.projectId)
    const {taskDetailId} = useTaskStore()
    const {data: projectDetail} = useGetAProject(projectId);
    const { data: tasks } = useGetAllTasks();
    const taskDetail = useMemo(() => {
        return tasks?.results?.find((task) => task.id === taskDetailId);
    }, [taskDetailId, tasks?.results])
    const {data: sections} = useGetAllSections()
    const sectionDetail = useMemo(() => {
        if(!taskDetail?.section_id) return null;
        return sections?.results.find(sec => sec.id === taskDetail?.section_id)
    }, [taskDetail?.section_id, sections?.results])

    return createPortal(
        <div role={"dialog"} aria-modal={"true"} aria-labelledby={"task-detail"} className={"fixed inset-0 bg-black/40 z-50 pt-16"}>
            <div className={"w-216 max-w-full h-200 mx-auto rounded-large bg-white flex flex-col"}>
                <MyTaskDetailTitleSection sectionDetail={sectionDetail} projectDetail={projectDetail} onCloseTaskDetail={onCloseTaskDetail}/>
                <main className={"flex flex-1"}>
                        <MyTaskDetailMainSection taskDetail={taskDetail} tasks={tasks}/>
                        <MyTaskDetailAside projectDetail={projectDetail} taskDetail={taskDetail}/>
                </main>
            </div>
        </div>,
        document.body
    );
};

export default MyTaskDetailModalDialog;
import {createPortal} from "react-dom";
import {useProjectStore} from "../../../stores/project.store.ts";
import {useGetAProject} from "../../../hooks/useQueryHook/useProjects.ts";
import MyTaskDetailAside from "./MyTaskDetailAside.tsx";
import MyTaskDetailMainSection from "./MyTaskDetailMainSection";
import MyTaskDetailTitleSection from "./MyTaskDetailTitleSection.tsx";

type MyTaskDetailModalDialogProps = {
    onCloseTaskDetail: () => void;
}
const MyTaskDetailModalDialog = ({onCloseTaskDetail}: MyTaskDetailModalDialogProps) => {
    const projectId = useProjectStore(state => state.projectId)
    const {data: projectDetail} = useGetAProject(projectId);
    return createPortal(
        <div role={"dialog"} aria-modal={"true"} aria-labelledby={"task-detail"} className={"fixed inset-0 bg-black/40 z-50 pt-16"}>
            <div className={"w-216 max-w-full h-200 mx-auto rounded-large bg-white flex flex-col"}>
                <MyTaskDetailTitleSection projectDetail={projectDetail} onCloseTaskDetail={onCloseTaskDetail}/>
                <main className={"flex flex-1"}>
                        <MyTaskDetailMainSection/>
                        <MyTaskDetailAside projectDetail={projectDetail}/>
                </main>
            </div>
        </div>,
        document.body
    );
};

export default MyTaskDetailModalDialog;
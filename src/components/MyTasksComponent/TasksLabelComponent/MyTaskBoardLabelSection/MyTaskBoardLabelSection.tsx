import {useTaskStore} from "@/stores/task.store.ts";
import {type MouseEvent} from "react";
import type {Task} from "@/types/task.type.ts";
import MyTaskBoardLabelHeader
    from "@/components/MyTasksComponent/TasksLabelComponent/MyTaskBoardLabelSection/MyTaskBoardLabelHeader.tsx";
import MyTaskBoardItem from "@/components/MyTasksComponent/MyTaskBoardItem.tsx";
import type {Section} from "@/types/section.type.ts";
import type {Project} from "@/types/project.type.ts";

type MyTaskBoardLabelSectionProps = {
    tasks?: Task[];
    sections?: Section[];
    isSortable?: boolean;
    isTasksLabelView?: boolean;
    projects?: Project[];
}
const MyTaskBoardLabelSection = ({tasks, sections, isSortable, isTasksLabelView, projects}: MyTaskBoardLabelSectionProps) => {
    const {openTaskDetailToolbar, onOpenTaskDetailToolbar} = useTaskStore()

    const handleOpenTaskDetailToolbar = (id: string, e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onOpenTaskDetailToolbar(id)
    }
    return (
        <div className={"rounded-large ring ring-transparent hover:ring-border-hover py-2 px-4 shrink-0 w-70 flex flex-col gap-small"}>
            <MyTaskBoardLabelHeader tasks={tasks}/>
            {tasks?.map(task => <MyTaskBoardItem key={task.id} task={task} isOpenTaskDetailToolbar={openTaskDetailToolbar === task.id} onOpenTaskDetailToolbar={e => {
                handleOpenTaskDetailToolbar(task.id, e);
            }} tasks={tasks} sections={sections} isSortable={isSortable} isTasksLabelView={isTasksLabelView} projects={projects}/>)}
        </div>
    );
};

export default MyTaskBoardLabelSection;
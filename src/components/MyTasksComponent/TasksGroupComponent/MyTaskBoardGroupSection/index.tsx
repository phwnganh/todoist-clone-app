import type {Task} from "@/types/task.type.ts";
import MyTaskBoardGroupHeader from "./MyTaskBoardGroupHeader.tsx";
import MyTaskBoardItem from "../../MyTaskBoardItem.tsx";
import {useTaskStore} from "@/stores/task.store.ts";
import {type MouseEvent} from "react";
import type { Section } from "@/types/section.type.ts";

type MyTaskBoardGroupSectionProps = {
    title: string;
    tasks: Task[];
    sections?: Section[];
}
const MyTaskBoardGroupSection = ({title, tasks, sections}: MyTaskBoardGroupSectionProps) => {
    const {
        openTaskDetailToolbar,
        onOpenTaskDetailToolbar,
    } = useTaskStore();

    const handleOpenTaskDetailToolbar = (
        id: string,
        e: MouseEvent<HTMLButtonElement>,
    ) => {
        e.stopPropagation();
        onOpenTaskDetailToolbar(id);
    };
    return (
        <div className={"rounded-large ring ring-transparent hover:ring-border-hover py-2 px-4 shrink-0 w-70 flex flex-col gap-small"}>
            <MyTaskBoardGroupHeader title={title} tasks={tasks}/>
            {tasks.map(task => <MyTaskBoardItem task={task} isOpenTaskDetailToolbar={openTaskDetailToolbar === task.id} onOpenTaskDetailToolbar={(e) => {
                handleOpenTaskDetailToolbar(task.id, e);
            }} tasks={tasks} sections={sections}/>)}
        </div>
    );
};

export default MyTaskBoardGroupSection;
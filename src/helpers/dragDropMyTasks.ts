import type {MoveTaskPayload, ReorderTaskPayload, Task} from "../types/task.type.ts";
import {arrayMove} from "@dnd-kit/sortable";

export const findTaskByIdToOrder = (tasks: Task[], id: string) => {
    return tasks.find(t => t.id === id);
}

export const getSiblings = (tasks: Task[], parent_id: string | null | undefined, section_id: string | null | undefined) => {
    return tasks.filter(t => t.parent_id === parent_id && t.section_id === section_id).sort((a, b) => (a.child_order ?? 0) - (b.child_order ?? 0));
}

export const handleReorderTask = async (tasks: Task[], activeTask: Task, overTask: Task, reorderTask: (payload: ReorderTaskPayload) => void, movingTask: (payload: MoveTaskPayload) => void) => {
    const fromParent = activeTask.parent_id ?? null
    const toParent = overTask.parent_id ?? null

    const fromSection = activeTask.section_id ?? null
    const toSection = overTask.section_id ?? null

    const fromSiblings = getSiblings(tasks, fromParent, fromSection)
    const toSiblings = getSiblings(tasks, toParent, toSection)

    const fromIndex = fromSiblings.findIndex(t => t.id === activeTask.id)
    const toIndex = toSiblings.findIndex(t => t.id === overTask.id)

    if(fromParent === toParent && fromSection === toSection){
        const reordered = arrayMove(fromSiblings, fromIndex, toIndex)
        reorderTask({
            items: reordered.map((task, index) => ({
                id: task.id,
                child_order: index
            }))
        })
        return;
    }

    movingTask({
        id: activeTask.id,
        parent_id: toParent,
        section_id: toSection,
    })
    const newTo = [...toSiblings]
    newTo.splice(toIndex, 0, activeTask)

    reorderTask({
        items: newTo.map((task, index) => ({
                id: task.id,
                child_order: index
            }))

    })
}

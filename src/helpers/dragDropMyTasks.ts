import type {MoveTaskPayload, ReorderTaskPayload, Task} from "../types/task.type.ts";
import {arrayMove} from "@dnd-kit/sortable";

export const findTaskByIdToOrder = (tasks: Task[], id: string) => {
    return tasks.find(t => t.id === id);
}

export const getSiblings = (tasks: Task[], parent_id: string | null | undefined, section_id: string | null | undefined) => {
    return tasks.filter(t => t.parent_id === parent_id && t.section_id === section_id).sort((a, b) => (a.child_order ?? 0) - (b.child_order ?? 0));
}

export const handleReorderTask = async (tasks: Task[], activeTask: Task, overTask: Task, project_id: string | undefined | null, movingTask: (payload: MoveTaskPayload) => void, reorderTask: (payload: ReorderTaskPayload) => void) => {
    const fromParent = activeTask.parent_id ?? null
    const toParent = overTask.parent_id ?? null

    const fromSection = activeTask.section_id ?? null
    const toSection = overTask.section_id ?? null

    const isSameGroup = fromParent === toParent && fromSection === toSection

    if(isSameGroup){
        const siblings = getSiblings(tasks, fromParent, fromSection)
        const fromIndex = siblings.findIndex(t => t.id === activeTask.id)
        const toIndex = siblings.findIndex(t => t.id === overTask.id)

        const reordered = arrayMove(siblings, fromIndex, toIndex)
        reorderTask({
            items: reordered.map((task, index) => ({
                id: task.id,
                child_order: index + 1
            }))
        })
        return
    }

    await movingTask({
        id: activeTask.id,
        parent_id: toParent,
        section_id: toSection,
        ...(toSection || toParent ? {} : {project_id})
    })

    const updatedTasks = tasks.map(t => t.id === activeTask.id ? {...t, parent_id: toParent, section_id: toSection} : t)

    const toSiblings = getSiblings(updatedTasks, toParent, toSection)

    const toIndex = toSiblings.findIndex(t => t.id === overTask.id)

    const filtered = toSiblings.filter(t => t.id !== activeTask.id)
    const newTo = [...filtered]
    newTo.splice(toIndex, 0, {
        ...activeTask,
        parent_id: toParent,
        section_id: toSection,
    })

    reorderTask({
        items: newTo.map((task, index) => ({
                id: task.id,
                child_order: index + 1
            }))
    })

}

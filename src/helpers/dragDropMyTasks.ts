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

    // move task before
    const moveTaskPayload: MoveTaskPayload = {
        id: activeTask.id
    }
    // move to subtask that has a different parent id
    if(toParent !== null){
        moveTaskPayload.parent_id = toParent
    }
    // move to root in section
    else if(toSection !== null){
        moveTaskPayload.section_id = toSection
    }
    // move to root in project
    else{
        moveTaskPayload.project_id = project_id
    }
    movingTask(moveTaskPayload)

    // after moving task -> reordering task in a new scope
    // update task state after moving task to prepare for ordering tasks in a new sibling group
    const updatedTasks = tasks.map(t => t.id === activeTask.id ? {
        ...t,
        parent_id: toParent,
        section_id: toSection
    } : t)

    // identify and sort a new sibling group
    const siblings = getSiblings(updatedTasks, toParent, toSection)
    const fromIndex = siblings.findIndex(t => t.id === activeTask.id)
    const toIndex = siblings.findIndex(t => t.id === overTask.id)
    const reordered = arrayMove(siblings, fromIndex, toIndex)

    reorderTask({
        items: reordered.map((t, index) => ({
            id: t.id,
            child_order: index + 1
        }))
    })
}

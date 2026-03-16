import type {TaskResponse} from "@/types/task.type.ts";

export const getTasksByLabel = (labelId: string, tasksData?: TaskResponse) => {
    if(!tasksData) return []
    return tasksData?.results.filter(task => task.labels?.includes(labelId))
}
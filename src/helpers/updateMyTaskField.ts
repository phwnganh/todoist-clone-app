import {type MyTaskFormValues} from "../components/MyTasksComponent/MyTaskForm";
import {type MyTaskSectionFormValues} from '../components/MyTaskSectionComponent/MyTaskListSectionComponent/MyTaskListSectionForm.tsx'
import type {Task} from "../types/task.type.ts";
import {priorityFilterData} from "../data/myTaskFilter.data.ts";
import type {Project} from "../types/project.type.ts";
import type {Section} from "../types/section.type.ts";
export const updateMyTaskField = <K extends keyof MyTaskFormValues>(values: MyTaskFormValues, key: K, value: MyTaskFormValues[K]) => {
    return {
        ...values,
        [key]: value
    }
}

export const getTaskValuesByMappingDataType = (task: Task, projects: Project[] | undefined, sections: Section[] | undefined): MyTaskFormValues => {
    const project = projects?.find(p => p.id === task.project_id) ?? null
    const section = sections?.find(s => s.id === task.section_id) ?? null
    return {
        content: task.content,
        priority: priorityFilterData.find(p => p.value === task.priority) ?? null,
        description: task.description,
        project: project,
        section: section
    }
}

export const updateMyTaskSectionField = <K extends keyof MyTaskSectionFormValues>(values: MyTaskSectionFormValues, key: K, value: MyTaskSectionFormValues[K]) => {
    return {
        ...values,
        [key]: value
    }
}
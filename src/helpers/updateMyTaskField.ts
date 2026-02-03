import {type MyTaskFormValues} from "../components/MyTasksComponent/MyTaskForm";
import {type MyTaskSectionFormValues} from '../components/MyTaskSectionComponent/MyTaskListSectionComponent/MyTaskListSectionForm.tsx'
import type {Task} from "../types/task.type.ts";
import {priorityFilterData} from "../data/myTaskFilter.data.ts";
import type {Project} from "../types/project.type.ts";
import type {Section} from "../types/section.type.ts";
import type {
    TaskDetailHeaderFormValues
} from "../components/MyTasksComponent/MyTaskDetailModalDialog/MyTaskDetailMainSection/MyTaskDetailHeaderMainSection/MyTaskDetailHeaderForm.tsx";
import type {Label} from "../types/label.type.ts";
export const updateMyTaskField = <K extends keyof MyTaskFormValues>(values: MyTaskFormValues, key: K, value: MyTaskFormValues[K]) => {
    return {
        ...values,
        [key]: value
    }
}

export const updateMyTaskDetailHeader = <K extends keyof TaskDetailHeaderFormValues>(values: TaskDetailHeaderFormValues, key: K, value: TaskDetailHeaderFormValues[K]) => {
    return {
        ...values,
        [key]: value
    }
}

export const getTaskValuesByMappingDataType = (task: Task, projects: Project[] | undefined, sections: Section[] | undefined, labels: Label[] | undefined): MyTaskFormValues => {
    const project = projects?.find(p => p.id === task.project_id) ?? null
    const section = sections?.find(s => s.id === task.section_id) ?? null
    const label = labels?.filter(label => task.labels?.includes(label.name)) ?? []
    return {
        content: task.content,
        priority: priorityFilterData.find(p => p.value === task.priority) ?? null,
        description: task.description,
        project: project,
        section: section,
        labels: label
    }
}

export const updateMyTaskSectionField = <K extends keyof MyTaskSectionFormValues>(values: MyTaskSectionFormValues, key: K, value: MyTaskSectionFormValues[K]) => {
    return {
        ...values,
        [key]: value
    }
}
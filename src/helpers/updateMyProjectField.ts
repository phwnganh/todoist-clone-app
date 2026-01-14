import type {MyProjectFormValues} from "../components/MyProjectsComponent/MyProjectForm";
import {type Project} from "../types/project.type";
import {colorData} from "../data/colorData";

export const updateMyProjectField = <K extends keyof MyProjectFormValues> (values: MyProjectFormValues, key: K, value: MyProjectFormValues[K]) => {
    return {
        ...values,
        [key]: value
    }
}

export const getValuesByMappingDataType = (project: Project): MyProjectFormValues => {
    return {
        name: project.name,
        color: colorData.find(c => c.value === project.color) ?? null,
        parentProject: project.parent_id ?? null,
        layout: project.view_style ?? null,
    }
}
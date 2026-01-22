import {type MyTaskFormValues} from "../components/MyTasksComponent/MyTaskForm";
import {type MyTaskSectionFormValues} from '../components/MyTaskSectionComponent/MyTaskListSectionComponent/MyTaskListSectionForm.tsx'
export const updateMyTaskField = <K extends keyof MyTaskFormValues>(values: MyTaskFormValues, key: K, value: MyTaskFormValues[K]) => {
    return {
        ...values,
        [key]: value
    }
}

export const updateMyTaskSectionField = <K extends keyof MyTaskSectionFormValues>(values: MyTaskSectionFormValues, key: K, value: MyTaskSectionFormValues[K]) => {
    return {
        ...values,
        [key]: value
    }
}
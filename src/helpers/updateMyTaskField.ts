import {type MyTaskFormValues} from "../components/MyTasksComponent/MyTaskForm";

export const updateMyTaskField = <K extends keyof MyTaskFormValues>(values: MyTaskFormValues, key: K, value: MyTaskFormValues[K]) => {
    return {
        ...values,
        [key]: value
    }
}
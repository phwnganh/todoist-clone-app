import type {MyProjectFormValues} from "../components/MyProjectsComponent/MyProjectForm";

export const updateMyProjectField = <K extends keyof MyProjectFormValues> (values: MyProjectFormValues, key: K, value: MyProjectFormValues[K]) => {
    return {
        ...values,
        [key]: value
    }
}
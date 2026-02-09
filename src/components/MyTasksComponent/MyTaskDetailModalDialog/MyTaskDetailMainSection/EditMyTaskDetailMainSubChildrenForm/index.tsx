import {type FormEvent, useEffect, useState} from "react";
import MyTaskForm, {type MyTaskFormValues} from "../../../MyTaskForm";
import {priorityFilterData} from "../../../../../data/myTaskFilter.data.ts";
import type {Task, UpdateTaskPayload} from "../../../../../types/task.type.ts";
import {useTaskStore} from "../../../../../stores/task.store.ts";
import {getTaskValuesByMappingDataType} from "../../../../../helpers/updateMyTaskField.ts";
import {useGetAllProjects} from "../../../../../hooks/useQueryHook/useProjects.ts";
import {useGetAllSections} from "../../../../../hooks/useQueryHook/useSections.ts";
import {useUpdateMyTask} from "../../../../../hooks/useQueryHook/useTasks.ts";
import {useGetAllLabels} from "../../../../../hooks/useQueryHook/useLabels.ts";

type EditMyTaskDetailMainSubChildrenFormProps = {
    onCloseEditMySubTask: () => void,
    taskDetail?: Task
}
const EditMyTaskDetailMainSubChildrenForm = ({onCloseEditMySubTask, taskDetail}: EditMyTaskDetailMainSubChildrenFormProps) => {
    const [values, setValues] = useState<MyTaskFormValues>({
        content: "",
        description: "",
        due: null,
        priority: priorityFilterData.find(p => p.value === 1) ?? null,
        project: null,
        parentTask: null,
        section: null,
        labels: []
    })
    const {editingSubTaskId} = useTaskStore()
    const isEditMode = !!taskDetail?.id
    const {data: projects} = useGetAllProjects()
    const {data: sections} = useGetAllSections()
    const {data: labels} = useGetAllLabels()
    const {mutate} = useUpdateMyTask()
    useEffect(() => {
        if(!taskDetail) return;
        setValues(getTaskValuesByMappingDataType(taskDetail, projects?.results, sections?.results, labels?.results))
    }, [taskDetail, projects?.results, sections?.results, labels?.results])

    if(!editingSubTaskId) {
        return;
    }

    const subTaskFormValuesPayload = (values: MyTaskFormValues): UpdateTaskPayload => ({
        id: editingSubTaskId,
        content: values.content.trim(),
        description: values.description.trim(),
        priority: values.priority?.value,
        due_date: values.due_date
    })
    const handleUpdateMySubTask = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!editingSubTaskId) return;
        const payload = subTaskFormValuesPayload(values)
        mutate(payload)
        onCloseEditMySubTask()
    }
    return (
        <MyTaskForm onCloseMyTaskForm={onCloseEditMySubTask} onSubmit={handleUpdateMySubTask} submitLabel={"Save"} submittingLabel={"Saving..."} values={values} onChange={setValues} variant={"list"} isEditMode={isEditMode} />
    );
};

export default EditMyTaskDetailMainSubChildrenForm;
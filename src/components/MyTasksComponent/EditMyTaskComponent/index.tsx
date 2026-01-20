import {type FormEvent, useState} from 'react';
import MyTaskForm, {type MyTaskFormValues} from "../MyTaskForm";
import type {Task} from "../../../types/task.type.ts";
import {useGetAProject} from "../../../hooks/useProjects.ts";
import {useProjectStore} from "../../../stores/project.store.ts";

type EditMyTaskModalDialogProps = {
    onCloseEditMyTask: () => void;
    task: Task
}
const EditMyTaskModalDialog = ({onCloseEditMyTask, task}: EditMyTaskModalDialogProps) => {
    const projectId = useProjectStore(state => state.projectId)
    const {data: projectDetail} = useGetAProject(projectId)
    const [values, setValues] = useState<MyTaskFormValues>({
        content: task.content,
        description: task.description,
        due_date: "",
        priority: task.priority,
        project: projectDetail || null
    })

    const handleUpdateMyTask = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
    }
    return (
        <MyTaskForm values={values} onCloseMyTaskForm={onCloseEditMyTask} onChange={setValues} onSubmit={handleUpdateMyTask} submitLabel={"Save"} submittingLabel={"Saving..."} hideProjectContentTag={true}/>
    );
};

export default EditMyTaskModalDialog;
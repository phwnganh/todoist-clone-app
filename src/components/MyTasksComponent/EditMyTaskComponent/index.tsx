import {type FormEvent, useState} from 'react';
import MyTaskForm, {type MyTaskFormValues} from "../MyTaskForm";
import type {Task} from "../../../types/task.type.ts";

type EditMyTaskModalDialogProps = {
    onCloseEditMyTask: () => void;
    task: Task
}
const EditMyTaskModalDialog = ({onCloseEditMyTask, task}: EditMyTaskModalDialogProps) => {
    const [values, setValues] = useState<MyTaskFormValues>({
        content: task.content,
        description: task.description,
        due_date: "",
        priority: task.priority,
        project: task.project_id
    })

    const handleUpdateMyTask = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
    }
    return (
        <MyTaskForm values={values} onCloseMyTaskForm={onCloseEditMyTask} onChange={setValues} onSubmit={handleUpdateMyTask} submitLabel={"Save"} submittingLabel={"Saving..."}/>
    );
};

export default EditMyTaskModalDialog;
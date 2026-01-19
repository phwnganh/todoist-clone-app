import {type FormEvent, useState} from 'react';
import MyTaskForm, {type MyTaskFormValues} from "../MyTaskForm";

type EditMyTaskModalDialogProps = {
    onCloseEditMyTask: () => void;
}
const EditMyTaskModalDialog = ({onCloseEditMyTask}: EditMyTaskModalDialogProps) => {
    const [values, setValues] = useState<MyTaskFormValues>({
        content: "",
        description: "",
        due_date: "",
        priority: 0,
        project: ""
    })

    const handleUpdateMyTask = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
    }
    return (
        <MyTaskForm values={values} onCloseMyTaskForm={onCloseEditMyTask} onChange={setValues} onSubmit={handleUpdateMyTask} submitLabel={"Save"} submittingLabel={"Saving..."}/>
    );
};

export default EditMyTaskModalDialog;
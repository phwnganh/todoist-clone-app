import {type FormEvent, useState} from "react";
import MyTaskForm, {type MyTaskFormValues} from "../MyTaskForm";

type AddMyTaskModalDialogProps = {
    onCloseAddMyTask: () => void;
}
const AddMyTaskModalDialog = ({onCloseAddMyTask}: AddMyTaskModalDialogProps) => {
    const [values, setValues] = useState<MyTaskFormValues>({
        content: "",
        description: "",
        due_date: "",
        priority: 0,
        project_id: ""
    })

    const handleAddMyTask = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
    }
    return (
        <MyTaskForm values={values} onCloseAddMyTask={onCloseAddMyTask} onChange={setValues} onSubmit={handleAddMyTask} submitLabel={"Add task"} submittingLabel={"Adding..."}/>

    );
};

export default AddMyTaskModalDialog;
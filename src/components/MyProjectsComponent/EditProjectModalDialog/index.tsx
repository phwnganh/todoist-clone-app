import MyProjectForm, {type MyProjectFormValues} from "../MyProjectForm";
import {type FormEvent, useState} from "react";

const EditProjectModalDialog = ({ onClose }: { onClose: () => void }) => {
    const [values, setValues] = useState<MyProjectFormValues>({
        name: "",
        color: null,
        parentProject: null,
        layout: "list"
    });
    const handleEditMyProject = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
    }
    return (
        <MyProjectForm title={"Edit"} onClose={onClose} onSubmit={handleEditMyProject}
                       submitLabel={"Save"}
                       values={values}
                       onChange={setValues}
        />
    );
};

export default EditProjectModalDialog;
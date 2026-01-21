import {type FormEvent, useState} from "react";
import MyTaskSectionForm, {type MyTaskSectionFormValues} from "../MyTaskSectionForm.tsx";

type AddMyTaskSectionProps = {
    onCancelAddMyTaskSection: () => void,
}
const AddMyTaskSection = ({onCancelAddMyTaskSection}: AddMyTaskSectionProps) => {
    const [values, setValues] = useState<MyTaskSectionFormValues>({
        name: ""
    })

    const handleAddMyTaskSection = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <MyTaskSectionForm values={values} onCancel={onCancelAddMyTaskSection} onChange={setValues} onSubmit={handleAddMyTaskSection} submitLabel={"Add section"} submittingLabel={"Adding..."}/>
    );
};

export default AddMyTaskSection;
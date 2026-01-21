import {type ChangeEvent, type FormEvent} from "react";
import {updateMyTaskSectionField} from "../../helpers/updateMyTaskField.ts";

export type MyTaskSectionFormValues = {
    name: string;
}
type MyTaskSectionFormProps = {
    onCancel: () => void,
    onSubmit: (e: FormEvent<HTMLFormElement>) => void,
    submitLabel: string,
    submittingLabel: string,
    values: MyTaskSectionFormValues,
    onChange: (values: MyTaskSectionFormValues) => void,
}
const MyTaskSectionForm = ({onCancel, values, onChange, onSubmit, submitLabel, submittingLabel}: MyTaskSectionFormProps) => {
    const isAddButtonDisabled = values.name.trim() === ""

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(updateMyTaskSectionField(values, "name", e.target.value))
    }
    return (
        <form className={"flex flex-col gap-small mt-5"} onSubmit={onSubmit}>
            <input autoComplete={"off"} type={"text"} placeholder={"Name this section"} onChange={handleNameChange} value={values.name} className={"font-bold text-sm text-product-library-actionable-secondary-on-idle-tint outline outline-product-library-border-focus-tint hover:outline-product-library-border-hover-tint py-1.5 px-2 rounded-small"}/>
            <div className={"flex items-center gap-small"}>
                <button type={"submit"} className={`px-small py-1.5 text-xs ${
                    isAddButtonDisabled ? "bg-product-library-actionable-primary-disabled-fill cursor-not-allowed" :
                        "bg-product-library-actionable-primary-idle-fill hover:bg-product-library-actionable-primary-hover-fill"
                } text-white font-medium rounded-small`}>{submitLabel}</button>
                <button type={"button"} className={"px-small py-1.5 text-xs text-product-library-actionable-secondary-on-idle-tint rounded-small hover:bg-product-library-selectable-secondary-hover-fill"} onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default MyTaskSectionForm;
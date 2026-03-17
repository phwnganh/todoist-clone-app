import {type FormEvent, useState} from "react";
import LabelsForm, {type LabelsFormValues} from "@/components/FiltersLabelsComponent/LabelsForm/LabelsForm.tsx";
import {useCreateLabels} from "@/hooks/useQueryHook/useLabels.ts";
import type {LabelPayload} from "@/types/label.type.ts";
import {useLabelStore} from "@/stores/label.store.ts";


const AddLabelsModalDialog = () => {
    const [values, setValues] = useState<LabelsFormValues>({
        name: "",
        color: null
    })
    const {onCloseLabelModalDialog} = useLabelStore()
    const {mutate, isPending, isError, error} = useCreateLabels()
    const formValuesPayload = (values: LabelsFormValues): LabelPayload => {
        return {
            name: values.name.trim(),
            color: values.color?.value
        }
    }

    const handleCreateLabel = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = formValuesPayload(values)
        mutate(payload)
        onCloseLabelModalDialog()
    }
    return (
        <LabelsForm title={"Add Label"} onClose={onCloseLabelModalDialog} onSubmit={handleCreateLabel} submitLabel={"Add"} submittingLabel={"Adding"} values={values} onChange={setValues} isPending={isPending} errorMessage={isError ? error.message : null}/>
    );
};

export default AddLabelsModalDialog;
import {useLabelStore} from "@/stores/label.store.ts";
import {useUpdateLabels} from "@/hooks/useQueryHook/useLabels.ts";
import {type FormEvent, useEffect, useState} from "react";
import LabelsForm, {type LabelsFormValues} from "@/components/FiltersLabelsComponent/LabelsForm/LabelsForm.tsx";
import type {Label} from "@/types/label.type.ts";
import {getValuesByMappingDataType} from "@/helpers/updateLabelField.ts";

type EditLabelModalDialogProps = {
    label: Label;
}
const EditLabelModalDialog = ({label}: EditLabelModalDialogProps) => {
    const {onCloseEditLabelModalDialog} = useLabelStore()
    const {mutate, isPending, isError, error} = useUpdateLabels()
    const [values, setValues] = useState<LabelsFormValues>({
        name: "",
        color: null
    })

    useEffect(() => {
        if(!label) return;
        setValues(getValuesByMappingDataType(label));
    }, [label]);

    const handleUpdateLabel = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate({
            id: label.id,
            name: values.name.trim(),
            color: values.color?.value ?? "charcoal"
        })
        onCloseEditLabelModalDialog()
    }
    return (
        <LabelsForm title={"Edit Label"}
        onClose={onCloseEditLabelModalDialog}
        onSubmit={handleUpdateLabel}
        submitLabel={"Save"}
        submittingLabel={"Saving..."}
        values={values}
        onChange={setValues}
        isPending={isPending}
        errorMessage={isError ? error.message : null}>
        </LabelsForm>
    );
};

export default EditLabelModalDialog;
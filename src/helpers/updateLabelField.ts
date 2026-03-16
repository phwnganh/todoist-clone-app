import type {LabelsFormValues} from "@/components/FiltersLabelsComponent/LabelsForm/LabelsForm.tsx";
import type {Label} from "@/types/label.type.ts";
import {colorData} from "@/data/color.data.ts";

export const updateLabelField = <K extends keyof LabelsFormValues>(values: LabelsFormValues, key: K, value: LabelsFormValues[K]) => {
    return {
        ...values,
        [key]: value
    }
}

export const getValuesByMappingDataType = (label: Label): LabelsFormValues => {
    return {
        name: label.name,
        color: colorData.find(c => c.value === label.color) ?? null
    }
}
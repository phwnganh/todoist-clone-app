import type {Color} from "@/types/color.type.ts";
import {type ChangeEvent, type FormEvent, useRef, useState} from "react";
import type {OpenLabelsDropdown} from "@/types/menu-nav.type.ts";
import {updateLabelField} from "@/helpers/updateLabelField.ts";
import {useClickOutside} from "@/hooks/useClickOutside.ts";
import CustomDialog from "@/components/ui/CustomDialog.tsx";
import QuestionIcon from "@/components/icons/QuestionIcon.tsx";
import LargeCloseIcon from "@/components/icons/LargeCloseIcon.tsx";
import CustomSwitch from "@/components/ui/CustomSwitch.tsx";
import LabelNameSection from "@/components/FiltersLabelsComponent/EachLabelFieldSection/LabelNameSection.tsx";
import LabelColorSection from "@/components/FiltersLabelsComponent/EachLabelFieldSection/LabelColorSection.tsx";
export type LabelsFormValues = {
    name: string;
    color: Color | null;
}

type LabelsFormProps = {
    title: string;
    onClose: () => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    submittingLabel: string;
    values: LabelsFormValues;
    onChange: (values: LabelsFormValues) => void;
    isPending?: boolean;
    errorMessage?: string | null;
}
const LabelsForm = ({title, onClose, onSubmit, submitLabel, submittingLabel, values, onChange, isPending, errorMessage}: LabelsFormProps) => {
    const [openDropdown, setOpenDropdown] = useState<OpenLabelsDropdown>(null)
    const colorRef = useRef<HTMLDivElement | null>(null)
    const dummyRef = useRef<HTMLDivElement | null>(null)

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(updateLabelField(values, "name", e.target.value))
    }

    const handleToggleDropdown = (name: OpenLabelsDropdown) => {
        setOpenDropdown(prev => (prev === name ? null : name))
    }

    const handleSelectColor = (color: Color) => {
        onChange(updateLabelField(values, "color", color))
        setOpenDropdown(null)
    }

    useClickOutside({
        ref: openDropdown === "color" ? colorRef : dummyRef,
        handler: () => setOpenDropdown(null),
        enabled: openDropdown !== null
    })

    const isAddButtonDisabled = values.name.trim() === "" || isPending
    return (
        <CustomDialog role={"dialog"} labelTitle={"label-title"} className={"w-120"}>
            <header className="flex justify-between py-2 pr-2 pl-4">
                <div className="flex flex-wrap gap-xsmall">
                    <h1
                        id="label-title"
                        className="font-medium text-product-library-display-primary-idle-tint"
                    >
                        {title}
                    </h1>
                    <div className="flex justify-center items-center">
                        <QuestionIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                    </div>
                </div>
                <button
                    aria-label="Close dialog"
                    className="flex justify-center items-center"
                    onClick={onClose}
                >
                    <LargeCloseIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                </button>
            </header>
            <hr className="border-t border-t-product-library-divider-tertiary" />
            <form onSubmit={onSubmit}>
                <div className={"p-4 flex flex-col gap-large"}>
                    <LabelNameSection onNameChange={handleNameChange} nameValue={values.name}/>
                    <LabelColorSection colorRef={colorRef} openLabelDropdown={openDropdown} onToggleLabelDropdown={handleToggleDropdown} colorValue={values.color} onSelectColor={handleSelectColor}/>

                    <div className="flex items-center">
                        <div
                            role="switch"
                            aria-checked="true"
                            className="mr-2 flex justify-center items-center"
                        >
                            <CustomSwitch />
                        </div>
                        <div className="text-sm text-product-library-display-primary-idle-tint">
                            Add to favorites
                        </div>
                    </div>
                    <hr className="border-t border-t-product-library-divider-tertiary" />
                </div>
                {errorMessage && (
                    <div
                        className={
                            "text-sm text-product-library-actionable-destructive-idle-tint"
                        }
                        role={"alert"}
                    >
                        {errorMessage}
                    </div>
                )}

                <footer className="flex justify-end px-4 pb-4 gap-2.5">
                    <button
                        type="button"
                        className="px-3 py-1.5 rounded-small bg-product-library-actionable-secondary-idle-fill flex justify-center items-center min-w-17"
                        onClick={onClose}
                    >
              <span className="text-sm font-medium text-product-library-actionable-secondary-on-idle-tint">
                Cancel
              </span>
                    </button>
                    <button
                        type="submit"
                        className={`px-3 py-1.5 rounded-small  flex justify-center items-center min-w-17 ${
                            isAddButtonDisabled
                                ? "bg-product-library-actionable-primary-disabled-fill cursor-not-allowed"
                                : "bg-product-library-actionable-primary-idle-fill hover:bg-product-library-actionable-primary-hover-fill"
                        }`}
                        disabled={isAddButtonDisabled}
                    >
              <span className="text-sm font-medium text-product-library-actionable-primary-on-idle-tint">
                {isPending ? submittingLabel : submitLabel}
              </span>
                    </button>
                </footer>
            </form>
        </CustomDialog>
    );
};

export default LabelsForm;
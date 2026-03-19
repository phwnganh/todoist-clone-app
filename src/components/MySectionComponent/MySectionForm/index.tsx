import { type ChangeEvent, type FormEvent } from "react";
import { updateMyTaskSectionField } from "@/helpers/updateMyTaskField.ts";
import CustomButton from "@/components/ui/CustomButton.tsx";

export type MyTaskSectionFormValues = {
  name: string;
};
type MyTaskSectionFormProps = {
  onCancel: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
  submittingLabel: string;
  isPending: boolean;
  values: MyTaskSectionFormValues;
  onChange: (values: MyTaskSectionFormValues) => void;
};
const MySectionForm = ({
  onCancel,
  values,
  onChange,
  onSubmit,
  submitLabel,
  submittingLabel,
    isPending
}: MyTaskSectionFormProps) => {
  const isAddButtonDisabled = values.name.trim() === "";

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(updateMyTaskSectionField(values, "name", e.target.value));
  };
  return (
    <form className={"flex flex-col gap-small"} onSubmit={onSubmit}>
      <input
        autoComplete={"off"}
        type={"text"}
        placeholder={"Name this section"}
        onChange={handleNameChange}
        value={values.name}
        className={
          "font-bold text-sm text-product-library-actionable-secondary-on-idle-tint outline outline-product-library-border-focus-tint hover:outline-product-library-border-hover-tint py-1.5 px-2 rounded-small"
        }
      />
      <div className={"flex items-center gap-small"}>
        <CustomButton type={"submit"} className={`px-3 py-1.5  ${
            isAddButtonDisabled
                ? "bg-product-library-actionable-primary-disabled-fill cursor-not-allowed"
                : "bg-product-library-actionable-primary-idle-fill hover:bg-product-library-actionable-primary-hover-fill"
        }`}>
          <span className={"text-product-library-actionable-primary-on-idle-tint text-xs font-medium"}>{isPending ? submittingLabel : submitLabel}</span>
        </CustomButton>
        <CustomButton type={"button"} onClick={onCancel} className={`px-3 py-1.5 hover:bg-product-library-selectable-secondary-hover-fill`}>
          <span className={"text-xs text-product-library-actionable-secondary-on-idle-tint"}>Cancel</span>
        </CustomButton>
      </div>
    </form>
  );
};

export default MySectionForm;

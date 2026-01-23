import { type Section } from "../../../types/section.type.ts";
import { type FormEvent, useState } from "react";
import MyTaskListSectionForm, {
  type MyTaskSectionFormValues,
} from "../MyTaskListSectionComponent/MyTaskListSectionForm.tsx";

type EditMyTaskSectionProps = {
  onCancelEditMyTaskSection: () => void;
  section: Section;
};
const EditMyTaskSection = ({
  section,
  onCancelEditMyTaskSection,
}: EditMyTaskSectionProps) => {
  const [values, setValues] = useState<MyTaskSectionFormValues>({
    name: section.name,
  });

  const handleUpdateMyTaskSection = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <MyTaskListSectionForm
      values={values}
      onCancel={onCancelEditMyTaskSection}
      onSubmit={handleUpdateMyTaskSection}
      submitLabel={"Save"}
      submittingLabel={"Saving..."}
      onChange={setValues}
    />
  );
};

export default EditMyTaskSection;

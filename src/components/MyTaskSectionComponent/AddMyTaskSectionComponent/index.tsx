import { type FormEvent, useState } from "react";
import MyTaskListSectionForm, {
  type MyTaskSectionFormValues,
} from "../MyTaskListSectionComponent/MyTaskListSectionForm.tsx";
import {useAddSection} from "@/hooks/useQueryHook/useSections";
import {useProjectStore} from "@/stores/project.store";
import { useSectionStore } from "@/stores/section.store.ts";

const AddMyTaskSection = () => {
  const [values, setValues] = useState<MyTaskSectionFormValues>({
    name: "",
  });
  const {projectId} = useProjectStore()
  const {onCloseAddFinalSectionForm} = useSectionStore()
  const {mutate, isPending} = useAddSection()

  const handleAddMyTaskSection = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      name: values.name,
      project_id: projectId
    })
    onCloseAddFinalSectionForm();
  };
  return (
    <div className={"mt-1"}>
      <MyTaskListSectionForm
        values={values}
        onCancel={onCloseAddFinalSectionForm}
        onChange={setValues}
        onSubmit={handleAddMyTaskSection}
        submitLabel={"Add section"}
        submittingLabel={"Adding..."}
        isPending={isPending}
      />
    </div>
  );
};

export default AddMyTaskSection;

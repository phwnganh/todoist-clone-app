import { type FormEvent, useState } from "react";
import MySectionForm, {
  type MyTaskSectionFormValues,
} from "../MySectionForm";
import {useAddSection} from "@/hooks/useQueryHook/useSections";
import {useProjectStore} from "@/stores/project.store";
import { useSectionStore } from "@/stores/section.store.ts";

const AddMySection = () => {
  const [values, setValues] = useState<MyTaskSectionFormValues>({
    name: "",
  });
  const {projectId} = useProjectStore()
  const {onCloseAddFinalSectionForm, onCloseAddSectionForm} = useSectionStore()
  const {mutate, isPending} = useAddSection()

  const handleAddMyTaskSection = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      name: values.name,
      project_id: projectId
    })
    onCloseAddSectionForm()
    onCloseAddFinalSectionForm();
  };
  return (
    <div className={"mt-1"}>
      <MySectionForm
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

export default AddMySection;

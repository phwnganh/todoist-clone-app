import { type Section } from "@/types/section.type.ts";
import {type FormEvent, useEffect, useState} from "react";
import MyTaskListSectionForm, {
  type MyTaskSectionFormValues,
} from "../MyTaskListSectionComponent/MyTaskListSectionForm.tsx";
import {useSectionStore} from "@/stores/section.store.ts";
import {useUpdateSection} from "@/hooks/useQueryHook/useSections.ts";
import {useProjectStore} from "@/stores/project.store.ts";

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
  const {editingSectionId} = useSectionStore()
  const {projectId} = useProjectStore()
  const {mutate, isPending} = useUpdateSection()

  useEffect(() => {
    if(!section) return;
    setValues({name: section.name, });
  }, [section])

  const handleUpdateMyTaskSection = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!editingSectionId) return;
    mutate({
      id: editingSectionId,
      name: values.name.trim(),
      project_id: projectId
    })
    onCancelEditMyTaskSection()
  };
  return (
    <MyTaskListSectionForm
      values={values}
      onCancel={onCancelEditMyTaskSection}
      onSubmit={handleUpdateMyTaskSection}
      submitLabel={"Save"}
      submittingLabel={"Saving..."}
      onChange={setValues}
      isPending={isPending}
    />
  );
};

export default EditMyTaskSection;

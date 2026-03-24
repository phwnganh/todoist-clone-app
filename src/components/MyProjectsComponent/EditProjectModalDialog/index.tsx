import MyProjectForm, { type MyProjectFormValues } from "../MyProjectForm";
import { type FormEvent, useEffect, useState } from "react";
import {useUpdateProject } from "@/hooks/useQueryHook/useProjects.ts";
import { getValuesByMappingDataType } from "@/helpers/updateMyProjectField";
import type {Project} from "@/types/project.type.ts";
const EditProjectModalDialog = ({
  onClose,
  project,
}: {
  onClose: () => void;
  project: Project;
}) => {
  const { mutate, isPending, isError, error } = useUpdateProject();
  const [values, setValues] = useState<MyProjectFormValues>({
    name: "",
    color: null,
    parentProject: null,
    layout: "list",
  });

  useEffect(() => {
    if (!project) return;
    setValues(getValuesByMappingDataType(project));
  }, [project]);
  const handleEditMyProject = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        id: project.id,
        name: values.name.trim(),
        color: values.color?.value ?? "charcoal",
        parent_id: values?.parentProject ?? "No Parent",
        view_style: values.layout,
      },
    );
    onClose();
  };
  return (
    <MyProjectForm
      title={"Edit"}
      onClose={onClose}
      onSubmit={handleEditMyProject}
      submitLabel={"Save"}
      submittingLabel={"Saving..."}
      values={values}
      onChange={setValues}
      isPending={isPending}
      errorMessage={isError ? error?.message : null}
    />
  );
};

export default EditProjectModalDialog;

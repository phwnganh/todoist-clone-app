import { type FormEvent, useState } from "react";
import MyProjectForm, { type MyProjectFormValues } from "../MyProjectForm";
import { useAddProject } from "../../../hooks/useQueryHook/useProjects.ts";
import type { ProjectPayload } from "../../../types/project.type.ts";

const AddProjectsModalDialog = ({ onClose }: { onClose: () => void }) => {
  const [values, setValues] = useState<MyProjectFormValues>({
    name: "",
    color: null,
    parentProject: null,
    layout: "list",
  });
  const { mutate, isPending, isError, error } = useAddProject();

  const formValuesPayload = (values: MyProjectFormValues): ProjectPayload => {
    return {
      name: values.name.trim(),
      color: values.color?.value,
      parent_id:
        values.parentProject && values.parentProject !== "No Parent"
          ? values.parentProject
          : undefined,
      view_style: values.layout,
    };
  };
  const handleAddMyProjects = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = formValuesPayload(values);
    mutate(payload);
    onClose();
  };

  return (
    <MyProjectForm
      title={"Add Project"}
      onClose={onClose}
      onSubmit={handleAddMyProjects}
      submitLabel={"Add"}
      submittingLabel={"Adding..."}
      values={values}
      onChange={setValues}
      isPending={isPending}
      errorMessage={isError ? error.message : null}
    />
  );
};

export default AddProjectsModalDialog;

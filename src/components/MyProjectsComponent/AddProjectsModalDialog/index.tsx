import {type FormEvent, useState} from "react";
import MyProjectForm, {type MyProjectFormValues} from "../MyProjectForm";

const AddProjectsModalDialog = ({ onClose }: { onClose: () => void }) => {
  const [values, setValues] = useState<MyProjectFormValues>({
    name: "",
    color: null,
    parentProject: null,
    layout: "list"
  });
  const handleAddMyProjects = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
      <MyProjectForm title={"Add Project"} onClose={onClose} onSubmit={handleAddMyProjects}
      submitLabel={"Add"}
                     values={values}
                     onChange={setValues}
      />
  )
};

export default AddProjectsModalDialog;

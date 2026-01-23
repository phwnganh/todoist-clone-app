import { type FormEvent, useState } from "react";
import MyTaskForm, { type MyTaskFormValues } from "../MyTaskForm";

type AddMyTaskModalDialogProps = {
  onCloseAddMyTask: () => void;
  variant?: "board" | "list";
};
const AddMyTaskModalDialog = ({
  onCloseAddMyTask,
  variant,
}: AddMyTaskModalDialogProps) => {
  const [values, setValues] = useState<MyTaskFormValues>({
    content: "",
    description: "",
    due_date: "",
    priority: 0,
    project: null,
  });

  const handleAddMyTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <MyTaskForm
      variant={variant}
      values={values}
      onCloseMyTaskForm={onCloseAddMyTask}
      onChange={setValues}
      onSubmit={handleAddMyTask}
      submitLabel={"Add task"}
      submittingLabel={"Adding..."}
    />
  );
};

export default AddMyTaskModalDialog;

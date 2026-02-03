import { type FormEvent, useState } from "react";
import MyTaskForm, { type MyTaskFormValues } from "../MyTaskForm";
import {priorityFilterData} from "../../../data/myTaskFilter.data.ts";
import {useAddMyTask} from "../../../hooks/useQueryHook/useTasks.ts";
import type {TaskPayload} from "../../../types/task.type.ts";
import {useProjectStore} from "../../../stores/project.store.ts";
import {useTaskStore} from "../../../stores/task.store.ts";

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
    priority: priorityFilterData.find(p => p.value === 1) ?? null,
    project: null,
    section: null,
    labels: []
  });

  const {mutate, isPending, isError, error} = useAddMyTask()
  const {projectId} = useProjectStore()
  const {addingTaskId} = useTaskStore()

  const taskFormValuesPayload = (values: MyTaskFormValues): TaskPayload => {
    return {
      content: values.content.trim(),
      description: values.description.trim(),
      parent_id: values.parentTask?.parent_id ?? null,
      project_id: values?.project?.id ?? projectId,
      section_id: values?.section?.id ?? addingTaskId ?? null,
      priority: values.priority?.value,
      labels: values.labels.map((label) => label.name),
    }
  }


  const handleAddMyTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = taskFormValuesPayload(values);
    mutate(payload)
    onCloseAddMyTask()
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
      isPending={isPending}
      errorMessage={isError ? error.message : null}
    />
  );
};

export default AddMyTaskModalDialog;

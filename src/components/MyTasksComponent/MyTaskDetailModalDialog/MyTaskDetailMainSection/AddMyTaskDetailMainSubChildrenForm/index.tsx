import { type FormEvent, useState } from "react";
import MyTaskForm, { type MyTaskFormValues } from "../../../MyTaskForm";
import { priorityFilterData } from "../../../../../data/myTaskFilter.data.ts";
import { useAddMySubTask } from "../../../../../hooks/useQueryHook/useTasks.ts";
import { useTaskStore } from "../../../../../stores/task.store.ts";
import type { SubTaskPayload, Task } from "../../../../../types/task.type.ts";
type AddMyTaskDetailMainSubChildrenFormProps = {
  onCloseAddMySubTask: () => void;
  taskDetail?: Task;
};
const AddMyTaskDetailMainSubChildrenForm = ({
  onCloseAddMySubTask,
  taskDetail,
}: AddMyTaskDetailMainSubChildrenFormProps) => {
  const [values, setValues] = useState<MyTaskFormValues>({
    content: "",
    description: "",
    due: null,
    priority: priorityFilterData.find((p) => p.value === 1) ?? null,
    project: null,
    parentTask: taskDetail ?? null,
    section: null,
    labels: [],
  });
  const { mutate } = useAddMySubTask();
  const { addingSubTaskId } = useTaskStore();

  if (!addingSubTaskId) {
    return;
  }
  const subTaskFormValuesPayload = (
    values: MyTaskFormValues,
  ): SubTaskPayload => ({
    content: values.content.trim(),
    description: values.description.trim(),
    parent_id: addingSubTaskId,
    priority: values.priority?.value,
    labels: values.labels.map((label) => label.name),
    due: values.due,
  });

  const handleAddMySubTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = subTaskFormValuesPayload(values);
    mutate(payload);
    onCloseAddMySubTask();
  };
  return (
    <MyTaskForm
      onCloseMyTaskForm={onCloseAddMySubTask}
      onSubmit={handleAddMySubTask}
      submitLabel={"Add task"}
      submittingLabel={"Adding..."}
      values={values}
      onChange={setValues}
      variant={"list"}
    />
  );
};

export default AddMyTaskDetailMainSubChildrenForm;

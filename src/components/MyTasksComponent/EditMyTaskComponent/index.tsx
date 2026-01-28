import {type FormEvent, useEffect, useState} from "react";
import MyTaskForm, { type MyTaskFormValues } from "../MyTaskForm";
import type { Task } from "../../../types/task.type.ts";
import {useGetAllProjects, useGetAProject} from "../../../hooks/useQueryHook/useProjects.ts";
import { useProjectStore } from "../../../stores/project.store.ts";
import {useGetATask, useUpdateMyTask} from "../../../hooks/useQueryHook/useTasks.ts";
import {useTaskStore} from "../../../stores/task.store.ts";
import {getTaskValuesByMappingDataType} from "../../../helpers/updateMyTaskField.ts";
import {useGetAllSections} from "../../../hooks/useQueryHook/useSections.ts";

type EditMyTaskModalDialogProps = {
  onCloseEditMyTask: () => void;
  task: Task;
  variant?: "board" | "list";
};
const EditMyTaskModalDialog = ({
  onCloseEditMyTask,
  task,
  variant,
}: EditMyTaskModalDialogProps) => {
  const {editingTaskId} = useTaskStore()
  const isEditMode = !!task.id
  const {data: taskDetail} = useGetATask(editingTaskId)
  const {data: projects} = useGetAllProjects()
  const {data: sections} = useGetAllSections()
  const {mutate, isPending, isError, error} = useUpdateMyTask()
  const [values, setValues] = useState<MyTaskFormValues>({
    content: "",
    description: "",
    priority: null,
    project: null,
    section: null,
    parentTask: null
  });

  useEffect(() => {
    if(!taskDetail) return;
    setValues(getTaskValuesByMappingDataType(taskDetail, projects?.results, sections?.results))
  }, [taskDetail, projects?.results, sections?.results]);

  const handleUpdateMyTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!editingTaskId) return;
    mutate({
      id: editingTaskId,
      content: values.content.trim(),
      description: values.description.trim(),
      priority: values.priority?.value ?? 1,
    })
    onCloseEditMyTask();
  };
  return (
    <MyTaskForm
      variant={variant}
      values={values}
      onCloseMyTaskForm={onCloseEditMyTask}
      onChange={setValues}
      onSubmit={handleUpdateMyTask}
      submitLabel={"Save"}
      submittingLabel={"Saving..."}
      isEditMode={isEditMode}
      isPending={isPending}
      errorMessage={isError ? error?.message : null}
    />
  );
};

export default EditMyTaskModalDialog;

import {type FormEvent, useEffect, useRef, useState} from "react";
import MyTaskForm, { type MyTaskFormValues } from "../MyTaskForm";
import type { Task } from "../../../types/task.type.ts";
import {useGetAllProjects} from "../../../hooks/useQueryHook/useProjects.ts";
import {useMoveMyTask, useUpdateMyTask} from "../../../hooks/useQueryHook/useTasks.ts";
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
  const {data: projects} = useGetAllProjects()
  const {data: sections} = useGetAllSections()
  const {mutate, isPending, isError, error} = useUpdateMyTask()
  const {mutate: moveTaskMutate} = useMoveMyTask()
  const [values, setValues] = useState<MyTaskFormValues>({
    content: "",
    description: "",
    priority: null,
    project: null,
    section: null,
    parentTask: null
  });

  const initialProjectSection = useRef({
    projectId: task.project_id ?? null,
    sectionId: task.section_id ?? null,
  })

  const desiredProjectSection = {
    projectId: values.project?.id ?? null,
    sectionId: values.section?.id ?? null,
  }

  useEffect(() => {
    if(!task) return;
    setValues(getTaskValuesByMappingDataType(task, projects?.results, sections?.results))
  }, [task, projects?.results, sections?.results]);

  const handleUpdateMyTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!editingTaskId) return;

    const {projectId, sectionId} = desiredProjectSection
    const initial = initialProjectSection.current

    const isProjectSectionChanged = projectId !== initial.projectId || sectionId !== initial.sectionId

    try {
      if(isProjectSectionChanged){
        if(sectionId){
          moveTaskMutate({
            id: editingTaskId,
            section_id: sectionId,
          })
        }else if(projectId){
          moveTaskMutate({
            id: editingTaskId,
            project_id: projectId,
          })
        }
      }
      mutate({
        id: editingTaskId,
        content: values.content.trim(),
        description: values.description.trim(),
        priority: values.priority?.value ?? 1,
      })
      onCloseEditMyTask();

    }catch (err){
      console.error(err)
    }
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

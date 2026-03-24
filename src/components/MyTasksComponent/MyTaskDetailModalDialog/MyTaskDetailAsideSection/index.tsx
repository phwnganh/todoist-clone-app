import type { Project } from "@/types/project.type.ts";
import type { OpenMyTaskDetailAsideDropdown } from "@/types/menu-nav.type.ts";
import { useMemo, useRef, useState } from "react";
import type { Section } from "@/types/section.type.ts";
import type { Due, Priority, Task } from "@/types/task.type.ts";
import { useClickOutside } from "@/hooks/useClickOutside.ts";
import { getTaskValuesByMappingDataType } from "@/helpers/updateMyTaskField.ts";
import { useGetAllProjects } from "@/hooks/useQueryHook/useProjects.ts";
import { useGetAllSections } from "@/hooks/useQueryHook/useSections.ts";
import {
  useMoveMyTask,
  useUpdateMyTask,
} from "@/hooks/useQueryHook/useTasks.ts";
import type { Label } from "@/types/label.type.ts";
import { useGetAllLabels } from "@/hooks/useQueryHook/useLabels.ts";
import { getDueInfo } from "@/helpers/formateDate.ts";
import TaskDetailAsideProjectSection from "./TaskDetailAsideProjectSection.tsx";
import TaskDetailAsideDateSection from "./TaskDetailAsideDateSection.tsx";
import TaskDetailAsidePrioritySection from "./TaskDetailAsidePrioritySection.tsx";
import TaskDetailAsideLabelSection from "./TaskDetailAsideLabelSection.tsx";

type MyTaskDetailAsideProps = {
  taskDetail?: Task;
};
const MyTaskDetailAside = ({ taskDetail }: MyTaskDetailAsideProps) => {
  const [isOpenMyTaskDetailAside, setIsOpenMyTaskDetailAside] =
    useState<OpenMyTaskDetailAsideDropdown>(null);
  const { data: projects } = useGetAllProjects();
  const { data: sections } = useGetAllSections();
  const { data: labels } = useGetAllLabels();
  const { project, section, priority, due } = useMemo(() => {
    if (!taskDetail || !projects || !sections || !labels) {
      return {
        project: null,
        section: null,
        priority: null,
        due: null,
      };
    }
    return getTaskValuesByMappingDataType(
      taskDetail,
      projects.results,
      sections.results,
      labels.results,
    );
  }, [taskDetail, projects, sections, labels]);
  const selectedProject = project;
  const selectedSection = section;
  const selectedPriority = priority;
  const selectedDue = due;
  const selectedLabels = useMemo(() => {
    if (!taskDetail || !labels) return [];
    return labels?.results?.filter((label) =>
      taskDetail.labels?.includes(label.name),
    );
  }, [taskDetail, labels]);
  const projectRef = useRef<HTMLDivElement | null>(null);
  const dateRef = useRef<HTMLDivElement | null>(null);
  const priorityRef = useRef<HTMLDivElement | null>(null);
  const labelsRef = useRef<HTMLDivElement | null>(null);
  const dummyRef = useRef<HTMLDivElement | null>(null);
  const { mutate } = useUpdateMyTask();
  const { mutate: mutateMoveTask } = useMoveMyTask();
  const { category, label } = getDueInfo(selectedDue?.date);

  const handleToggleDropdown = (name: OpenMyTaskDetailAsideDropdown) => {
    setIsOpenMyTaskDetailAside((prev) => (prev === name ? null : name));
  };

  const handleMoveProject = (project: Project) => {
    if (!taskDetail) return;
    setIsOpenMyTaskDetailAside(null);
    mutateMoveTask({
      id: taskDetail.id,
      project_id: project.id,
    });
  };

  const handleMoveSection = (section: Section) => {
    if (!taskDetail) return;
    setIsOpenMyTaskDetailAside(null);
    mutateMoveTask({
      id: taskDetail.id,
      section_id: section.id,
    });
  };

  const handleSelectPriority = (priority: Priority) => {
    setIsOpenMyTaskDetailAside(null);
    if (!taskDetail) return;
    mutate({
      id: taskDetail?.id,
      content: taskDetail?.content,
      priority: priority.value,
    });
  };

  const handleSelectDate = (date: Due) => {
    if (!taskDetail) return;
    setIsOpenMyTaskDetailAside(null);
    mutate({
      id: taskDetail?.id,
      content: taskDetail?.content,
      due: date,
    });
  };
  const handleSelectLabels = (label: Label) => {
    if (!taskDetail) return;
    const existed = taskDetail.labels?.includes(label.name);
    const nextLabels = existed
      ? taskDetail.labels?.filter((l) => l !== label.name)
      : [...(taskDetail.labels ?? []), label.name];
    mutate({
      id: taskDetail.id,
      content: taskDetail.content,
      labels: nextLabels,
    });
  };

  const handleRemoveLabel = (id: string) => {
    if (!taskDetail) return;
    const labelName = labels?.results.find((l) => l.id === id)?.name;
    if (!labelName) return;

    mutate({
      id: taskDetail.id,
      content: taskDetail.content,
      labels: taskDetail.labels?.filter((l) => l !== labelName),
    });
  };

  const handleRemoveDate = () => {
    if (!taskDetail) return;
    mutate({
      id: taskDetail?.id,
      content: taskDetail.content,
      due: null,
    });
  };

  useClickOutside({
    ref:
      isOpenMyTaskDetailAside === "project"
        ? projectRef
        : isOpenMyTaskDetailAside === "priority"
          ? priorityRef
          : isOpenMyTaskDetailAside === "date"
            ? dateRef
            : isOpenMyTaskDetailAside === "labels"
              ? labelsRef
              : dummyRef,
    handler: () => setIsOpenMyTaskDetailAside(null),
    enabled: isOpenMyTaskDetailAside !== null,
  });
  return (
    <aside
      className={
        "p-large mt-3 md:mt-0 md:bg-product-library-background-base-secondary flex flex-col w-full gap-small md:w-80 shrink-0 border-t-6 border-t-product-library-divider-tertiary md:border-t-0 text-product-library-display-primary-idle-tint"
      }
    >
      <div className={"flex flex-col gap-1.5"}>
        <TaskDetailAsideProjectSection project={project} section={section} selectedProject={selectedProject} selectedSection={selectedSection} isOpenMyTaskDetailAside={isOpenMyTaskDetailAside === "project"} projectRef={projectRef} onToggle={() => handleToggleDropdown("project")} onMoveProject={handleMoveProject} onMoveSection={handleMoveSection}/>
        <TaskDetailAsideDateSection selectedDue={selectedDue} category={category} label={label} isOpenMyTaskDetailAside={isOpenMyTaskDetailAside === "date"} dateRef={dateRef} onToggle={() => handleToggleDropdown("date")} onSelectDate={handleSelectDate} onRemoveDate={handleRemoveDate}/>
        <TaskDetailAsidePrioritySection selectedPriority={selectedPriority} priorityRef={priorityRef} isOpenMyTaskDetailAside={isOpenMyTaskDetailAside === "priority"} onToggle={() => handleToggleDropdown("priority")} onSelectPriority={handleSelectPriority}/>
        <TaskDetailAsideLabelSection selectedLabels={selectedLabels} labelsRef={labelsRef} isOpenMyTaskDetailAside={isOpenMyTaskDetailAside === "labels"} onToggle={() => handleToggleDropdown("labels")} onSelectLabel={handleSelectLabels} onRemoveLabel={handleRemoveLabel} onCloseDropdown={() => setIsOpenMyTaskDetailAside(null)}/>
      </div>
    </aside>
  );
};

export default MyTaskDetailAside;

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import type { OpenMyTaskFormDropdown } from "@/types/menu-nav.type.ts";
import { useClickOutside } from "@/hooks/useClickOutside.ts";
import { updateMyTaskField } from "@/helpers/updateMyTaskField.ts";
import type { Project } from "@/types/project.type.ts";
import { useProjectStore } from "@/stores/project.store.ts";
import {
  useGetAllProjects,
  useGetAProject,
} from "@/hooks/useQueryHook/useProjects.ts";
import SubmitIcon from "@/components/icons/SubmitIcon.tsx";
import type {Due, Priority, Task} from "@/types/task.type.ts";
import type { Section } from "@/types/section.type.ts";
import type { Label } from "@/types/label.type.ts";
import {
  getLabelKeyword,
  insertLabelCommasFirst,
  removeLabelCommasFirst,
} from "@/helpers/handleCommasTag.ts";
import CloseIcon from "@/components/icons/CloseIcon.tsx";
import TaskContentSection from "@/components/MyTasksComponent/MyTaskForm/EachTaskFieldSection/TaskContentSection.tsx";
import TaskDescriptionSection
  from "@/components/MyTasksComponent/MyTaskForm/EachTaskFieldSection/TaskDescriptionSection.tsx";
import TaskDateSection from "@/components/MyTasksComponent/MyTaskForm/EachTaskFieldSection/TaskDateSection.tsx";
import TaskPrioritySection from "@/components/MyTasksComponent/MyTaskForm/EachTaskFieldSection/TaskPrioritySection.tsx";
import TaskReminderSection from "@/components/MyTasksComponent/MyTaskForm/EachTaskFieldSection/TaskReminderSection.tsx";
import TaskLabelSection from "@/components/MyTasksComponent/MyTaskForm/EachTaskFieldSection/TaskLabelSection.tsx";
import TaskProjectSection from "@/components/MyTasksComponent/MyTaskForm/EachTaskFieldSection/TaskProjectSection.tsx";
import CustomButton from "@/components/ui/CustomButton.tsx";

export type MyTaskFormValues = {
  content: string;
  description: string;
  due: Due | null;
  priority: Priority | null;
  project: Project | null;
  section: Section | null;
  parentTask?: Task | null;
  labels: Label[];
};
type MyTaskFormProps = {
  onCloseMyTaskForm: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
  submittingLabel: string;
  values: MyTaskFormValues;
  onChange: (values: MyTaskFormValues) => void;
  isPending?: boolean;
  errorMessage?: string | null;
  variant?: string;
};
const MyTaskForm = ({
  onCloseMyTaskForm,
  onSubmit,
  values,
  onChange,
  submitLabel,
  submittingLabel,
  isPending,
  errorMessage,
  variant,
}: MyTaskFormProps) => {
  const [isOpenAddMyTaskDropdown, setIsOpenAddMyTaskDropdown] =
    useState<OpenMyTaskFormDropdown>(null);
  const [isInsertingLabel, setIsInsertingLabel] = useState(false);
  const dateRef = useRef<HTMLDivElement | null>(null);
  const priorityRef = useRef<HTMLDivElement | null>(null);
  const projectRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const dummyRef = useRef<HTMLDivElement | null>(null);
  const projectId = useProjectStore((state) => state.projectId);
  const { data: projectDetail } = useGetAProject(projectId);
  const { data: projects } = useGetAllProjects();
  const labelKeyword = isInsertingLabel
    ? (getLabelKeyword(values.content) ?? "")
    : "";
  const handleToggleDropdown = (name: OpenMyTaskFormDropdown) => {
    setIsOpenAddMyTaskDropdown((prev) => (prev === name ? null : name));
  };

  const filteredProjectsBySection = (section: Section) => {
    return projects?.results?.find((p) => p.id === section.project_id);
  };

  const handleSelectDate = (date: Due) => {
    onChange(updateMyTaskField(values, "due", date))
    setIsOpenAddMyTaskDropdown(null)
  }

  const handleSelectPriority = (priority: Priority) => {
    onChange(updateMyTaskField(values, "priority", priority));
    console.log("select priority: ", priority);
    setIsOpenAddMyTaskDropdown(null);
  };

  const handleSelectProject = (project: Project) => {
    onChange({
      ...values,
      project,
      section: null,
    });
    console.log("select project: ", project);
  };

  const handleSelectSection = (section: Section) => {
    const project = filteredProjectsBySection(section);
    if (!project) return;
    onChange({
      ...values,
      project,
      section,
    });
    console.log("select section: ", section);
  };

  const handleOpenLabels = () => {
    handleToggleDropdown("labels");
    onChange({
      ...values,
      content: insertLabelCommasFirst(values.content),
    });
    setIsInsertingLabel(true);
  };

  const handleSelectLabel = (label: Label) => {
    const existed = values.labels.some((l) => l.id === label.id);
    const nextLabels = existed
      ? values.labels.filter((l) => l.id !== label.id)
      : [...values.labels, label];
    onChange({
      ...values,
      content: removeLabelCommasFirst(values.content),
      labels: nextLabels,
    });
    setIsInsertingLabel(false);
    setIsOpenAddMyTaskDropdown(null);
  };

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(updateMyTaskField(values, "content", value));
    const keyword = getLabelKeyword(value);
    if (keyword !== null) {
      setIsInsertingLabel(true);
      setIsOpenAddMyTaskDropdown("labels");
    } else {
      setIsInsertingLabel(false);
      setIsOpenAddMyTaskDropdown(null);
    }
  };

  const handleRemoveLabel = (labelId: string) => {
    onChange({
      ...values,
      labels: values.labels.filter((l) => l.id !== labelId),
    });
  };

  const handleRemovePriority = () => {
    onChange(updateMyTaskField(values, "priority", null))
  }
  const handleRemoveDate = () => {
    onChange(updateMyTaskField(values, "due", null))
  }

  useClickOutside({
    ref:
      isOpenAddMyTaskDropdown === "date"
        ? dateRef
        : isOpenAddMyTaskDropdown === "priority"
          ? priorityRef
          : isOpenAddMyTaskDropdown === "project"
            ? projectRef
            : isOpenAddMyTaskDropdown === "labels"
              ? labelRef
              : dummyRef,
    handler: () => setIsOpenAddMyTaskDropdown(null),
    enabled: isOpenAddMyTaskDropdown !== null,
  });

  const isAddButtonDisabled = values.content.trim() === "" || isPending;
  return (
    <form
      className={"border border-product-library-border-idle-tint rounded-large text-product-library-display-primary-idle-tint"}
      onSubmit={onSubmit}
    >
      <div className={"pt-small px-small rounded-large"}>
        <div className={"max-h-50 mb-small flex flex-col gap-xsmall"}>
          <TaskContentSection labelRef={labelRef} onRemoveTaskProject={() => onChange({...values, project: null, section: null})} onRemoveTaskLabel={handleRemoveLabel} onRemoveDate={handleRemoveDate} contentValue={values.content} onContentChange={handleContentChange} openDropdown={isOpenAddMyTaskDropdown} sectionsValue={values.section} projectsValue={values.project} labelsValue={values.labels} dueValue={values.due} onSelectLabel={handleSelectLabel} labelKeyword={labelKeyword} onCloseLabelDropdown={() => setIsOpenAddMyTaskDropdown(null)}/>
          <TaskDescriptionSection descriptionValue={values.description} onChange={(e) => updateMyTaskField(values, "description", e.target.value)}/>
          <div className={"mb-small flex gap-small flex-wrap"}>
            {/*date*/}
            <TaskDateSection dateRef={dateRef} onToggleDropdown={handleToggleDropdown} dueValue={values.due} onRemoveDate={handleRemoveDate} openDropdown={isOpenAddMyTaskDropdown} onSelectDate={handleSelectDate} variant={variant}/>
            {/*priority*/}
            <TaskPrioritySection priorityRef={priorityRef} onToggleDropdown={handleToggleDropdown} priorityValue={values.priority} onRemovePriority={handleRemovePriority} openDropdown={isOpenAddMyTaskDropdown} onSelectPriority={handleSelectPriority} variant={variant}/>
            {/*reminders*/}
            <TaskReminderSection variant={variant}/>
            <TaskLabelSection labelsValue={values.labels} onOpenLabel={handleOpenLabels} onRemoveLabels={handleRemoveLabel} variant={variant}/>
          </div>
        </div>
      </div>
      <div
        className={
          "mt-small flex items-center justify-between border-t border-t-product-library-border-idle-tint p-small"
        }
      >
        <TaskProjectSection projectRef={projectRef} openDropdown={isOpenAddMyTaskDropdown} onToggleDropdown={handleToggleDropdown} projectDetail={projectDetail} sectionValue={values.section} projectValue={values.project} onSelectProject={handleSelectProject} onSelectSection={handleSelectSection}/>
        {errorMessage && (
          <div
            className={
              "text-sm text-product-library-actionable-destructive-idle-tint"
            }
            role={"alert"}
          >
            {errorMessage}
          </div>
        )}
        <div className={"flex gap-2.5"}>

          <CustomButton type="button" onClick={onCloseMyTaskForm} className={`${variant === "list" ? "p-1 md:px-3 md:py-1.5 min-w-0 md:min-w-17" : "w-8 h-8"} bg-product-library-actionable-secondary-idle-fill`}>
            {variant === "list" ? (
                <>
                <span
                    className={
                      "flex md:hidden w-6 h-6 justify-center items-center"
                    }
                >
                  <CloseIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                </span>
                  <span className="hidden md:inline text-sm font-medium text-product-library-actionable-secondary-on-idle-tint">
                  Cancel
                </span>
                </>
            ) : (
                <span className={"w-6 h-6 flex justify-center items-center"}>
                <CloseIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
              </span>
            )}
          </CustomButton>
          <CustomButton type={"submit"} className={`${variant === "list" ? "p-1 md:px-3 md:py-1.5 min-w-0 md:min-w-17" : "w-8 h-8"} ${
              isAddButtonDisabled
                  ? "bg-product-library-actionable-primary-disabled-fill cursor-not-allowed"
                  : "bg-product-library-actionable-primary-idle-fill hover:bg-product-library-actionable-primary-hover-fill"
          }`} disabled={isAddButtonDisabled}>
            {variant === "list" ? (
                <>
                <span
                    className={
                      "w-6 h-6 flex md:hidden justify-center items-center"
                    }
                >
                  <SubmitIcon className={"text-product-library-background-base-primary"} />
                </span>
                  <span className="hidden md:inline text-sm font-medium text-product-library-actionable-primary-on-idle-tint">
                  {isPending ? submittingLabel : submitLabel}
                </span>
                </>
            ) : (
                <span className={"w-6 h-6 flex justify-center items-center"}>
                <SubmitIcon className={"text-product-library-background-base-primary"} />
              </span>
            )}
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default MyTaskForm;

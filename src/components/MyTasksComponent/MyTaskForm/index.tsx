import TaskSmallCalendarIcon from "../../../assets/task-small-calendar-icon.svg";
import TaskFlagIcon from "../../../assets/task-flag-priority-icon.svg";
import TaskClockIcon from "../../../assets/task-clock-reminders-icon.svg";
import TaskSmallDropdownIcon from "../../../assets/task-small-dropdown-icon.svg";
import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import type { OpenMyTaskFormDropdown } from "../../../types/menu-nav.type.ts";
import { useClickOutside } from "../../../hooks/useClickOutside.ts";
import MyTaskProjectDropdown from "./MyTaskProjectDropdown";
import { updateMyTaskField } from "../../../helpers/updateMyTaskField.ts";
import MyTaskPriorityDropdown from "./MyTaskPriorityDropdown.tsx";
import LabelIcon from "../../../assets/label-icon.svg";
import HashtagIcon from "../../icons/HashtagIcon.tsx";
import { getProjectColorClass } from "../../../helpers/getProjectColorClass.ts";
import type { Project } from "../../../types/project.type.ts";
import { useProjectStore } from "../../../stores/project.store.ts";
import {useGetAllProjects, useGetAProject} from "../../../hooks/useQueryHook/useProjects.ts";
import CloseIcon from "../../../assets/close-icon.svg";
import SubmitIcon from "../../icons/SubmitIcon.tsx";
import type {Priority, Task} from "../../../types/task.type.ts";
import type {Section} from "../../../types/section.type.ts";
import ProjectChip from "../../ui/ProjectChip.tsx";
import SectionIcon from "../../icons/SectionIcon.tsx";

export type MyTaskFormValues = {
  content: string;
  description: string;
  due_date?: string;
  priority: Priority | null;
  project: Project | null;
  section: Section | null;
  parentTask?: Task | null;
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
  isEditMode?: boolean;
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
  variant, isEditMode,
}: MyTaskFormProps) => {
  const [isOpenAddMyTaskDropdown, setIsOpenAddMyTaskDropdown] =
    useState<OpenMyTaskFormDropdown>(null);
  const dateRef = useRef<HTMLDivElement | null>(null);
  const priorityRef = useRef<HTMLDivElement | null>(null);
  const projectRef = useRef<HTMLDivElement | null>(null);
  const dummyRef = useRef<HTMLDivElement | null>(null);
  const projectId = useProjectStore((state) => state.projectId);
  const { data: projectDetail } = useGetAProject(projectId);
  const {data: projects} = useGetAllProjects()
  const handleToggleDropdown = (name: OpenMyTaskFormDropdown) => {
    setIsOpenAddMyTaskDropdown((prev) => (prev === name ? null : name));
  };

  const filteredProjectsBySection = (section: Section) => {
    return projects?.results?.find(p => p.id === section.project_id)
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
      section: null
    })
    console.log("select project: ", project);
  }

  const handleSelectSection = (section: Section) => {
    const project = filteredProjectsBySection(section);
    if(!project) return;
    onChange({
      ...values,
      project,
      section
    })
    console.log("select section: ", section);
  }
  // const handleSelectProject = (project: Project, section?: Section) => {
  //   onChange({
  //     ...values,
  //     project,
  //     section: section ?? null
  //   })
  //   setIsOpenAddMyTaskDropdown(null)
  // }

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(updateMyTaskField(values, "content", e.target.value));
  };

  useClickOutside({
    ref:
      isOpenAddMyTaskDropdown === "date"
        ? dateRef
        : isOpenAddMyTaskDropdown === "priority"
          ? priorityRef
          : isOpenAddMyTaskDropdown === "project"
            ? projectRef
            : dummyRef,
    handler: () => setIsOpenAddMyTaskDropdown(null),
    enabled: isOpenAddMyTaskDropdown !== null,
  });

  const isAddButtonDisabled = values.content.trim() === "" || isPending;
  return (
    <form
      className={"border border-product-library-border-idle-tint rounded-large"}
      onSubmit={onSubmit}
    >
      <div className={"pt-small px-small rounded-large"}>
        <div className={"max-h-50 mb-small flex flex-col gap-xsmall"}>

          <div className={"flex items-center gap-1"}>
            {values.project && (
                <ProjectChip project={values.project} section={values.section} onRemove={() =>
                onChange({...values, project: null, section: null})}/>
            )}
            <input type={"text"} value={values.content} onChange={handleContentChange} className={"flex-1 min-w-30 outline-none text-sm text-product-library-display-primary-idle-tint"} placeholder={"Content"}/>
          </div>
          <input
            type={"text"}
            className={
              "text-xs leading-tight text-product-library-display-primary-idle-tint my-0.5 outline-none"
            }
            placeholder={"Description"}
            value={values.description}
            onChange={(e) =>
              onChange(updateMyTaskField(values, "description", e.target.value))
            }
          />
          <div className={"mb-small flex gap-small"}>
            {/*date*/}
            <div
              role={"button"}
              className={
                "px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill cursor-pointer"
              }
            >
              <div className={"flex items-center"}>
                <div className={"w-4 h-4 flex justify-center items-center"}>
                  <img src={TaskSmallCalendarIcon} alt={"calendar"} />
                </div>
                {variant === "list" && (
                  <div
                    className={
                      "ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"
                    }
                  >
                    Date
                  </div>
                )}
              </div>
            </div>

            {/*priority*/}
            <div className={"relative"} ref={priorityRef}>
              <div
                role={"button"}
                onClick={() => handleToggleDropdown("priority")}
                className={
                  "px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill cursor-pointer"
                }
              >
                <div className={"flex items-center"}>
                  <div className={"w-4 h-4 flex justify-center items-center"}>
                    <img src={TaskFlagIcon} alt={"flag-icon"} />
                  </div>
                  {variant === "list" && (
                    <div
                      className={
                        "ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"
                      }
                    >
                      Priority
                    </div>
                  )}
                </div>
              </div>
              {isOpenAddMyTaskDropdown === "priority" && (
                <MyTaskPriorityDropdown selectedPriority={values.priority} onSelect={(priority: Priority) => handleSelectPriority(priority)}/>
              )}
            </div>

            {/*reminders*/}
            <div
              role={"button"}
              className={
                "px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill cursor-pointer"
              }
            >
              <div className={"flex items-center"}>
                <div className={"w-4 h-4 flex justify-center items-center"}>
                  <img src={TaskClockIcon} alt={"clock-icon"} />
                </div>
                {variant === "list" && (
                  <div
                    className={
                      "ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"
                    }
                  >
                    Reminders
                  </div>
                )}
              </div>
            </div>

            <button
              className={
                "px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill cursor-pointer"
              }
            >
              <div className={"w-4 h-4 flex justify-center items-center"}>
                <img src={LabelIcon} alt={"label-icon"} />
              </div>
              {variant === "list" && (
                <p
                  className={
                    "text-sm text-product-library-display-secondary-idle-tint"
                  }
                >
                  Labels
                </p>
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={
          "mt-small flex items-center justify-between border-t border-t-product-library-border-idle-tint p-small"
        }
      >
        <div className={"relative"} ref={projectRef}>
          <button
            type={"button"}
            aria-haspopup={"listbox"}
            aria-expanded={isOpenAddMyTaskDropdown === "project"}
            aria-controls={"project-listbox"}
            onClick={() => handleToggleDropdown("project")}
            className={
              "mr-small pl-xsmall pr-small py-1.5 flex items-center gap-xsmall text-sm hover:bg-product-library-selectable-secondary-hover-fill rounded-small cursor-pointer"
            }
          >
            <div className={"flex justify-center items-center w-4 h-4"}>
              <HashtagIcon
                className={getProjectColorClass(projectDetail?.color)}
              />
            </div>
            <span
              className={
                "text-product-library-display-secondary-idle-tint font-medium"
              }
            >
              {projectDetail?.name}
            </span>
            {values.section && (<>
              <div className={"text-sm text-product-library-display-secondary-idle-tint"}>/</div>
              <span className={"flex items-center gap-1.5"}>
              <div className={"flex justify-center items-center"}>
                <SectionIcon/>
              </div>
              <p className={"text-product-library-display-secondary-idle-tint font-medium"}>{values.section?.name}</p>
            </span>
            </>)}

            <div className={"flex justify-center items-center"}>
              <img
                src={TaskSmallDropdownIcon}
                alt={"task-small-dropdown-icon"}
              />
            </div>
          </button>
          {isOpenAddMyTaskDropdown === "project" && (
            <MyTaskProjectDropdown
              selectedProject={values.project}
              selectedSection={values.section}
              onSelect={handleSelectProject}
              onSelectedSection={handleSelectSection}
            />
          )}
        </div>

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
          <button
            type="button"
            className={`${variant === "list" ? "px-3 py-1.5 min-w-17" : "w-8 h-8"} flex justify-center items-center rounded-small bg-product-library-actionable-secondary-idle-fill`}
            onClick={onCloseMyTaskForm}
          >
            {variant === "list" ? (
              <span className="text-sm font-medium text-product-library-actionable-secondary-on-idle-tint">
                Cancel
              </span>
            ) : (
              <span className={"w-6 h-6 flex justify-center items-center"}>
                <img src={CloseIcon} alt={"close-icon"} />
              </span>
            )}
          </button>
          <button
            type="submit"
            className={`${variant === "list" ? "px-3 py-1.5 min-w-17" : "w-8 h-8"} rounded-small flex justify-center items-center  ${
              isAddButtonDisabled
                ? "bg-product-library-actionable-primary-disabled-fill cursor-not-allowed"
                : "bg-product-library-actionable-primary-idle-fill hover:bg-product-library-actionable-primary-hover-fill"
            }
                            `}
            disabled={isAddButtonDisabled}
          >
            {variant === "list" ? (
              <span className="text-sm font-medium text-product-library-actionable-primary-on-idle-tint">
                {isPending ? submittingLabel : submitLabel}
              </span>
            ) : (
              <span className={"w-6 h-6 flex justify-center items-center"}>
                <SubmitIcon className={"text-white"} />
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default MyTaskForm;

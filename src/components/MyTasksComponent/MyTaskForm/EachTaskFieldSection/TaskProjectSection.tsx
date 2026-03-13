import type {RefObject} from "react";
import type {OpenMyTaskFormDropdown} from "@/types/menu-nav.type.ts";
import type {Project} from "@/types/project.type.ts";
import type {Section} from "@/types/section.type.ts";
import HashtagIcon from "@/components/icons/HashtagIcon.tsx";
import {getProjectColorClass} from "@/helpers/getProjectColorClass.ts";
import SectionIcon from "@/components/icons/SectionIcon.tsx";
import MyTaskProjectDropdown from "@/components/MyTasksComponent/MyTaskForm/MyTaskProjectDropdown";
import TaskSmallDropdownIcon from "@/components/icons/TaskSmallDropdownIcon.tsx";

type TaskProjectSectionProps = {
    projectRef: RefObject<HTMLDivElement | null>;
    openDropdown: OpenMyTaskFormDropdown;
    onToggleDropdown: (openDropdown: OpenMyTaskFormDropdown) => void;
    projectDetail?: Project;
    sectionValue: Section | null;
    projectValue: Project | null;
    onSelectProject: (project: Project) => void;
    onSelectSection: (section: Section) => void;
}
const TaskProjectSection = ({projectRef, openDropdown, onToggleDropdown, projectDetail, sectionValue, projectValue, onSelectProject, onSelectSection}: TaskProjectSectionProps) => {
    return (
        <div className={"relative"} ref={projectRef}>
            <button
                type={"button"}
                aria-haspopup={"listbox"}
                aria-expanded={openDropdown === "project"}
                aria-controls={"project-listbox"}
                onClick={() => onToggleDropdown("project")}
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
                {sectionValue && (
                    <>
                        <div
                            className={
                                "text-sm text-product-library-display-secondary-idle-tint"
                            }
                        >
                            /
                        </div>
                        <span className={"flex items-center gap-1.5"}>
                  <div className={"flex justify-center items-center"}>
                    <SectionIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                  </div>
                  <p
                      className={
                          "text-product-library-display-secondary-idle-tint font-medium"
                      }
                  >
                    {sectionValue?.name}
                  </p>
                </span>
                    </>
                )}

                <div className={"flex justify-center items-center"}>
                    <TaskSmallDropdownIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                </div>
            </button>
            {openDropdown === "project" && (
                <MyTaskProjectDropdown
                    selectedProject={projectValue}
                    selectedSection={sectionValue}
                    onSelect={onSelectProject}
                    onSelectedSection={onSelectSection}
                />
            )}
        </div>
    );
};

export default TaskProjectSection;
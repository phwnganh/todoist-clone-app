import type {Project} from "@/types/project.type.ts";
import type {Section} from "@/types/section.type.ts";
import type {RefObject} from "react";
import HashtagIcon from "@/components/icons/HashtagIcon.tsx";
import {getProjectColorClass} from "@/helpers/getProjectColorClass.ts";
import TaskSmallArrowDownIcon from "@/components/icons/TaskSmallArrowDownIcon.tsx";
import MyTaskProjectDropdown from "../../MyTaskForm/MyTaskProjectDropdown";

type TaskDetailAsideProjectSectionProps = {
    project: Project | null;
    section: Section | null;
    selectedProject: Project | null;
    selectedSection: Section | null;
    isOpenMyTaskDetailAside: boolean;
    projectRef: RefObject<HTMLDivElement | null>;
    onToggle: () => void;
    onMoveProject: (project: Project) => void;
    onMoveSection: (section: Section) => void;
}
const TaskDetailAsideProjectSection = ({project, section, selectedProject, selectedSection, isOpenMyTaskDetailAside, projectRef, onToggle, onMoveProject, onMoveSection}: TaskDetailAsideProjectSectionProps) => {
    return (
        <>
            <p
                className={
                    "text-product-library-display-secondary-idle-tint font-medium text-sm"
                }
            >
                Project
            </p>
            <div className={"relative group/project"} ref={projectRef}>
                <div
                    role={"listbox"}
                    onClick={onToggle}
                    className={
                        "cursor-pointer px-2 py-1.5 flex items-center justify-between hover:bg-product-library-display-accent-secondary-fill rounded-sm"
                    }
                >
                    <div className={"flex items-center"}>
                        <div
                            className={"flex justify-center items-center w-4 h-4 mr-0.5"}
                        >
                            <HashtagIcon className={getProjectColorClass(project?.color)} />
                        </div>
                        <span
                            className={
                                "text-product-library-display-secondary-idle-tint font-medium text-sm "
                            }
                        >
                {project?.name} {section && ` / ${section?.name}`}
              </span>
                    </div>

                    <div
                        className={
                            "group-hover/project:flex justify-center items-center hidden"
                        }
                    >
                        <TaskSmallArrowDownIcon />
                    </div>
                </div>
                {isOpenMyTaskDetailAside && (
                    <MyTaskProjectDropdown
                        selectedProject={selectedProject}
                        selectedSection={selectedSection}
                        onSelect={onMoveProject}
                        onSelectedSection={onMoveSection}
                    />
                )}
            </div>
            <hr className="border-t border-t-product-library-divider-tertiary" />
        </>
    );
};

export default TaskDetailAsideProjectSection;
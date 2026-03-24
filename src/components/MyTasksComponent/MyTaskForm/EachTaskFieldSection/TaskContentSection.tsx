import type {ChangeEvent, RefObject} from "react";
import type {OpenMyTaskFormDropdown} from "@/types/menu-nav.type.ts";
import type {Label} from "@/types/label.type.ts";
import type {Project} from "@/types/project.type.ts";
import ProjectChip from "@/components/ui/ProjectChip.tsx";
import type {Section} from "@/types/section.type.ts";
import LabelChip from "@/components/ui/LabelChip.tsx";
import type {Due} from "@/types/task.type.ts";
import DateChip from "@/components/ui/DateChip.tsx";
import MyTaskLabelsDropdown from "@/components/MyTasksComponent/MyTaskForm/MyTaskLabelsDropdown";

type TaskContentSectionProps = {
    labelRef: RefObject<HTMLDivElement | null>;
    onRemoveTaskProject: () => void;
    onRemoveTaskLabel: (labelId: string) => void;
    onRemoveDate: () => void;
    contentValue: string;
    onContentChange: (e: ChangeEvent<HTMLInputElement>) => void;
    openDropdown: OpenMyTaskFormDropdown;
    sectionsValue: Section | null;
    projectsValue: Project | null;
    labelsValue: Label[];
    dueValue: Due | null;
    onSelectLabel: (label: Label) => void;
    labelKeyword: string;
    onCloseLabelDropdown: () => void;
}
const TaskContentSection = ({labelRef, onRemoveTaskProject, onRemoveTaskLabel, onRemoveDate, dueValue, contentValue, onContentChange, openDropdown, sectionsValue, projectsValue, labelsValue, onSelectLabel, labelKeyword, onCloseLabelDropdown}: TaskContentSectionProps) => {
    return (
        <div className={"flex items-center gap-1 relative"} ref={labelRef}>
            {projectsValue && (
                <ProjectChip
                    project={projectsValue}
                    section={sectionsValue}
                    onRemove={onRemoveTaskProject}
                />
            )}

            {labelsValue.map((label) => (
                <LabelChip
                    key={label.id}
                    label={label}
                    onRemove={() => onRemoveTaskLabel(label.id)}
                />
            ))}
            {dueValue &&
                <DateChip date={dueValue.string} onRemove={onRemoveDate}/>
            }
            <input
                type={"text"}
                value={contentValue}
                onChange={onContentChange}
                className={
                    "flex-1 min-w-30 outline-none text-sm text-product-library-display-primary-idle-tint"
                }
                placeholder={"Content"}
            />
            {openDropdown === "labels" && (
                <MyTaskLabelsDropdown
                    selectedLabels={labelsValue}
                    onSelect={onSelectLabel}
                    keyword={labelKeyword}
                    onCloseLabelsDropdown={onCloseLabelDropdown}
                />
            )}
        </div>
    );
};

export default TaskContentSection;
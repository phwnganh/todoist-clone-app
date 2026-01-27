import type {Project} from "../../types/project.type.ts";
import type {Section} from "../../types/section.type.ts";

type ProjectChipProps = {
    project: Project;
    section: Section | null;
    onRemove: () => void;
}
const ProjectChip = ({project, section, onRemove}: ProjectChipProps) => {
    return (
        <div className={"flex justify-between items-center gap-1.5 p-1 rounded bg-product-library-display-accent-secondary-fill text-sm"}>
            <span className={"font-medium"}>
                #{project.name}
                {section ? `/${section.name}` : ""}
            </span>
            <button type={"button"} onClick={onRemove} className={"text-xs opacity-60 hover:opacity-100"}>x</button>
        </div>
    );
};

export default ProjectChip;
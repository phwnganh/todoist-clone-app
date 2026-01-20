import type {Project} from "../../../../types/project.type.ts";
import HashtagIcon from "../../../icons/HashtagIcon.tsx";
import {getProjectColorClass} from "../../../../helpers/getProjectColorClass.ts";
import VerifiedIcon from "../../../icons/VerifiedIcon.tsx";

type ProjectOptionsProps = {
    project: Project
    isProjectsSelected: boolean
    onProjectsSelected: (project: Project) => void;
}
const ProjectOptions = ({project, isProjectsSelected, onProjectsSelected}: ProjectOptionsProps) => {
    return (
        <div role={"option"} aria-selected={isProjectsSelected} tabIndex={-1}
        data-selected={isProjectsSelected} key={project.id}
        onMouseDown={e => {
            e.preventDefault()
            onProjectsSelected(project)
        }} className={"group flex items-center gap-1.5 py-1 px-1.5 justify-between data-[selected=true]:bg-product-library-selectable-secondary-hover-fill hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}>
            <div className={"flex items-center gap-1.5"}>
                <div className={"flex justify-center items-center"}>
                    <HashtagIcon className={getProjectColorClass(project.color)}/>
                </div>
                <div className={"text-sm"}>{project.name}</div>
            </div>
            <div className={"flex justify-center items-center invisible group-data-[selected=true]:visible"}>
                <VerifiedIcon className={"text-product-library-display-accent-primary-tint"}/>
            </div>
        </div>
    );
};

export default ProjectOptions;
import HashtagIcon from "../icons/HashtagIcon.tsx";
import type {Project} from "../../types/project.type.ts";

const SidebarMyProjectsItem = ({project}: {project: Project}) => {
    return (
        <div className="flex items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
            <div className="p-1.25 flex items-center">
                <div className="flex justify-center items-center">
                    <HashtagIcon />
                </div>
                <div className="py-0.75 pl-1.25 text-sm">{project.name}</div>
            </div>
            <div className="w-7 h-7 flex justify-center items-center ml-auto"></div>
        </div>
    );
};

export default SidebarMyProjectsItem;
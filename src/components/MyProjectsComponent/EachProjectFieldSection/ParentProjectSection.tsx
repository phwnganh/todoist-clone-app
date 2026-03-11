import type {RefObject} from "react";
import type {OpenDropdown} from "@/types/menu-nav.type.ts";
import HashtagIcon from "@/components/icons/HashtagIcon.tsx";
import FormSmallArrowDownIcon from "@/components/icons/FormSmallArrowDownIcon.tsx";
import AddProjectsParentProjectListDropdown
    from "@/components/MyProjectsComponent/MyProjectForm/MyProjectFormParentProjectListDropdown";

type ParentProjectSectionProps = {
    parentProjectRef: RefObject<HTMLDivElement | null>
    openDropdown: OpenDropdown;
    onToggleDropdown: (openDropdown: OpenDropdown) => void;
    parentProjectValue: string | null;
    onSelectParentProject: (parentProject: string) => void;
    onCloseDropdown: () => void;
}
const ParentProjectSection = ({parentProjectRef, openDropdown, onToggleDropdown, parentProjectValue, onSelectParentProject, onCloseDropdown}: ParentProjectSectionProps) => {
    return (
        <div className="relative" ref={parentProjectRef}>
            <label
                htmlFor="parent-project"
                className="text-product-library-display-primary-idle-tint text-sm font-strong pb-1.5"
            >
                Parent project
            </label>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={openDropdown === "parentProject"}
                aria-controls="parentProject-listbox"
                onClick={() => onToggleDropdown("parentProject")}
                className="border border-product-library-border-idle-tint rounded-small flex items-center gap-1.5 pr-1.5 pl-2.5 h-8 justify-between hover:border-product-library-border-focus-tint w-full"
            >
                <div className="flex items-center gap-1.5">
                    {parentProjectValue !== "No Parent" && (
                        <div className="flex justify-center items-center">
                            <HashtagIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                        </div>
                    )}

                    <div className="text-product-library-display-primary-idle-tint text-sm text-start">
                        {parentProjectValue ?? "No Parent"}
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <FormSmallArrowDownIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                </div>
            </button>
            {openDropdown === "parentProject" && (
                <AddProjectsParentProjectListDropdown
                    selectedProject={parentProjectValue}
                    onSelect={(parentProject: string) =>
                        onSelectParentProject(parentProject)
                    }
                    onCloseDropdown={onCloseDropdown}
                />
            )}
        </div>
    );
};

export default ParentProjectSection;
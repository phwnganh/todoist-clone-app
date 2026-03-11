import type {RefObject} from "react";
import type {OpenDropdown} from "@/types/menu-nav.type.ts";
import FormSmallArrowDownIcon from "@/components/icons/FormSmallArrowDownIcon.tsx";
import MyProjectFormWorkspaceListDropdown
    from "@/components/MyProjectsComponent/MyProjectForm/MyProjectFormWorkspaceListDropdown.tsx";
import {useGetUserProfile} from "@/hooks/useQueryHook/useUserProfile.ts";

type ProjectWorkspaceSectionProps = {
    workspaceRef: RefObject<HTMLDivElement | null>
    openDropdown: OpenDropdown;
    onToggleDropdown: (openDropdown: OpenDropdown) => void;

}
const ProjectWorkspaceSection = ({workspaceRef, openDropdown, onToggleDropdown}: ProjectWorkspaceSectionProps) => {
    const { data: user} = useGetUserProfile();
    return (
        <div className="relative" ref={workspaceRef}>
            <label
                htmlFor="project-workspace"
                className="text-product-library-display-primary-idle-tint text-sm font-strong pb-1.5"
            >
                Workspace
            </label>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={openDropdown === "workspace"}
                aria-controls="workspace-listbox"
                onClick={() => onToggleDropdown("workspace")}
                className="border border-product-library-border-idle-tint rounded-small flex items-center gap-1.5 pr-1.5 pl-2.5 h-8 hover:border-product-library-border-focus-tint w-full"
            >
                <div className="flex items-center justify-center w-4.5 h-4.5 rounded-small">
                    <img
                        src={user?.avatar_small}
                        alt={user?.full_name}
                        className={"rounded-small"}
                    />
                </div>
                <div className="flex-1">
                    <div className="text-product-library-display-primary-idle-tint text-sm text-start">
                        My Projects
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <FormSmallArrowDownIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                </div>
            </button>
            {openDropdown === "workspace" && (
                <MyProjectFormWorkspaceListDropdown user={user}/>
            )}
        </div>
    );
};

export default ProjectWorkspaceSection;
import VerifiedIcon from "../icons/VerifiedIcon.tsx";
import HashtagIcon from "../icons/HashtagIcon.tsx";
import {projectsData} from "../../data/project.mock.data.ts";
import {useEffect, useRef, useState} from "react";

type AddProjectsParentProjectListProps = {
    selectedProject: string | null;
    onSelect: (parentProject: string) => void;
}
const AddProjectsParentProjectListDropdown = ({selectedProject, onSelect}: AddProjectsParentProjectListProps) => {
    const isNoParentSelected = selectedProject === "No Parent";
    const [typedParentProject, setTypedParentProject] = useState<string>("");
    const keyword = typedParentProject.trim().toLowerCase();
    const searchInputRef = useRef<HTMLInputElement>(null);

    const filteredProjects = projectsData.filter(project =>
    project.name.toLowerCase().includes(keyword))

    const isNoParentMatched = keyword.length === 0 || "no parent".includes(keyword);
    const isNotProjectsFound = keyword.length > 0 && !isNoParentMatched && filteredProjects.length === 0;

    useEffect(() => {
        searchInputRef.current?.focus();
    }, [])

    return (
        <div className="absolute top-full z-1000 border border-product-library-divider-primary rounded-large shadow-sm overflow-y-auto scrollbar-thin scrollbar-custom max-h-70 w-full mt-1 bg-white">
            <div className="p-2">
                <input ref={searchInputRef} type="text" placeholder="Type a project name" className="text-sm border border-product-library-border-idle-tint rounded-small w-full py-1.5 px-2 outline-none focus:outline-none" onChange={e => setTypedParentProject(e.target.value)} value={typedParentProject} />
            </div>
            <hr className="border-t border-t-product-library-divider-tertiary"/>

            {/*parent project list*/}
            <div className="p-1.5 flex flex-col">
                {!isNotProjectsFound ?
                    <>
                    {isNoParentMatched && (
                        <button data-selected={isNoParentSelected} onClick={() => onSelect("No Parent")} className="group flex items-center gap-small py-1 px-1.5 w-full hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
                            <div className="flex justify-center items-center invisible group-data-[selected=true]:visible">
                                <VerifiedIcon/>
                            </div>
                            <div className="text-sm">No Parent</div>

                        </button>
                    )}
                    {typedParentProject.trim().length === 0 && <div className="py-1.5 px-2.5 font-medium text-sm text-product-library-display-secondary-idle-tint">My Projects</div>}
                        {filteredProjects.map(project => {
                            const isSelected = selectedProject === project.name;
                            return (
                                <button data-selected={isSelected} key={project.id} onClick={() => onSelect(project.name)}
                                        className="group flex items-center gap-1.5 py-1 px-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
                                    <div
                                        className="flex justify-center items-center invisible group-data-[selected=true]:visible">
                                        <VerifiedIcon/>
                                    </div>
                                    <span className="flex items-center gap-1.5">
                            <div className="flex justify-center items-center">
                                <HashtagIcon/>
                            </div>
                            <div className="text-sm ">{project.name}</div>
                                    </span>
                                </button>

                            )
                        })}

                    </> : <p className="text-sm text-product-library-display-secondary-idle-tint px-2.5">Project not found</p>
                }
                {typedParentProject.trim().length > 0 &&
                    <button className="text-center text-product-library-actionable-tertiary-idle-tint font-medium text-sm py-1 px-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">Create "{typedParentProject}"</button>
                }
            </div>

        </div>
    );
};

export default AddProjectsParentProjectListDropdown;
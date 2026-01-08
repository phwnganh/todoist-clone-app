import {projectsData} from "../../../data/project.mock.data.ts";
import {useEffect, useMemo, useRef, useState} from "react";
import SearchInput from "./SearchInput.tsx";
import NoParentOption from "./NoParentOption.tsx";
import ParentProjectOptions from "./ParentProjectOptions.tsx";
import DropdownFooter from "./DropdownFooter.tsx";

type AddProjectsParentProjectListProps = {
    selectedProject: string | null;
    onSelect: (parentProject: string) => void;
}
const AddProjectsParentProjectListDropdown = ({selectedProject, onSelect}: AddProjectsParentProjectListProps) => {
    const NO_PARENT = "No Parent";
    const [typedParentProject, setTypedParentProject] = useState<string>("");
    const keyword = typedParentProject.trim().toLowerCase();
    const trimmedParentProjectValue = typedParentProject.trim();
    const hasKeyword = trimmedParentProjectValue.length > 0;
    const searchInputRef = useRef<HTMLInputElement>(null);

    const filteredProjects = useMemo(() => {
            if (!hasKeyword) return projectsData;
            return projectsData.filter(project =>
                project.name.toLowerCase().includes(keyword))
        }
    , [keyword, hasKeyword])

    const isNoParentMatched = !hasKeyword || NO_PARENT.toLowerCase().includes(keyword);
    const isNotProjectsFound = hasKeyword && !isNoParentMatched && filteredProjects.length === 0;

    useEffect(() => {
        searchInputRef.current?.focus();
    }, [])

    return (
        <div className="absolute top-full z-1000 border border-product-library-divider-primary rounded-large shadow-sm overflow-y-auto scrollbar-thin scrollbar-custom max-h-70 w-full mt-1 bg-white">
            <SearchInput parentProjectValue={typedParentProject} onParentProjectsSearched={setTypedParentProject} inputRef={searchInputRef}/>
            <hr className="border-t border-t-product-library-divider-tertiary"/>

            {/*parent project list*/}
            <div className="p-1.5 flex flex-col">
                {isNoParentMatched && <NoParentOption isNoParentSelected={selectedProject === NO_PARENT} onNoParentSelected={() => onSelect(NO_PARENT)}/>}
                {typedParentProject.trim().length === 0 && <div className="py-1.5 px-2.5 font-medium text-sm text-product-library-display-secondary-idle-tint">My Projects</div>}
                {filteredProjects.map(project => (
                    <ParentProjectOptions key={project.id} project={project} isParentProjectsSelected={selectedProject === project.name} onParentProjectsSelected={onSelect}/>
                ))}

                <DropdownFooter hasKeyword={hasKeyword} keyword={trimmedParentProjectValue} showNotFound={isNotProjectsFound}/>
            </div>

        </div>
    );
};

export default AddProjectsParentProjectListDropdown;
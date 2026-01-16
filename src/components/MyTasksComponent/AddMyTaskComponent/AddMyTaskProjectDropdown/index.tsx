import {useEffect, useMemo, useRef, useState} from "react";
import {useDebounce} from "../../../../hooks/useDebounce.ts";
import {useGetAllProjects} from "../../../../hooks/useProjects.ts";
import LoadingSpin from "../../../ui/LoadingSpin.tsx";
import ProjectSearchInput from "./ProjectSearchInput.tsx";
import InboxOption from "./InboxOption.tsx";
import UserAvatar from '../../../../assets/User-avatar.png'
import ProjectOptions from "./ProjectOptions.tsx";
import ProjectDropdownFooter from "./ProjectDropdownFooter.tsx";

type AddMyTaskProjectDropdownProps = {
    selectedProject: string | null;
    onSelect: (project: string) => void;
}
const AddMyTaskProjectDropdown = ({selectedProject, onSelect}: AddMyTaskProjectDropdownProps) => {
    const INBOX = "Inbox"
    const [typedProject, setTypedProject] = useState<string>("");
    const keyword = typedProject.trim().toLowerCase();
    const debounceSearchKeyword = useDebounce(keyword, 500);

    const trimmedProjectValue = typedProject.trim();
    const hasKeyword = trimmedProjectValue.length > 0;
    const searchInputRef = useRef<HTMLInputElement>(null);

    const {data: projects, isLoading} = useGetAllProjects()

    const filteredProjects = useMemo(() => {
        if(!hasKeyword) return projects?.results
        return projects?.results.filter(project => project.name.toLowerCase().includes(debounceSearchKeyword))
    }, [debounceSearchKeyword, hasKeyword, projects])

    const isNoInboxMatched = !hasKeyword || INBOX.toLowerCase().includes(debounceSearchKeyword)
    const isNoProjectsFound = hasKeyword && !isNoInboxMatched && filteredProjects?.length === 0;

    useEffect(() => {
        searchInputRef.current?.focus()
    }, []);

    if (isLoading) {
        return (
            <div className={"mt-medium"}>
                <LoadingSpin />
            </div>
        );
    }
    return (
        <div className={"absolute top-full z-1000 border border-product-library-divider-primary rounded-large shadow-sm overflow-y-auto scrollbar-thin scrollbar-custom max-h-70 w-full mt-1 bg-white"} id={"project-listbox"} role={"listbox"} aria-labelledby={"project-trigger"}>
            <ProjectSearchInput projectValue={typedProject} onProjectsSearched={setTypedProject} inputRef={searchInputRef}/>
            <hr className="border-t border-t-product-library-divider-tertiary" />
            <div className={"p-1.5 flex flex-col"}>
                {isNoInboxMatched && (
                    <InboxOption isInboxSelected={selectedProject === INBOX} onInboxSelected={() => onSelect(INBOX)}/>
                )}
                {trimmedProjectValue.length === 0 && (
                    <div className={"py-1.5 px-2.5 flex items-center gap-1.5"}>
                        <div className={"flex justify-center items-center w-4 h-4"}>
                            <img src={UserAvatar} alt={'user-avatar'} className={"rounded-full"}/>
                        </div>
                        <div className={"font-strong text-sm text-product-library-display-secondary-idle-tint"}>
                            My Projects
                        </div>
                    </div>
                )}
                {filteredProjects?.map(project => (
                    <ProjectOptions key={project.id} project={project} isProjectsSelected={selectedProject === project.name} onProjectsSelected={onSelect}/>
                ))}

                <ProjectDropdownFooter hasKeyword={hasKeyword} keyword={trimmedProjectValue} showNotFound={isNoProjectsFound}/>
            </div>
        </div>
    );
};

export default AddMyTaskProjectDropdown;
import HashtagIcon from "../../icons/HashtagIcon.tsx";
import {getProjectColorClass} from "../../../helpers/getProjectColorClass.ts";
import type {Project} from "../../../types/project.type.ts";
import SmallPlusAddIcon from "../../icons/SmallPlusAddIcon.tsx";
import TaskFlagIcon from '../../../assets/task-flag-priority-icon.svg'
import type {OpenMyTaskDetailAsideDropdown} from "../../../types/menu-nav.type.ts";
import {useEffect, useRef, useState} from "react";
import type {Section} from "../../../types/section.type.ts";
import type {Priority} from "../../../types/task.type.ts";
import {useClickOutside} from "../../../hooks/useClickOutside.ts";
import MyTaskProjectDropdown from "../MyTaskForm/MyTaskProjectDropdown";
type MyTaskDetailAsideProps = {
    projectDetail: Project | undefined
}
const MyTaskDetailAside = ({projectDetail}: MyTaskDetailAsideProps) => {
    const [isOpenMyTaskDetailAside, setIsOpenMyTaskDetailAside] = useState<OpenMyTaskDetailAsideDropdown>(null)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [selectedSection, setSelectedSection] = useState<Section | null>(null)
    const projectRef = useRef<HTMLDivElement | null>(null)
    const dateRef = useRef<HTMLDivElement | null>(null)
    const priorityRef = useRef<HTMLDivElement | null>(null)
    const labelsRef = useRef<HTMLDivElement | null>(null)
    const dummyRef = useRef<HTMLDivElement | null>(null)
    const handleToggleDropdown = (name: OpenMyTaskDetailAsideDropdown)=> {
        setIsOpenMyTaskDetailAside(prev => (prev === name ? null : name));
    }

    const handleSelectProject = (project: Project, section?: Section) => {
        setIsOpenMyTaskDetailAside(null)
    }

    const handleSelectPriority = (priority: Priority) => {
        setIsOpenMyTaskDetailAside(null)
    }

    useEffect(() => {
        if(projectDetail){
            setSelectedProject(projectDetail)
        }
    }, [projectDetail])

    useClickOutside({
        ref: isOpenMyTaskDetailAside === "project" ? projectRef : isOpenMyTaskDetailAside === "priority" ? priorityRef : isOpenMyTaskDetailAside === "date" ? dateRef : isOpenMyTaskDetailAside === "labels" ? labelsRef : dummyRef,
        handler: () => setIsOpenMyTaskDetailAside(null),
        enabled: isOpenMyTaskDetailAside !== null
    })
    return (
        <aside className={"p-large bg-product-library-background-base-secondary flex flex-col gap-small max-w-65 w-full shrink-0"}>
            <div className={"flex flex-col gap-1.5"}>
                <p className={"text-product-library-display-secondary-idle-tint font-medium text-sm"}>Project</p>
                <div className={"relative"} ref={projectRef}>
                    <div role={"listbox"} onClick={() => handleToggleDropdown("project")} className={"cursor-pointer px-2 py-1.5 flex items-center hover:bg-product-library-display-accent-secondary-fill rounded-sm"}>
                        <div className={"flex justify-center items-center w-4 h-4 mr-0.5"}>
                            <HashtagIcon className={getProjectColorClass(projectDetail?.color)}/>
                        </div>
                        <span className={
                            "text-product-library-display-secondary-idle-tint font-medium text-sm "
                        }>{selectedProject?.name} {selectedSection && ` / ${selectedSection?.name}`}</span>
                    </div>
                    {isOpenMyTaskDetailAside === "project" && (
                        <MyTaskProjectDropdown selectedProject={selectedProject} onSelect={(project: Project) => handleSelectProject(project)} onSelectedSection={(project: Project, section: Section) => handleSelectProject(project, section)}/>
                    )}
                </div>
                <hr className="border-t border-t-product-library-divider-tertiary" />
                <div role={"listbox"} className={"cursor-pointer flex justify-between items-center hover:bg-product-library-display-accent-secondary-fill rounded-sm p-1.5"}>
                    <p className={"text-product-library-display-secondary-idle-tint font-medium text-sm"}>Date</p>
                    <button type={"button"} className={"flex justify-center items-center"}>
                        <SmallPlusAddIcon/>
                    </button>
                </div>
                <hr className="border-t border-t-product-library-divider-tertiary" />
                <div className={"flex flex-col gap-1.5"}>
                    <p className={"text-product-library-display-secondary-idle-tint font-medium text-sm"}>Priority</p>
                    <div role={"listbox"} className={"cursor-pointer flex items-center gap-1.5 hover:bg-product-library-display-accent-secondary-fill rounded-sm p-1.5"}>
                        <div className={"flex justify-center items-center w-4 h-4"}>
                            <img src={TaskFlagIcon} alt={"flag-icon"}/>
                        </div>
                        <div className={"ml-xsmall text-sm pr-xsmall"}>
                            P4
                        </div>
                    </div>
                </div>
                <hr className="border-t border-t-product-library-divider-tertiary" />
                <div role={"listbox"} className={"cursor-pointer flex justify-between items-center hover:bg-product-library-display-accent-secondary-fill rounded-sm p-1.5"}>
                    <p className={"text-product-library-display-secondary-idle-tint font-medium text-sm"}>Labels</p>
                    <button type={"button"} className={"flex justify-center items-center"}>
                        <SmallPlusAddIcon/>
                    </button>
                </div>
            </div>
        </aside>

    );
};

export default MyTaskDetailAside;
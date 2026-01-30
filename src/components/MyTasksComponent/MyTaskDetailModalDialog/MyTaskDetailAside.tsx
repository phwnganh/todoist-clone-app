import HashtagIcon from "../../icons/HashtagIcon.tsx";
import {getProjectColorClass} from "../../../helpers/getProjectColorClass.ts";
import type {Project} from "../../../types/project.type.ts";
import SmallPlusAddIcon from "../../icons/SmallPlusAddIcon.tsx";
import type {OpenMyTaskDetailAsideDropdown} from "../../../types/menu-nav.type.ts";
import {useEffect, useRef, useState} from "react";
import type {Section} from "../../../types/section.type.ts";
import type {Priority, Task} from "../../../types/task.type.ts";
import {useClickOutside} from "../../../hooks/useClickOutside.ts";
import MyTaskProjectDropdown from "../MyTaskForm/MyTaskProjectDropdown";
import TaskSmallArrowDownIcon from "../../icons/TaskSmallArrowDownIcon.tsx";
import MyTaskPriorityDropdown from "../MyTaskForm/MyTaskPriorityDropdown.tsx";
import PriorityIcon from "../../icons/PriorityIcon.tsx";
import {getTaskValuesByMappingDataType} from "../../../helpers/updateMyTaskField.ts";
import {useGetAllProjects} from "../../../hooks/useQueryHook/useProjects.ts";
import {useGetAllSections} from "../../../hooks/useQueryHook/useSections.ts";
import {useMoveMyTask, useUpdateMyTask} from "../../../hooks/useQueryHook/useTasks.ts";
type MyTaskDetailAsideProps = {
    projectDetail?: Project
    taskDetail?: Task
}
const MyTaskDetailAside = ({projectDetail, taskDetail}: MyTaskDetailAsideProps) => {
    const [isOpenMyTaskDetailAside, setIsOpenMyTaskDetailAside] = useState<OpenMyTaskDetailAsideDropdown>(null)
    const {data: projects} = useGetAllProjects()
    const {data: sections} = useGetAllSections()
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [selectedSection, setSelectedSection] = useState<Section | null>(null)
    const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null)
    const projectRef = useRef<HTMLDivElement | null>(null)
    const dateRef = useRef<HTMLDivElement | null>(null)
    const priorityRef = useRef<HTMLDivElement | null>(null)
    const labelsRef = useRef<HTMLDivElement | null>(null)
    const dummyRef = useRef<HTMLDivElement | null>(null)
    const {mutate} = useUpdateMyTask()
    const {mutate: mutateMoveTask} = useMoveMyTask()
    const handleToggleDropdown = (name: OpenMyTaskDetailAsideDropdown)=> {
        setIsOpenMyTaskDetailAside(prev => (prev === name ? null : name));
    }

    const handleMoveProject = (project: Project) => {
        if(!taskDetail) return;
        setSelectedProject(project);
        setSelectedSection(null);
        setIsOpenMyTaskDetailAside(null);
        mutateMoveTask({
            id: taskDetail.id,
            project_id: project.id,
        })
    }

    const handleMoveSection = (section: Section) => {
        if(!taskDetail) return;
        setSelectedSection(section);
        setIsOpenMyTaskDetailAside(null);
        mutateMoveTask({
            id: taskDetail.id,
            section_id: section.id,
        })
    }

    const handleSelectPriority = (priority: Priority) => {
        setSelectedPriority(priority)
        setIsOpenMyTaskDetailAside(null)
        if(!taskDetail) return;
        mutate({
            id: taskDetail?.id,
            content: taskDetail?.content,
            description: taskDetail?.description,
            priority: priority.value
        })
    }

    useEffect(() => {
        if(!taskDetail) return;

        const values = getTaskValuesByMappingDataType(taskDetail, projects?.results, sections?.results)
        setSelectedProject(values.project)
        setSelectedSection(values.section)
        setSelectedPriority(values.priority)
    }, [taskDetail, projects?.results, sections?.results])

    useClickOutside({
        ref: isOpenMyTaskDetailAside === "project" ? projectRef : isOpenMyTaskDetailAside === "priority" ? priorityRef : isOpenMyTaskDetailAside === "date" ? dateRef : isOpenMyTaskDetailAside === "labels" ? labelsRef : dummyRef,
        handler: () => setIsOpenMyTaskDetailAside(null),
        enabled: isOpenMyTaskDetailAside !== null
    })
    return (
        <aside className={"p-large bg-product-library-background-base-secondary flex flex-col gap-small max-w-65 w-full shrink-0"}>
            <div className={"flex flex-col gap-1.5"}>
                <p className={"text-product-library-display-secondary-idle-tint font-medium text-sm"}>Project</p>
                <div className={"relative group/project"} ref={projectRef}>
                    <div role={"listbox"} onClick={() => handleToggleDropdown("project")} className={"cursor-pointer px-2 py-1.5 flex items-center justify-between hover:bg-product-library-display-accent-secondary-fill rounded-sm"}>
                        <div className={"flex items-center"}>
                            <div className={"flex justify-center items-center w-4 h-4 mr-0.5"}>
                                <HashtagIcon className={getProjectColorClass(selectedProject?.color)}/>
                            </div>
                            <span className={
                                "text-product-library-display-secondary-idle-tint font-medium text-sm "
                            }>{selectedProject?.name} {selectedSection && ` / ${selectedSection?.name}`}</span>
                        </div>

                        <div className={"group-hover/project:flex justify-center items-center hidden"}>
                            <TaskSmallArrowDownIcon />
                        </div>
                    </div>
                    {isOpenMyTaskDetailAside === "project" && (
                        <MyTaskProjectDropdown selectedProject={selectedProject} selectedSection={selectedSection} onSelect={handleMoveProject} onSelectedSection={handleMoveSection}/>
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
                    <div className={"relative"} ref={priorityRef}>
                        <div role={"listbox"} onClick={() => handleToggleDropdown("priority")} className={"cursor-pointer flex items-center justify-between gap-1.5 hover:bg-product-library-display-accent-secondary-fill rounded-sm p-1.5 group/priority"}>
                            <div className={"flex justify-center items-center"}>
                                <div className={"flex justify-center items-center w-4 h-4"}>
                                    <PriorityIcon className={selectedPriority?.color}/>
                                </div>
                                <div className={"ml-xsmall text-sm pr-xsmall"}>
                                    {selectedPriority?.label}
                                </div>
                            </div>
                            <div className={"group-hover/priority:flex justify-center items-center hidden"}>
                                <TaskSmallArrowDownIcon />
                            </div>
                        </div>
                        {isOpenMyTaskDetailAside === "priority" && (
                            <MyTaskPriorityDropdown selectedPriority={selectedPriority} onSelect={(priority: Priority) => handleSelectPriority(priority)}/>
                        )}
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
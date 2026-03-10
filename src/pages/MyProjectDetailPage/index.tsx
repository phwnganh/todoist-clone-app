import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import HeaderLayout from "@/layouts/HeaderLayout.tsx";
import UserAdded from '@/assets/user-added-icon.svg'
import SmallListIcon from '@/assets/small-list-icon.svg'
import CommentIcon from '@/assets/comment-icon.svg'
import ThreeDotsIcon from '@/assets/three-dots-icon.svg'
import type {HeaderLayoutType} from "@/types/headerLayout.type.ts";
import {PROJECTS} from "@/constants/routes.constants.ts";
import MyTasksList from "@/components/MyTasksComponent/MyTasksList.tsx";
import MyTaskTitle from "@/components/MyTasksComponent/MyTaskTitle.tsx";
import {useEffect, useMemo, useState} from "react";
import MyTaskLayoutFiltersDropdown from "@/components/MyTasksComponent/MyTaskLayoutFiltersDropdown";
import MyTasksBoard from "@/components/MyTasksComponent/MyTasksBoard";
import {useProjectStore} from "@/stores/project.store.ts";
import {useGetAllSections, useReorderSection} from "@/hooks/useQueryHook/useSections.ts";
import {DndContext, type DragEndEvent, type DragOverEvent} from "@dnd-kit/core";
import {useMoveMyTask, useReorderTask} from "@/hooks/useQueryHook/useTasks.ts";
import {findTaskByIdToOrder, handleReorderTask} from "@/helpers/dragDropMyTasks.ts";
import HeaderThreeDotsIcon from "@/components/icons/HeaderThreeDotsIcon.tsx";
import {findSectionByIdToOrder, handleReorderSection} from "@/helpers/dragDropMySection.ts";
import {customCollisionDetection} from "@/helpers/customCollisionDetection.ts";
import {useDragStore} from "@/stores/dragDrop.store.ts";
import {useTasksWithView, useViewOptions} from "@/hooks/useQueryHook/useViewOptions.ts";
import {useQueryClient} from "@tanstack/react-query";
import type {ViewMode, ViewOptionsPayload} from "@/types/viewOptions.type.ts";
import {useGroupingTaskStore} from "@/stores/groupingTask.store.ts";
import type {Section} from "@/types/section.type.ts";

const MyProjectDetailPage = () => {
    const {projectId} = useParams<{projectId: string}>();
    const setProjectId = useProjectStore(state => state.setProjectId);
    const {groupedBy, setGroupedBy} = useGroupingTaskStore()
    useEffect(() => {
        if(projectId){
            setProjectId(projectId);
        }
    }, [projectId, setProjectId]);
    const {data: sections} = useGetAllSections({project_id: projectId});
    const {data: allTasks} = useTasksWithView({project_id: projectId}, "PROJECT", projectId);
    const {mutateAsync: movingTaskMutate} = useMoveMyTask()
    const {mutateAsync: reorderingTaskMutate} = useReorderTask()
    const {mutate: reorderingSectionMutate} = useReorderSection()
    const {mutate: updateViewOptions} = useViewOptions()
    const [openLayoutDropdown, setOpenLayoutDropdown] = useState(false);
    const queryClient = useQueryClient()
    const viewOptions = queryClient.getQueryData<ViewOptionsPayload>(["viewOptions", "PROJECT", projectId])
    const isGrouping = groupedBy != null;
    useEffect(() => {
        setGroupedBy(viewOptions?.grouped_by ?? null)
    }, [viewOptions?.grouped_by, setGroupedBy]);

    const groupedTasks = useMemo(() => {
        if(!isGrouping) return []
        return allTasks?.grouped ?? []
    }, [isGrouping, allTasks?.grouped])
    const layoutName = viewOptions?.view_mode ?? "LIST"

    const NO_SECTION = {
        id: null,
        name: "(No section)",
        project_id: projectId,
    } as Section;

    const handleUpdateViewOption = (payload: Partial<ViewOptionsPayload>) => {
        updateViewOptions({
            view_type: "PROJECT",
            object_id: projectId!,
            ...payload,
        });
    };

    const handleOpenLayoutDropdown = () => {
        setOpenLayoutDropdown(prev => !prev);
    }
    const handleSelectLayout = (layout: ViewMode) => {
            handleUpdateViewOption({
                view_mode: layout
            })
    }
    const {showCollapse, onToggleSidebar} = useOutletContext<HeaderLayoutType>()
    const navigate = useNavigate()
    const {setDragPreview, clearDragPreview} = useDragStore()
    const handleDragEnd = async (e: DragEndEvent) => {
        const {active, over} = e;
        if(!over || active.id === over.id) return;
        const activeType = active.data.current?.type;
        const overType = over.data.current?.type;
        const dropType = over.data.current?.dropType;
        const isDropInside = overType === "task" && activeType === "task" && dropType === "inside";
        if(activeType === "section" && overType === "section"){
            const sectionList = sections?.results
            if(!sectionList) return;

            const activeSection = findSectionByIdToOrder(sectionList, active.id as string)
            const overSection = findSectionByIdToOrder(sectionList, over.id as string)

            if(!activeSection || !overSection) return;

            handleReorderSection(sectionList, activeSection, overSection, reorderingSectionMutate)
        }
        const tasks = allTasks?.results
        if(!tasks) return;

        const activeTask = findTaskByIdToOrder(tasks, active.id as string)
        const overTask = findTaskByIdToOrder(tasks, over.id as string)
        if(!activeTask || !overTask) return;

        await handleReorderTask(tasks, activeTask, overTask, projectId, movingTaskMutate, reorderingTaskMutate, isDropInside)
        clearDragPreview()
    }

    const handleDragOver = (e: DragOverEvent) => {
        const {active, over} = e
        if(!over) return;
        const dropType = over.data.current?.dropType ?? null;

        setDragPreview({
            activeId: active.id as string,
            overId: over.id as string,
            dropType
        })
    }

    return (
        <>
            <HeaderLayout showCollapse={showCollapse} onToggleSidebar={onToggleSidebar} right={
                <div className={"flex justify-end items-center"}>
                    <button type={"button"} className="flex items-center justify-center p-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
                        <div className={"mr-1.5"}>
                            <img src={UserAdded} alt={"user-added-icon"}/>
                        </div>
                        <span className="hidden md:block text-product-library-actionable-quaternary-idle-tint text-sm font-medium">Share</span>
                    </button>
                        <div className={"relative p-1 md:p-2.5"}>
                        <button type={"button"} className={"flex items-center px-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"} onClick={handleOpenLayoutDropdown}>
                            <div className={"flex items-center justify-center w-8 h-8"}>
                                <img src={SmallListIcon} alt={"small-list-icon"}/>
                            </div>
                            <span className="hidden md:block text-product-library-actionable-quaternary-idle-tint text-sm font-medium">Display</span>

                        </button>
                        {openLayoutDropdown && (<MyTaskLayoutFiltersDropdown onSelectLayout={handleSelectLayout} layoutTitle={layoutName} onUpdateViewOption={handleUpdateViewOption}/>)}
                        </div>
                    <button type={"button"} className={"flex items-center justify-center w-8 h-8 p-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"}>
                        <img src={CommentIcon} alt={"comment-icon"}/>
                    </button>
                    <button type={"button"} className={"flex items-center justify-center w-8 h-8 p-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"}>
                        <img src={ThreeDotsIcon} alt={"three-dots-icon"}/>
                    </button>
                </div>
            } left={<div className={"flex items-center mr-auto"}>
                <button onClick={() => navigate(PROJECTS)} className={"flex sm:hidden justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small p-1.5"}>
                    <HeaderThreeDotsIcon className={"text-product-library-display-secondary-idle-tint"}/>
                </button>
                <button className={"hidden sm:block px-1 text-product-library-actionable-quaternary-idle-tint text-sm font-medium hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small p-1.5"} onClick={() => navigate(PROJECTS)}>My Projects</button>
                <div className={"text-sm text-product-library-display-secondary-idle-tint"}>/</div>
            </div>}></HeaderLayout>
            <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver} collisionDetection={customCollisionDetection}>
                {layoutName === "LIST" ? (
                    <section className={"max-w-200 mx-auto w-full relative z-10"}>
                        <div className={"flex flex-col gap-small"}>
                            <MyTaskTitle/>
                            <MyTasksList filteredSectionsByProject={sections?.results} isGrouping={isGrouping} groupedTasks={groupedTasks} noSection={NO_SECTION}/>
                        </div>
                    </section>
                ) : (
                    <section className={"px-10"}>
                        <div className={"flex flex-col gap-small"}>
                            <MyTaskTitle/>
                            <MyTasksBoard filteredSectionsByProject={sections?.results} isGrouping={isGrouping} groupedTasks={groupedTasks} noSection={NO_SECTION}/>
                        </div>
                    </section>
                )}
            </DndContext>

        </>
    );
};

export default MyProjectDetailPage;
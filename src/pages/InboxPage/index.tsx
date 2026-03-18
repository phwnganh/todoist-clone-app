import HeaderLayout from "@/layouts/HeaderLayout.tsx";
import {useOutletContext} from "react-router-dom";
import type {HeaderLayoutType} from "@/types/headerLayout.type.ts";
import SmallListIcon from "@/components/icons/SmallListIcon.tsx";
import MyTaskLayoutFiltersDropdown from "@/components/MyTasksComponent/MyTaskLayoutFiltersDropdown";
import {useEffect, useMemo, useState} from "react";
import type {ViewMode, ViewOptionsPayload} from "@/types/viewOptions.type.ts";
import {useTasksWithView, useViewOptions} from "@/hooks/useQueryHook/useViewOptions.ts";
import CommentIcon from "@/components/icons/CommentIcon.tsx";
import ThreeDotsIcon from "@/components/icons/ThreeDotsIcon.tsx";
import {queryClient} from "@/main.tsx";
import MyTasksList from "@/components/MyTasksComponent/MyTasksList.tsx";
import MyTasksBoard from "@/components/MyTasksComponent/MyTasksBoard.tsx";
import {useGetAllSections, useReorderSection} from "@/hooks/useQueryHook/useSections.ts";
import {useGroupingTaskStore} from "@/stores/groupingTask.store.ts";
import type {Section} from "@/types/section.type.ts";
import {useGetAllProjects} from "@/hooks/useQueryHook/useProjects.ts";
import {useDragStore} from "@/stores/dragDrop.store.ts";
import {DndContext, type DragEndEvent, type DragOverEvent} from "@dnd-kit/core";
import {findSectionByIdToOrder, handleReorderSection} from "@/helpers/dragDropMySection.ts";
import {useMoveMyTask, useReorderTask} from "@/hooks/useQueryHook/useTasks.ts";
import {findTaskByIdToOrder, handleReorderTask} from "@/helpers/dragDropMyTasks.ts";
import {customCollisionDetection} from "@/helpers/customCollisionDetection.ts";
import {useProjectStore} from "@/stores/project.store.ts";
import EmptyInboxTasks from "@/components/ui/EmptyInboxTasks.tsx";

const InboxPage = () => {
    const {showCollapse, onToggleSidebar} = useOutletContext<HeaderLayoutType>()
    const {groupedBy, setGroupedBy} = useGroupingTaskStore()
    const [openLayoutDropdown, setOpenLayoutDropdown] = useState(false);
    const {mutate: updateViewOptions} = useViewOptions()
    const {mutateAsync: movingTaskMutate} = useMoveMyTask()
    const {mutateAsync: reorderingTaskMutate} = useReorderTask()
    const {mutate: reorderingSectionMutate} = useReorderSection()
    const isGrouping = groupedBy != null;
    const {data: projects} = useGetAllProjects()
    const inboxProjectId = useMemo(() => projects?.results?.find(p => p.name === "Inbox")?.id, [projects?.results])
    console.log("inbox id", inboxProjectId)
    const {data: sections} = useGetAllSections({project_id: inboxProjectId});
    const {data: allTasks, isLoading} = useTasksWithView({project_id: inboxProjectId}, "PROJECT", inboxProjectId);
    const setProjectId = useProjectStore(state => state.setProjectId)
    const viewOptions = queryClient.getQueryData<ViewOptionsPayload>(["viewOptions", "PROJECT", inboxProjectId])


    const handleUpdateViewOption = (payload: Partial<ViewOptionsPayload>) => {
        updateViewOptions({
            view_type: "PROJECT",
            object_id: inboxProjectId!,
            ...payload,
        });
    };

    useEffect(() => {
        setGroupedBy(viewOptions?.grouped_by ?? null)
    }, [viewOptions?.grouped_by, setGroupedBy]);
    const layoutName = viewOptions?.view_mode ?? "LIST"

    const handleOpenLayoutDropdown = () => {
        setOpenLayoutDropdown(prev => !prev);
    }
    const handleSelectLayout = (layout: ViewMode) => {
        handleUpdateViewOption({
            view_mode: layout
        })
    }

    const groupedTasks = useMemo(() => {
        if(!isGrouping) return []
        return allTasks?.grouped ?? []
    }, [isGrouping, allTasks?.grouped])

    useEffect(() => {
        if(inboxProjectId){
            setProjectId(inboxProjectId)
        }
    }, [inboxProjectId, setProjectId])

    const NO_SECTION = {
        id: null,
        name: "(No section)",
        project_id: inboxProjectId,
    } as Section;

    const {setDragPreview, clearDragPreview} = useDragStore()
    const handleDragEnd = async (e: DragEndEvent) => {
        const {active, over} = e
        if(!over || active.id === over.id) return;
        const activeType = active.data.current?.type;
        const overType = over.data.current?.type;
        const dropType = over.data.current?.dropType;
        const isDropInside = overType === "task" && activeType === "task" && dropType === "inside";
        if(activeType === "section" && overType === "section"){
            const sectionList = sections?.results;
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

        await handleReorderTask(tasks, activeTask, overTask, inboxProjectId, movingTaskMutate, reorderingTaskMutate, isDropInside)
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
                    <div className={"relative p-1 md:p-2.5"}>
                        <button type={"button"} className={"flex items-center px-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"} onClick={handleOpenLayoutDropdown}>
                            <div className={"flex items-center justify-center w-9 h-9 shrink-0"}>
                                <SmallListIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                            </div>
                            <span className="hidden md:block text-product-library-actionable-quaternary-idle-tint text-sm font-medium">Display</span>

                        </button>
                        {openLayoutDropdown && (<MyTaskLayoutFiltersDropdown onSelectLayout={handleSelectLayout} layoutTitle={layoutName} onUpdateViewOption={handleUpdateViewOption} viewType={"PROJECT"} viewId={inboxProjectId}/>)}
                    </div>
                    <button type={"button"} className={"flex items-center justify-center w-9 h-9 shrink-0 p-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"}>
                        <CommentIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                    </button>
                    <button type={"button"} className={"flex items-center justify-center w-9 h-9 shrink-0 p-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"}>
                        <ThreeDotsIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                    </button>
                </div>
            }></HeaderLayout>

            <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver} collisionDetection={customCollisionDetection}>
                {layoutName === "LIST" ? (
                    <section className={"max-w-200 mx-auto w-full relative z-10"}>
                        <div className={"flex flex-col gap-small"}>
                            <h1 className="p-1 font-strong text-product-library-display-primary-idle-tint text-header-large">
                                Inbox
                            </h1>
                            {allTasks?.results && allTasks?.results.length > 0 ?
                                <MyTasksList filteredSectionsByProject={sections?.results} isGrouping={isGrouping} groupedTasks={groupedTasks} tasks={allTasks?.results ?? []} noSection={NO_SECTION} isLoading={isLoading}/>
                            : <EmptyInboxTasks/>}
                        </div>
                    </section>
                ) : (
                    <section className={"px-10"}>
                        <div className={"flex flex-col gap-small"}>
                            <h1 className="p-1 font-strong text-product-library-display-primary-idle-tint text-header-large">
                                Inbox
                            </h1>
                            <MyTasksBoard filteredSectionsByProject={sections?.results} isGrouping={isGrouping} groupedTasks={groupedTasks} tasks={allTasks?.results ?? []} noSection={NO_SECTION} isLoading={isLoading}/>
                        </div>
                    </section>
                )}
            </DndContext>

        </>
    );
};

export default InboxPage;
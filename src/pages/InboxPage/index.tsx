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
import {useGetAllSections} from "@/hooks/useQueryHook/useSections.ts";
import {useGroupingTaskStore} from "@/stores/groupingTask.store.ts";
import type {Section} from "@/types/section.type.ts";
import {useGetAllProjects} from "@/hooks/useQueryHook/useProjects.ts";

const InboxPage = () => {
    const {showCollapse, onToggleSidebar} = useOutletContext<HeaderLayoutType>()
    const {groupedBy, setGroupedBy} = useGroupingTaskStore()
    const [openLayoutDropdown, setOpenLayoutDropdown] = useState(false);
    const {mutate: updateViewOptions} = useViewOptions()
    const isGrouping = groupedBy != null;
    const {data: projects} = useGetAllProjects()
    const inboxProjectId = useMemo(() => projects?.results?.find(p => p.name === "Inbox")?.id, [projects?.results])
    console.log("inbox id", inboxProjectId)
    const {data: sections} = useGetAllSections({project_id: inboxProjectId});
    const {data: allTasks, isLoading} = useTasksWithView({project_id: inboxProjectId}, "PROJECT", inboxProjectId);

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

    const NO_SECTION = {
        id: null,
        name: "(No section)",
        project_id: inboxProjectId,
    } as Section;
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
                        {openLayoutDropdown && (<MyTaskLayoutFiltersDropdown onSelectLayout={handleSelectLayout} layoutTitle={layoutName} onUpdateViewOption={handleUpdateViewOption}/>)}
                    </div>
                    <button type={"button"} className={"flex items-center justify-center w-9 h-9 shrink-0 p-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"}>
                        <CommentIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                    </button>
                    <button type={"button"} className={"flex items-center justify-center w-9 h-9 shrink-0 p-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"}>
                        <ThreeDotsIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                    </button>
                </div>
            }></HeaderLayout>

            {layoutName === "LIST" ? (
                <section className={"max-w-200 mx-auto w-full relative z-10"}>
                    <div className={"flex flex-col gap-small"}>
                        <h1 className="p-1 font-strong text-product-library-display-primary-idle-tint text-header-large">
                            Inbox
                        </h1>
                        <MyTasksList filteredSectionsByProject={sections?.results} isGrouping={isGrouping} groupedTasks={groupedTasks} tasks={allTasks?.results ?? []} noSection={NO_SECTION} isLoading={isLoading}/>
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
        </>
    );
};

export default InboxPage;
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import SmallListIcon from "@/components/icons/SmallListIcon.tsx";
import MyTaskLayoutFiltersDropdown from "@/components/MyTasksComponent/MyTaskLayoutFiltersDropdown";
import ThreeDotsIcon from "@/components/icons/ThreeDotsIcon.tsx";
import {FILTERS_LABEL} from "@/constants/routes.constants.ts";
import HeaderThreeDotsIcon from "@/components/icons/HeaderThreeDotsIcon.tsx";
import HeaderLayout from "@/layouts/HeaderLayout.tsx";
import {useGroupingTaskStore} from "@/stores/groupingTask.store.ts";
import {useEffect, useMemo, useState} from "react";
import type {ViewMode, ViewOptionsPayload} from "@/types/viewOptions.type.ts";
import type {HeaderLayoutType} from "@/types/headerLayout.type.ts";
import {useTasksWithView, useViewOptions} from "@/hooks/useQueryHook/useViewOptions.ts";
import {useProjectStore} from "@/stores/project.store.ts";
import {useGetALabel} from "@/hooks/useQueryHook/useLabels.ts";
import MyTaskLabelTitle from "@/components/MyTasksComponent/TasksLabelComponent/MyTaskLabelTitle.tsx";
import MyTaskListLabelSection from "@/components/MyTasksComponent/TasksLabelComponent/MyTaskListLabelSection.tsx";
import {useGetAllSections} from "@/hooks/useQueryHook/useSections.ts";
import {useGetAllProjects} from "@/hooks/useQueryHook/useProjects.ts";
import MyTaskBoardLabelSection
    from "@/components/MyTasksComponent/TasksLabelComponent/MyTaskBoardLabelSection/MyTaskBoardLabelSection.tsx";
import MyTaskListGroupSection from "@/components/MyTasksComponent/TasksGroupComponent/MyTaskListGroupSection.tsx";
import MyTaskBoardGroupSection from "@/components/MyTasksComponent/TasksGroupComponent/MyTaskBoardGroupSection";
import {useViewOptionsStore} from "@/stores/viewOptions.store.ts";
import LoadingSpin from "@/components/ui/LoadingSpin.tsx";

const MyLabelDetailPage = () => {
    const {labelId} = useParams<{labelId: string}>()
    const {projectId} = useProjectStore()
    const {groupedBy, setGroupedBy} = useGroupingTaskStore()
    const isGrouping = groupedBy != null;
    const [openLayoutDropdown, setOpenLayoutDropdown] = useState(false);
    const {mutate: updateViewOptions} = useViewOptions()
    const {data: projectsData} = useGetAllProjects()
    const {data: labelData} = useGetALabel(labelId)
    const {data: tasksData, isLoading} = useTasksWithView({label: labelData?.name}, "LABEL", labelId)
    const {data: sectionsData} = useGetAllSections({project_id: projectId})
    const {hydrated} = useViewOptionsStore()
    const viewOptions = useViewOptionsStore(state => labelId ? state.getViewOptions("LABEL", labelId): undefined)
    const layoutName = viewOptions?.view_mode ?? "LIST"

    useEffect(() => {
        setGroupedBy(viewOptions?.grouped_by ?? null)
    }, [viewOptions?.grouped_by, setGroupedBy]);

    const groupedTasks = useMemo(() => {
        if(!isGrouping) return []
        return tasksData?.grouped ?? []
    }, [isGrouping, tasksData?.grouped])
    const handleUpdateViewOption = (payload: Partial<ViewOptionsPayload>) => {
        updateViewOptions({
            view_type: "LABEL",
            object_id: labelId!,
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

    if(!hydrated){
        return <LoadingSpin/>
    }
    return (
        <>
            <HeaderLayout showCollapse={showCollapse} onToggleSidebar={onToggleSidebar} right={
                <div className={"flex justify-end items-center"}>
                    <div className={"relative p-1 md:p-2.5"}>
                        <button type={"button"} className={"flex items-center px-1.5 hover:bg-product-library-selectable-secondary-hover-fill rounded-small"} onClick={handleOpenLayoutDropdown}>
                            <div className={"flex items-center justify-center w-9 h-9 shrink-0"}>
                                <SmallListIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                            </div>
                            <span className="hidden md:block text-product-library-actionable-quaternary-idle-tint text-sm font-medium">Display</span>

                        </button>
                        {openLayoutDropdown && (<MyTaskLayoutFiltersDropdown onSelectLayout={handleSelectLayout} layoutTitle={layoutName} onUpdateViewOption={handleUpdateViewOption} viewType={"LABEL"} viewId={labelId}/>)}
                    </div>
                    <button type={"button"} className={"flex items-center justify-center w-9 h-9 shrink-0 p-1.5 hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}>
                        <ThreeDotsIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                    </button>
                </div>
            } left={<div className={"flex items-center mr-auto"}>
                <button onClick={() => navigate(FILTERS_LABEL)} className={"flex sm:hidden justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill rounded-small p-1.5"}>
                    <HeaderThreeDotsIcon className={"text-product-library-display-secondary-idle-tint"}/>
                </button>
                <button className={"hidden sm:block px-1 text-product-library-actionable-quaternary-idle-tint text-sm font-medium hover:bg-product-library-selectable-secondary-hover-fill rounded-small p-1.5"} onClick={() => navigate(FILTERS_LABEL)}>Filters & Labels</button>
                <div className={"text-sm text-product-library-display-secondary-idle-tint"}>/</div>
            </div>}></HeaderLayout>

            {layoutName === "LIST" ? (
                <section className={"max-w-200 mx-auto w-full relative z-10"}>
                    <div className={"flex flex-col gap-small"}>
                        <MyTaskLabelTitle labelData={labelData}/>
                        {isGrouping ? (
                            groupedTasks.map((group, index) => <MyTaskListGroupSection key={index} title={group.title} tasks={group.tasks} sections={sectionsData?.results}/>)
                        ) :
                            <MyTaskListLabelSection tasks={tasksData?.results} sections={sectionsData?.results} isLoading={isLoading} isSortable={false} isTasksLabelView={true} projects={projectsData?.results}/>
                        }
                    </div>
                </section>
                ) : (
                    <section className={"px-10"}>
                        <div className={"flex flex-col gap-small"}>
                            <MyTaskLabelTitle labelData={labelData}/>
                                {isGrouping ? (
                                        <>
                                            <div className={"flex items-start overflow-x-auto scrollbar-thin scrollbar-custom"}>
                                            {
                                                groupedTasks.map((group, index) => <MyTaskBoardGroupSection key={index} title={group.title} tasks={group.tasks} sections={sectionsData?.results}/> )
                                            }
                                        </div>
                                    </>
                                    ) :
                                    <MyTaskBoardLabelSection tasks={tasksData?.results} sections={sectionsData?.results} isSortable={false} isTasksLabelView={true} projects={projectsData?.results}/>
                                }
                        </div>
                    </section>
            )}

        </>
    );
};

export default MyLabelDetailPage;
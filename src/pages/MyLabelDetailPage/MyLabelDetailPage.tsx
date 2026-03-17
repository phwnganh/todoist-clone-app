import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import SmallListIcon from "@/components/icons/SmallListIcon.tsx";
import MyTaskLayoutFiltersDropdown from "@/components/MyTasksComponent/MyTaskLayoutFiltersDropdown";
import ThreeDotsIcon from "@/components/icons/ThreeDotsIcon.tsx";
import {FILTERS_LABEL} from "@/constants/routes.constants.ts";
import HeaderThreeDotsIcon from "@/components/icons/HeaderThreeDotsIcon.tsx";
import HeaderLayout from "@/layouts/HeaderLayout.tsx";
import {useGroupingTaskStore} from "@/stores/groupingTask.store.ts";
import {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import type {ViewMode, ViewOptionsPayload} from "@/types/viewOptions.type.ts";
import type {HeaderLayoutType} from "@/types/headerLayout.type.ts";
import {useViewOptions} from "@/hooks/useQueryHook/useViewOptions.ts";
import type {Section} from "@/types/section.type.ts";
import {useProjectStore} from "@/stores/project.store.ts";
import {useGetALabel} from "@/hooks/useQueryHook/useLabels.ts";
import MyTaskLabelTitle from "@/components/MyTasksComponent/TasksLabelComponent/MyTaskLabelTitle.tsx";
import MyTaskListLabelSection from "@/components/MyTasksComponent/TasksLabelComponent/MyTaskListLabelSection.tsx";
import {useGetAllTasks} from "@/hooks/useQueryHook/useTasks.ts";
import {useGetAllSections} from "@/hooks/useQueryHook/useSections.ts";
import {useGetAllProjects} from "@/hooks/useQueryHook/useProjects.ts";

const MyLabelDetailPage = () => {
    const {labelId} = useParams<{labelId: string}>()
    const {projectId} = useProjectStore()
    const {groupedBy, setGroupedBy} = useGroupingTaskStore()
    const [openLayoutDropdown, setOpenLayoutDropdown] = useState(false);
    const {mutate: updateViewOptions} = useViewOptions()
    const {data: projectsData} = useGetAllProjects()
    const {data: labelData} = useGetALabel(labelId)
    const {data: tasksData, isLoading} = useGetAllTasks({label: labelData?.name})
    const {data: sectionsData} = useGetAllSections({project_id: projectId})
    const queryClient = useQueryClient()
    const viewOptions = queryClient.getQueryData<ViewOptionsPayload>(["viewOptions", "LABEL", labelId])
    const layoutName = viewOptions?.view_mode ?? "LIST"

    const NO_SECTION = {
        id: null,
        name: "(No section)",
        project_id: projectId,
    } as Section;
    useEffect(() => {
        setGroupedBy(viewOptions?.grouped_by ?? null)
    }, [viewOptions?.grouped_by, setGroupedBy]);

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
                        <MyTaskListLabelSection tasksData={tasksData} sectionsData={sectionsData} isLoading={isLoading} isSortable={false} isTasksLabelView={true} projectsData={projectsData}/>
                    </div>
                </section>
                ) : (
                    <section className={"px-10"}>
                        <div className={"flex flex-col gap-small"}>
                            <MyTaskLabelTitle labelData={labelData}/>
                        </div>
                    </section>
            )}

        </>
    );
};

export default MyLabelDetailPage;
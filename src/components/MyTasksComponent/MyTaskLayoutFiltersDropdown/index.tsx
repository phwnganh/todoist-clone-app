import QuestionIcon from "../../../assets/question-icon.svg";
import { LAYOUT_ITEMS } from "../../../data/menuNav.data.ts";
import { Fragment, useRef, useState } from "react";
import CustomSwitch from "../../ui/CustomSwitch.tsx";
import TaskSmallArrowDownIcon from "../../icons/TaskSmallArrowDownIcon.tsx";
import type { OpenMyTaskFilterDropdown } from "../../../types/menu-nav.type.ts";
import { useClickOutside } from "../../../hooks/useClickOutside.ts";
import MyTaskFilterGroupingDropdown from "./MyTaskFilterGroupingDropdown.tsx";
import MyTaskFilterSortingDropdown from "./MyTaskFilterSortingDropdown.tsx";
import MyTaskFilterDateDropdown from "./MyTaskFilterDateDropdown.tsx";
import MyTaskFilterPriorityDropdown from "./MyTaskFilterPriorityDropdown.tsx";
import {useViewOptions} from "../../../hooks/useQueryHook/useViewOptions.ts";
import type {GroupedBy, SortedBy, SortOrder, ViewOptionsPayload} from "../../../types/viewOptions.type.ts";
import {useProjectStore} from "../../../stores/project.store.ts";
import {useQueryClient} from "@tanstack/react-query";
import {directionFilterData, groupingFilterData, sortingFilterData} from "../../../data/myTaskFilter.data.ts";
import MyTaskFilterDirectionDropdown from "./MyTaskFilterDirectionDropdown.tsx";
import MyTaskFilterLabelDropdown from "./MyTaskFilterLabelDropdown";
import type {Label} from "../../../types/label.type.ts";
import {buildFilterQuery, parseFilterQuery} from "../../../helpers/groupSortTasks.ts";
import {extractLabelsFromList} from "../../../helpers/extractCriteriaFromFiltereds.ts";

type MyTaskLayoutFiltersDropdownProps = {
  onSelectLayout: (layoutName: string) => void;
  layoutTitle: string;
};
const MyTaskLayoutFiltersDropdown = ({
  onSelectLayout,
  layoutTitle,
}: MyTaskLayoutFiltersDropdownProps) => {
  const [openDropdown, setOpenDropdown] =
    useState<OpenMyTaskFilterDropdown>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const sortRef = useRef<HTMLDivElement | null>(null);
  const directionRef = useRef<HTMLDivElement | null>(null)
  const dateRef = useRef<HTMLDivElement | null>(null);
  const priorityRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const dummyRef = useRef<HTMLDivElement | null>(null);
  const {projectId} = useProjectStore()
const {mutate} = useViewOptions()
  const queryClient = useQueryClient()
  const viewOptions = queryClient.getQueryData<ViewOptionsPayload>([
      'viewOptions',
      'PROJECT',
      projectId
  ])

  const selectedGroupingLabel = groupingFilterData.find(g => g.key === viewOptions?.grouped_by)?.label ?? "None"
  const selectedSortingLabel = sortingFilterData.find(s => s.key === viewOptions?.sorted_by)?.label ?? "Manual"
  const selectedDirectionLabel = directionFilterData.find(d => d.key === viewOptions?.sort_order)?.label ?? "Ascending"

  const parsedCriteria = parseFilterQuery(viewOptions?.filtered_by)


  const selectedLabelName = extractLabelsFromList(parsedCriteria).map(l => l.replace("@", ""))
  const getSelectedLabelToDisplay = (labels: string[]) => {
    if(labels.length === 0) return "All"
    if(labels.length === 1) return labels[0]
    return `${labels[0]} +${labels.length - 1} more`
  }
  const displayLabels = getSelectedLabelToDisplay(selectedLabelName)

  const handleUpdateViewOption = (payload: Partial<ViewOptionsPayload>) => {
    mutate({
      view_type: "PROJECT",
      object_id: projectId,
      ...payload
    })
  }
  const handleToggleDropdown = (openDropdown: OpenMyTaskFilterDropdown) => {
    setOpenDropdown((prev) => (prev === openDropdown ? null : openDropdown));
  };

  const handleSelectGrouping = (group?: GroupedBy | null) => {
    handleUpdateViewOption({
      grouped_by: group ?? null
    })
    setOpenDropdown(null);
  };

  const handleSelectSorting = (sort?: SortedBy | null, order: SortOrder = "ASC") => {
    if(!sort){
      handleUpdateViewOption({
        sorted_by: null,
        sort_order: null
      })
    }else{
      handleUpdateViewOption({
        sorted_by: sort ?? null,
        sort_order: order ?? "ASC"
      })
    }
    setOpenDropdown(null);
  };

  const handleSelectDirection = (direction?: SortOrder) => {
    handleUpdateViewOption({
      sort_order: direction
    })
    setOpenDropdown(null);
  }

  const handleToggleCompleted = (checked: boolean) => {
    handleUpdateViewOption({
      show_completed_tasks: checked
    })
  }

  const handleSelectDate = () => {

    setOpenDropdown(null);
  };

  const handleSelectPriority = (priority?: string) => {
    const criteria = parseFilterQuery(viewOptions?.filtered_by)
    const cleanedFilteringPriority = criteria.filter(p => !/^p[1-4]$/.test(p) && p !== "No priority")
    if(!priority){
      handleUpdateViewOption({
        filtered_by: buildFilterQuery(cleanedFilteringPriority)
      })
      return;
    }
    const newPriorityCriteria = [...cleanedFilteringPriority, priority]
    handleUpdateViewOption({
      filtered_by: buildFilterQuery(newPriorityCriteria)
    })
    setOpenDropdown(null);
  };


  const handleSelectLabel = (label?: Label) => {
    if(!label) return;

    const criteria = parseFilterQuery(viewOptions?.filtered_by)
    const labelName = `@${label.name}`

    // all the active labels
    const currentLabels = extractLabelsFromList(criteria)

    // toggle labels
    const updatedLabels = currentLabels.includes(labelName) ? currentLabels.filter(l => l !== labelName) : [...currentLabels, labelName]

    // remove labels
    const nonLabelCriteria = criteria.filter(l => !l.startsWith("@") && !(l.startsWith("(") && l.includes("@")))

    const finalCriteria = [...nonLabelCriteria];

    if(updatedLabels.length === 1){
      finalCriteria.push(updatedLabels[0])
    }

    if(updatedLabels.length > 1){
      finalCriteria.push(`(${updatedLabels.join(" | ")})`)
    }
    handleUpdateViewOption({
      filtered_by: buildFilterQuery(finalCriteria)
    })
    setOpenDropdown(null);
  }

  useClickOutside({
    ref:
      openDropdown === "grouping"
        ? groupRef
        : openDropdown === "sorting"
          ? sortRef : openDropdown === "direction" ? directionRef
          : openDropdown === "date"
            ? dateRef
            : openDropdown === "priority"
              ? priorityRef : openDropdown === "label" ? labelRef
              : dummyRef,
    handler: () => setOpenDropdown(null),
    enabled: openDropdown !== null,
  });
  const layoutItemClass = (layoutName: string) => `
    pt-xsmall px-xsmall pb-small w-full cursor-pointer ${
      layoutTitle === layoutName
        ? "bg-white rounded-large text-product-library-display-primary-idle-tint"
        : "hover:text-product-library-display-primary-idle-tint"
    }`;
  return (
    <div
      className={
        "absolute top-full right-0 z-50 rounded-large w-75 shadow-product-library-shadow-raised-1 border border-product-library-divider-primary bg-white"
      }
    >
      <div className={"flex flex-col gap-1.5"}>
        <div className={"p-1.5 flex flex-col gap-1.5"}>
          <div className={"px-1.5 flex justify-between items-center"}>
            <p className={"text-sm font-medium"}>Layout</p>
            <div className={"w-6 h-6 flex justify-center items-center"}>
              <img src={QuestionIcon} alt={"question-icon"} />
            </div>
          </div>

          <div className={"p-1 flex gap-small"}>
            <div className="w-full flex justify-center border-2 border-product-library-selectable-background gap-0.75 bg-product-library-selectable-background rounded-large text-product-library-display-secondary-idle-tint ">
              {LAYOUT_ITEMS.map((layout) => {
                return (
                  <Fragment key={layout.key}>
                    <label className={`${layoutItemClass(layout.key)}`}>
                      <input
                        type="radio"
                        className="sr-only"
                        value={layout.key}
                        checked={layoutTitle === layout.key}
                        onChange={() => onSelectLayout(layout.key)}
                      />
                      <span className="flex flex-col gap-xsmall items-center justify-center text-xs">
                        <img src={layout.icon} alt={layout.key} />
                        {layout.label}
                      </span>
                    </label>
                  </Fragment>
                );
              })}
            </div>
          </div>

          <div className={"pr-1 pl-1.5 flex justify-between items-center"}>
            <p className={"text-sm"}>Completed tasks</p>
            <CustomSwitch onChange={(e) => handleToggleCompleted(e.target.checked)}/>
          </div>
        </div>
        <hr className="border-t border-t-product-library-divider-tertiary overflow-hidden" />
        <div className={"px-1.5"}>
          <div className={"px-1.5 flex items-center justify-between"}>
            <p className={"text-sm font-medium"}>Sort</p>
            <div className={"flex justify-center items-center w-7 h-7"}>
              <TaskSmallArrowDownIcon />
            </div>
          </div>
          <div className={"relative"} ref={groupRef}>
            <button
              className={
                "py-0.5 px-1 flex items-center justify-between gap-small w-full"
              }
              onClick={() => handleToggleDropdown("grouping")}
            >
              <p className={"text-sm"}>Grouping</p>
              <div
                className={
                  "cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"
                }
              >
                <p className={"text-sm"}>{selectedGroupingLabel}</p>
                <div className={"flex justify-center items-center w-7 h-7"}>
                  <TaskSmallArrowDownIcon />
                </div>
              </div>
            </button>
            {openDropdown === "grouping" && <MyTaskFilterGroupingDropdown selectedGrouping={viewOptions?.grouped_by ?? null} onSelectGrouping={handleSelectGrouping}/>}
          </div>
          <div className={"relative"} ref={sortRef}>
            <button
              className={
                "py-0.5 px-1 flex items-center justify-between gap-small w-full"
              }
              onClick={() => handleToggleDropdown("sorting")}
            >
              <p className={"text-sm"}>Sorting</p>
              <div
                className={
                  "cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"
                }
              >
                <p className={"text-sm"}>{selectedSortingLabel}</p>
                <div className={"flex justify-center items-center w-7 h-7"}>
                  <TaskSmallArrowDownIcon />
                </div>
              </div>
            </button>
            {openDropdown === "sorting" && <MyTaskFilterSortingDropdown selectedSorting={viewOptions?.sorted_by ?? null} onSelectSorting={handleSelectSorting}/>}
          </div>

          {viewOptions?.sorted_by &&
              <div className={"relative"} ref={directionRef}>
                <button className={"py-0.5 px-1 flex items-center justify-between gap-small w-full"} onClick={() => handleToggleDropdown("direction")}>
                  <p className={"text-sm"}>Direction</p>
                  <div
                      className={
                        "cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"
                      }
                  >
                    <p className={"text-sm"}>{selectedDirectionLabel}</p>
                    <div className={"flex justify-center items-center w-7 h-7"}>
                      <TaskSmallArrowDownIcon />
                    </div>
                  </div>
                </button>
                {openDropdown === "direction" && <MyTaskFilterDirectionDropdown selectedDirection={viewOptions?.sort_order} onSelectDirection={handleSelectDirection}/>}
              </div>
          }

          <div className={"px-1.5 flex items-center justify-between"}>
            <p className={"text-sm font-medium"}>Filter</p>
            <div className={"flex justify-center items-center w-7 h-7"}>
              <TaskSmallArrowDownIcon />
            </div>
          </div>

          <div className={"relative"} ref={dateRef}>
            <button
              className={
                "py-0.5 px-1 flex items-center justify-between gap-small w-full"
              }
              onClick={() => handleToggleDropdown("date")}
            >
              <p className={"text-sm"}>Date</p>
              <div
                className={
                  "cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"
                }
              >
                <p className={"text-sm"}>All</p>
                <div className={"flex justify-center items-center w-7 h-7"}>
                  <TaskSmallArrowDownIcon />
                </div>
              </div>
            </button>
            {openDropdown === "date" && <MyTaskFilterDateDropdown />}
          </div>

          <div className={"relative"} ref={priorityRef}>
            <button
              className={
                "py-0.5 px-1 flex items-center justify-between gap-small w-full"
              }
              onClick={() => handleToggleDropdown("priority")}
            >
              <p className={"text-sm"}>Priority</p>
              <div
                className={
                  "cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"
                }
              >
                <p className={"text-sm"}>All</p>
                <div className={"flex justify-center items-center w-7 h-7"}>
                  <TaskSmallArrowDownIcon />
                </div>
              </div>
            </button>
            {openDropdown === "priority" && <MyTaskFilterPriorityDropdown/>}
          </div>

          <div className={"relative"} ref={labelRef}>
            <button
                className={
                  "py-0.5 px-1 flex items-center justify-between gap-small w-full"
                }
                onClick={() => handleToggleDropdown("label")}
            >
              <p className={"text-sm"}>Label</p>
              <div
                  className={
                    "cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"
                  }
              >
                <p className={"text-sm"}>{displayLabels}</p>
                <div className={"flex justify-center items-center w-7 h-7"}>
                  <TaskSmallArrowDownIcon />
                </div>
              </div>
            </button>
            {openDropdown === "label" && <MyTaskFilterLabelDropdown selectedFilteringLabel={selectedLabelName} onSelectFilteringLabel={handleSelectLabel}/>}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyTaskLayoutFiltersDropdown;

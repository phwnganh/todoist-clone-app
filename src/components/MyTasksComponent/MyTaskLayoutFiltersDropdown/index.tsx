import { LAYOUT_ITEMS } from "@/data/menuNav.data.ts";
import { Fragment, useRef, useState } from "react";
import CustomSwitch from "@/components/ui/CustomSwitch.tsx";
import TaskSmallArrowDownIcon from "@/components/icons/TaskSmallArrowDownIcon.tsx";
import type { OpenMyTaskFilterDropdown } from "@/types/menu-nav.type.ts";
import { useClickOutside } from "@/hooks/useClickOutside.ts";
import type {
  GroupedBy,
  SortedBy,
  SortOrder, ViewMode,
  ViewOptionsPayload, ViewTypes,
} from "@/types/viewOptions.type.ts";
import {
  dateFilterData,
  directionFilterData,
  groupingFilterData, priorityFilterData,
  sortingFilterData,
} from "@/data/myTaskFilter.data.ts";
import type { Label } from "@/types/label.type.ts";
import {
  buildDateFilterQuery,
  buildFilterQuery,
  parseFilterQuery,
} from "@/helpers/groupSortTasks.ts";
import {
  extractDateFromList,
  extractLabelsFromList,
  extractPrioritiesFromList, isDateCriteria,
} from "@/helpers/extractCriteriaFromFiltereds.ts";
import type { Priority } from "@/types/task.type.ts";
import GroupingTaskSection from "./EachTaskLayoutFieldSection/GroupingTaskSection.tsx";
import SortingTaskSection from "./EachTaskLayoutFieldSection/SortingTaskSection.tsx";
import DirectingTaskSection from "./EachTaskLayoutFieldSection/DirectingTaskSection.tsx";
import ResettingFiltersButton from "./ResettingFiltersButton.tsx";
import FilteringDateSection from "./EachTaskLayoutFieldSection/FilteringDateSection.tsx";
import FilteringPrioritiesSection from "./EachTaskLayoutFieldSection/FilteringPrioritiesSection.tsx";
import FilteringLabelsSection from "./EachTaskLayoutFieldSection/FilteringLabelsSection.tsx";
import {useExpanded} from "@/hooks/useExpanded.ts";
import TaskSmallArrowRightIcon from "@/components/icons/TaskSmallArrowRightIcon.tsx";
import QuestionIcon from "@/components/icons/QuestionIcon.tsx";
import {useViewOptionsStore} from "@/stores/viewOptions.store.ts";
import LoadingSpin from "@/components/ui/LoadingSpin.tsx";

type MyTaskLayoutFiltersDropdownProps = {
  onSelectLayout: (layout: ViewMode) => void;
  layoutTitle: string;
  onUpdateViewOption: (payload: Partial<ViewOptionsPayload>) => void;
  viewType: ViewTypes
  viewId?: string;
};
const MyTaskLayoutFiltersDropdown = ({
  onSelectLayout,
  layoutTitle,
    onUpdateViewOption,
    viewType,
    viewId,
}: MyTaskLayoutFiltersDropdownProps) => {
  const [openDropdown, setOpenDropdown] =
    useState<OpenMyTaskFilterDropdown>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const sortRef = useRef<HTMLDivElement | null>(null);
  const directionRef = useRef<HTMLDivElement | null>(null);
  const dateRef = useRef<HTMLDivElement | null>(null);
  const priorityRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const dummyRef = useRef<HTMLDivElement | null>(null);
  const sortExpanded = useExpanded()
  const filterExpanded = useExpanded()

  const {hydrated} = useViewOptionsStore()
  const viewOptions = useViewOptionsStore(state => viewId ? state.getViewOptions(viewType, viewId) : undefined)

  const hasActiveFilters = viewOptions?.grouped_by != null || viewOptions?.sorted_by != null || viewOptions?.sort_order != null || viewOptions?.filtered_by != null || viewOptions?.show_completed_tasks;

  const selectedGroupingLabel =
    groupingFilterData.find((g) => g.key === viewOptions?.grouped_by)?.label ??
    "None";
  const selectedSortingLabel =
    sortingFilterData.find((s) => s.key === viewOptions?.sorted_by)?.label ??
    "Manual";
  const selectedDirectionLabel =
    directionFilterData.find((d) => d.key === viewOptions?.sort_order)?.label ??
    "Ascending";

  const parsedCriteria = parseFilterQuery(viewOptions?.filtered_by);

  const selectedLabelName = extractLabelsFromList(parsedCriteria).map((l) =>
    l.replace("@", ""),
  );
  const getSelectedLabelToDisplay = (labels: string[]) => {
    if (labels.length === 0) return "All";
    if (labels.length === 1) return labels[0];
    return `${labels[0]} +${labels.length - 1} more`;
  };
  const displayLabels = getSelectedLabelToDisplay(selectedLabelName);

  const selectedPriorityKey = extractPrioritiesFromList(parsedCriteria);
  const displayPriorities = selectedPriorityKey.length === 0 ? "All" : selectedPriorityKey.join(" | ")

  const selectedDateQuery = extractDateFromList(parsedCriteria)
  const displayDate = dateFilterData.find(d => buildDateFilterQuery(d.key) === selectedDateQuery)?.label ?? "All"

  const handleToggleDropdown = (openDropdown: OpenMyTaskFilterDropdown) => {
    setOpenDropdown((prev) => (prev === openDropdown ? null : openDropdown));
  };

  const handleSelectGrouping = (group?: GroupedBy | null) => {
    onUpdateViewOption({
      grouped_by: group ?? null,
    });
    setOpenDropdown(null);
  };

  const handleSelectSorting = (
    sort?: SortedBy | null
  ) => {
    if (!sort) {
      onUpdateViewOption({
        sorted_by: null,
        sort_order: null,
      });
    } else {
      onUpdateViewOption({
        sorted_by: sort ?? null,
        sort_order: viewOptions?.sort_order ?? "ASC",
      });
    }
    setOpenDropdown(null);
  };

  const handleSelectDirection = (direction?: SortOrder) => {
    onUpdateViewOption({
      sort_order: direction,
    });
    setOpenDropdown(null);
  };

  const handleToggleCompleted = (checked: boolean) => {
    onUpdateViewOption({
      show_completed_tasks: checked,
    });
  };

  const handleSelectDate = (dateKey: string | null) => {
    const criteria = parseFilterQuery(viewOptions?.filtered_by)

    const nonDateCriteria = criteria.filter(c => !isDateCriteria(c))
    const newDateQuery = buildDateFilterQuery(dateKey)
    const finalCriteria = [...nonDateCriteria]

    if(newDateQuery){
      finalCriteria.push(newDateQuery)
    }

    onUpdateViewOption({
      filtered_by: buildFilterQuery(finalCriteria)
    })
    setOpenDropdown(null);
  };

  const handleSelectPriority = (priority?: Priority) => {
    if (!priority) return;
    const labelKey = priority.key;
    const criteria = parseFilterQuery(viewOptions?.filtered_by);
    const currentPriorities = extractPrioritiesFromList(criteria);
    const updatePriorities = currentPriorities.includes(labelKey)
      ? currentPriorities.filter((p) => p !== labelKey)
      : [...currentPriorities, labelKey];

    const AllPriorities = priorityFilterData.map(p => p.key)
    const isAllSelected = updatePriorities.length === AllPriorities.length

    const nonPriorityCriteria = criteria.filter((p) => {
      if (/^p[1-4]$/.test(p)) return false;
      else if (p.startsWith("(") && /p[1-4]/.test(p)) return false;
      return true;
    });

    const finalCriteria = [...nonPriorityCriteria];

    if(!isAllSelected && updatePriorities.length > 0){
      finalCriteria.push(updatePriorities.length === 1 ? updatePriorities[0] : `(${updatePriorities.join(" | ")})`)
    }

    onUpdateViewOption({
      filtered_by: buildFilterQuery(finalCriteria),
    });
    setOpenDropdown(null);
  };

  const handleResetFilters = () => {
    onUpdateViewOption({
      grouped_by: null,
      sorted_by: null,
      sort_order: null,
      filtered_by: null,
      show_completed_tasks: false,
    })
  }

  const handleSelectLabel = (label?: Label) => {
    if (!label) return;

    const criteria = parseFilterQuery(viewOptions?.filtered_by);
    const labelName = `@${label.name}`;

    // all the active labels
    const currentLabels = extractLabelsFromList(criteria);

    // toggle labels
    const updatedLabels = currentLabels.includes(labelName)
      ? currentLabels.filter((l) => l !== labelName)
      : [...currentLabels, labelName];

    // remove labels
    const nonLabelCriteria = criteria.filter(
      (l) => !l.startsWith("@") && !(l.startsWith("(") && l.includes("@")),
    );

    const finalCriteria = [...nonLabelCriteria];

    if (updatedLabels.length === 1) {
      finalCriteria.push(updatedLabels[0]);
    }

    if (updatedLabels.length > 1) {
      finalCriteria.push(`(${updatedLabels.join(" | ")})`);
    }
    onUpdateViewOption({
      filtered_by: buildFilterQuery(finalCriteria),
    });
    setOpenDropdown(null);
  };

  useClickOutside({
    ref:
      openDropdown === "grouping"
        ? groupRef
        : openDropdown === "sorting"
          ? sortRef
          : openDropdown === "direction"
            ? directionRef
            : openDropdown === "date"
              ? dateRef
              : openDropdown === "priority"
                ? priorityRef
                : openDropdown === "label"
                  ? labelRef
                  : dummyRef,
    handler: () => setOpenDropdown(null),
    enabled: openDropdown !== null,
  });
  const layoutItemClass = (layoutName: string) => `
    pt-xsmall px-xsmall pb-small w-full cursor-pointer ${
      layoutTitle === layoutName
        ? "bg-product-library-background-base-primary rounded-large text-product-library-display-primary-idle-tint"
        : "hover:text-product-library-display-primary-idle-tint"
    }`;

  if(!hydrated){
    return <LoadingSpin/>
  }
  return (
    <div
      className={
        "absolute top-full right-0 z-50 rounded-large w-75 shadow-product-library-shadow-raised-1 border border-product-library-divider-primary bg-product-library-background-base-primary"
      }
    >
      <div className={"flex flex-col gap-1.5"}>
        <div className={"p-1.5 flex flex-col gap-1.5"}>
          <div className={"px-1.5 flex justify-between items-center"}>
            <p className={"text-sm font-medium"}>Layout</p>
            <div className={"w-6 h-6 flex justify-center items-center"}>
              <QuestionIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
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
                        onChange={() => onSelectLayout(layout.key as ViewMode)}
                      />
                      <span className="flex flex-col gap-xsmall items-center justify-center text-xs">
                        <layout.icon className={"text-product-library-actionable-quaternary-idle-tint"}/>
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
            <CustomSwitch
              onChange={(e) => handleToggleCompleted(e.target.checked)}
            />
          </div>
        </div>
        <hr className="border-t border-t-product-library-divider-tertiary overflow-hidden" />
        <div className={"px-1.5"}>
          <div className={"px-1.5 flex items-center justify-between"}>
            <p className={"text-sm font-medium"}>Sort</p>
            <button type={"button"} onClick={sortExpanded.handleExpanded} className={"flex justify-center items-center w-7 h-7"}>
              {sortExpanded.isExpanded ? <TaskSmallArrowDownIcon className={"text-product-library-actionable-quaternary-idle-tint"}/> : <TaskSmallArrowRightIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>}

            </button>
          </div>
          {sortExpanded.isExpanded && <>
            <GroupingTaskSection groupRef={groupRef} selectedGrouping={viewOptions?.grouped_by} displayLabel={selectedGroupingLabel} openDropdown={openDropdown} onToggleDropdown={() => handleToggleDropdown("grouping")} onSelectGroupingTask={handleSelectGrouping}/>

            <SortingTaskSection sortRef={sortRef} selectedSorting={viewOptions?.sorted_by} displayLabel={selectedSortingLabel} openDropdown={openDropdown} onToggleDropdown={() => handleToggleDropdown("sorting")} onSelectSortingTask={handleSelectSorting}/>

            {viewOptions?.sorted_by && (
                <DirectingTaskSection directRef={directionRef} selectedDirecting={viewOptions?.sort_order} displayLabel={selectedDirectionLabel} openDropdown={openDropdown} onToggleDropdown={() => handleToggleDropdown("direction")} onSelectDirectingTask={handleSelectDirection}/>
            )}
          </>}


          <div className={"px-1.5 flex items-center justify-between"}>
            <p className={"text-sm font-medium"}>Filter</p>
            <button type={"button"} onClick={filterExpanded.handleExpanded} className={"flex justify-center items-center w-7 h-7"}>
              {filterExpanded.isExpanded ?
                  <TaskSmallArrowDownIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
              : <TaskSmallArrowRightIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
              }
            </button>
          </div>

          {filterExpanded.isExpanded && <>
            <FilteringDateSection dateRef={dateRef} selectedDateQuery={selectedDateQuery} displayDate={displayDate} openDropdown={openDropdown} onToggleDropdown={() => handleToggleDropdown("date")} onSelectFilteringDate={handleSelectDate}/>

            <FilteringPrioritiesSection priorityRef={priorityRef} selectedPriorityKey={selectedPriorityKey} displayPriorities={displayPriorities} openDropdown={openDropdown} onToggleDropdown={() => handleToggleDropdown("priority")} onSelectFilteringPriorities={handleSelectPriority}/>

            <FilteringLabelsSection labelRef={labelRef} selectedLabelName={selectedLabelName} displayLabels={displayLabels} openDropdown={openDropdown} onToggleDropdown={() => handleToggleDropdown("label")} onSelectFilteringLabels={handleSelectLabel}/>
          </>}

        </div>
        {hasActiveFilters &&
            <>
              <hr className="border-t border-t-product-library-divider-tertiary overflow-hidden" />
              <ResettingFiltersButton onReset={handleResetFilters}/>
            </>
        }
      </div>
    </div>
  );
};

export default MyTaskLayoutFiltersDropdown;

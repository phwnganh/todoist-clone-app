import type {RefObject} from "react";
import type {OpenMyTaskFilterDropdown} from "@/types/menu-nav.type.ts";
import type {Label} from "@/types/label.type.ts";
import TaskSmallArrowDownIcon from "@/components/icons/TaskSmallArrowDownIcon.tsx";
import MyTaskFilterLabelDropdown from "../MyTaskFilterLabelDropdown";

type FilteringLabelsSectionProps = {
    labelRef: RefObject<HTMLDivElement | null>
    selectedLabelName: string[]
    displayLabels: string
    openDropdown: OpenMyTaskFilterDropdown;
    onToggleDropdown: () => void;
    onSelectFilteringLabels: (label?: Label) => void;
}
const FilteringLabelsSection = ({labelRef, selectedLabelName, displayLabels, openDropdown, onToggleDropdown, onSelectFilteringLabels}: FilteringLabelsSectionProps) => {
    return (
        <div className={"relative"} ref={labelRef}>
            <button
                className={
                    "py-0.5 px-1 flex items-center justify-between gap-small w-full"
                }
                onClick={onToggleDropdown}
            >
                <p className={"text-sm"}>Label</p>
                <div
                    className={
                        "cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"
                    }
                >
                    <p className={"text-sm"}>{displayLabels}</p>
                    <div className={"flex justify-center items-center w-7 h-7"}>
                        <TaskSmallArrowDownIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                    </div>
                </div>
            </button>
            {openDropdown === "label" && (
                <MyTaskFilterLabelDropdown
                    selectedFilteringLabel={selectedLabelName}
                    onSelectFilteringLabel={onSelectFilteringLabels}
                />
            )}
        </div>
    );
};

export default FilteringLabelsSection;
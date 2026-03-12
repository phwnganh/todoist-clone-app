import type { Label } from "@/types/label.type";
import LabelIcon from "@/components/icons/LabelIcon.tsx";
type FilterLabelItemProps = {
  label: Label;
  isLabelsSelected?: boolean;
  onFilteringLabelsSelected?: (label: Label) => void;
};
const FilteringLabelItem = ({
  label,
  isLabelsSelected,
  onFilteringLabelsSelected,
}: FilterLabelItemProps) => {
  return (
    <div
      className={
        "flex items-center gap-small py-1 px-1.5 max-h-70 hover:bg-product-library-selectable-secondary-hover-fill rounded-small overflow-y-auto scrollbar-thin scrollbar-custom"
      }
      role={"option"}
      tabIndex={-1}
    >
      <input
        type={"checkbox"}
        className={"w-4 h-4 accent-product-library-selectable-primary-selected-fill"}
        checked={isLabelsSelected}
        onChange={(e) => {
          e.stopPropagation();
          onFilteringLabelsSelected?.(label);
        }}
      />

      <div className={"flex items-center gap-1.5"}>
        <div className={"flex justify-center items-center shrink-0"}>
          <LabelIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
        </div>
        <div className={"text-sm"}>{label.name}</div>
      </div>
    </div>
  );
};

export default FilteringLabelItem;

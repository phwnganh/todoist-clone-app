import LabelIcon from "@/assets/label-icon.svg";
import type { Label } from "@/types/label.type";
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
        "flex items-center gap-small py-1 px-1.5 hover:bg-product-library-selectable-secondary-hover-fill rounded-small"
      }
      role={"option"}
      tabIndex={-1}
    >
      <input
        type={"checkbox"}
        className={"w-4 h-4"}
        checked={isLabelsSelected}
        onChange={(e) => {
          e.stopPropagation();
          onFilteringLabelsSelected?.(label);
        }}
      />

      <div className={"flex items-center gap-1.5"}>
        <div className={"flex justify-center items-center shrink-0"}>
          <img src={LabelIcon} alt={"label-icon"} />
        </div>
        <div className={"text-sm"}>{label.name}</div>
      </div>
    </div>
  );
};

export default FilteringLabelItem;

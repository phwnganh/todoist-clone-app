import type { Label } from "@/types/label.type.ts";
import LabelIcon from "@/components/icons/LabelIcon.tsx";
type LabelOptionsProps = {
  label: Label;
  isLabelsSelected: boolean;
  onLabelsSelected: (label: Label) => void;
};
const LabelOptions = ({
  label,
  isLabelsSelected,
  onLabelsSelected,
}: LabelOptionsProps) => {
  return (
    <div
      role={"option"}
      aria-selected={isLabelsSelected}
      tabIndex={-1}
      data-selected={isLabelsSelected}
      className={
        "group flex items-center gap-1.5 py-1 px-2 justify-between data-[selected=true]:bg-product-library-selectable-secondary-hover-fill hover:bg-product-library-selectable-secondary-hover-fill rounded-small"
      }
    >
      <div className={"flex items-center gap-1.5"}>
        <div className={"flex justify-center items-center"}>
            <LabelIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
        </div>
        <div className={"text-sm"}>{label.name}</div>
      </div>
      <input
        type={"checkbox"}
        className={"w-5 h-5 accent-product-library-selectable-primary-selected-fill"}
        checked={isLabelsSelected}
        onChange={(e) => {
          console.log("checked", e.target.checked);
          console.log("select label: ", label.name);
          e.stopPropagation();
          onLabelsSelected(label);
        }}
      />
    </div>
  );
};

export default LabelOptions;

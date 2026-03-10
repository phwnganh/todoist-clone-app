import type { Label } from "@/types/label.type.ts";
import LabelIcon from "@/assets/label-icon.svg";

type MyLabelListItemProps = {
  label: Label;
  onSelectLabel: (label: Label) => void;
};
const MyLabelListItem = ({ label, onSelectLabel }: MyLabelListItemProps) => {
  return (
    <div
      role={"option"}
      tabIndex={-1}
      onClick={(e) => {
        e.preventDefault();
        onSelectLabel(label);
      }}
      className={
        "px-2 py-1 flex items-center gap-1.5 hover:bg-product-library-selectable-secondary-hover-fill data-[selected=true]:bg-product-library-selectable-secondary-hover-fill"
      }
    >
      <div className={"w-6 h-6 flex justify-center items-center"}>
        <img src={LabelIcon} alt={"label-icon"} />
      </div>
      <p className={"text-sm"}>{label.name}</p>
    </div>
  );
};

export default MyLabelListItem;

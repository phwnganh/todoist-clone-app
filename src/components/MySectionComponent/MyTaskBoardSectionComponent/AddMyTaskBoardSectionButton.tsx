import AddSectionIcon from "@/components/icons/AddSectionIcon.tsx";
import { useSectionStore } from "@/stores/section.store";

const AddMyTaskBoardSectionButton = () => {
  const {onOpenAddFinalSectionForm} = useSectionStore()
  return (
    <button
      type={"button"}
      onClick={() => onOpenAddFinalSectionForm()}
      className={
        "flex items-center gap-3 rounded-large border border-product-library-background-raised-secondary py-2 px-4 w-70 bg-product-library-background-raised-secondary"
      }
    >
      <div className={"flex justify-center items-center shrink-0 w-6 h-6"}>
        <AddSectionIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
      </div>
      <span
        className={"text-product-library-display-secondary-idle-tint text-sm"}
      >
        Add section
      </span>
    </button>
  );
};

export default AddMyTaskBoardSectionButton;

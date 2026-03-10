import AddSectionIcon from "@/assets/add-section-icon.svg";

type AddMyTaskBoardSectionButtonProps = {
  onOpenAddNewTaskSectionForm: () => void;
};
const AddMyTaskBoardSectionFinalButton = ({
  onOpenAddNewTaskSectionForm,
}: AddMyTaskBoardSectionButtonProps) => {
  return (
    <button
      type={"button"}
      onClick={onOpenAddNewTaskSectionForm}
      className={
        "flex items-center gap-3 rounded-large border border-product-library-background-raised-secondary py-2 px-4 w-70 bg-product-library-background-raised-secondary"
      }
    >
      <div className={"flex justify-center items-center shrink-0 w-6 h-6"}>
        <img src={AddSectionIcon} alt="add-section-icon" />
      </div>
      <span
        className={"text-product-library-display-secondary-idle-tint text-sm"}
      >
        Add section
      </span>
    </button>
  );
};

export default AddMyTaskBoardSectionFinalButton;

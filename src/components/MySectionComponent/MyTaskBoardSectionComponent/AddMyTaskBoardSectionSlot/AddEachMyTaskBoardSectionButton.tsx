type MyTaskBoardSectionFooterProps = {
  onAddMyTaskSectionForm: () => void;
};
const AddEachMyTaskBoardSectionButton = ({
  onAddMyTaskSectionForm,
}: MyTaskBoardSectionFooterProps) => {
  return (
    <div className={"group/button"}>
      <button
        onClick={onAddMyTaskSectionForm}
        type={"button"}
        className={
          "flex flex-col items-center gap-2.5 text-sm font-bold text-product-library-display-accent-primary-tint pointer-events-none opacity-0 group-hover/button:pointer-events-auto group-hover/button:opacity-100"
        }
      >
        <div
          className={
            "h-87.5 w-px bg-product-library-actionable-destructive-idle-tint"
          }
        ></div>
        <p>Add section</p>
        <div
          className={
            "h-87.5 w-px bg-product-library-actionable-destructive-idle-tint"
          }
        ></div>
      </button>
    </div>
  );
};

export default AddEachMyTaskBoardSectionButton;

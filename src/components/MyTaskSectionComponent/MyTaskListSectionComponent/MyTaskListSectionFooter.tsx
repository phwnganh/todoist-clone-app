type MyTaskSectionFooterProps = {
  onAddMyTaskSectionForm: () => void;
};
const MyTaskListSectionFooter = ({
  onAddMyTaskSectionForm,
}: MyTaskSectionFooterProps) => {
  return (
    <div className={"group/button"}>
      <button
        onClick={onAddMyTaskSectionForm}
        type={"button"}
        className={
          "flex items-center gap-2.5 pt-4.5 w-full text-sm font-bold text-product-library-display-accent-primary-tint pointer-events-none opacity-0 group-hover/button:pointer-events-auto group-hover/button:opacity-100"
        }
      >
        <div
          className={
            "h-px bg-product-library-actionable-destructive-idle-tint flex-1"
          }
        ></div>
        <p className={"whitespace-nowrap shrink-0"}>Add section</p>
        <div
          className={
            "h-px bg-product-library-actionable-destructive-idle-tint flex-1"
          }
        ></div>
      </button>
    </div>
  );
};

export default MyTaskListSectionFooter;

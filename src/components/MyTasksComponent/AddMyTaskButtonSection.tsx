import SmallPlusAddIcon from "@/components/icons/SmallPlusAddIcon.tsx";

type AddMyTaskSectionProps = {
  onOpenAddMyTask: () => void;
  taskType?: string;
};
const AddMyTaskButtonSection = ({
  onOpenAddMyTask,
  taskType,
}: AddMyTaskSectionProps) => {
  return (
    <button
      type={"button"}
      className={"px-2 mt-2 flex items-center w-full group"}
      onClick={onOpenAddMyTask}
    >
      <div
        className={
          "w-4 h-4 flex justify-center items-center rounded-full text-product-library-display-accent-primary-tint mr-3 group-hover:bg-product-library-display-accent-primary-fill group-hover:text-product-library-background-base-primary"
        }
      >
        <SmallPlusAddIcon />
      </div>
      <p
        className={
          "text-sm text-gray-500 group-hover:text-product-library-display-accent-primary-tint"
        }
      >
        Add {taskType}
      </p>
    </button>
  );
};

export default AddMyTaskButtonSection;

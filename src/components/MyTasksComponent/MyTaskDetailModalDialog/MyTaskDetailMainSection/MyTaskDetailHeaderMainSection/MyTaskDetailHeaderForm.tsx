import DescriptionIcon from "../../../../../assets/description-icon.svg";

const MyTaskDetailHeaderForm = ({
  onCancelForm,
}: {
  onCancelForm: () => void;
}) => {
  return (
    <form className={"w-full"}>
      <div
        className={
          "outline-product-library-border-hover-tint rounded-large outline flex flex-col pt-1 px-1.75"
        }
      >
        <input
          type={"text"}
          className={"outline-none font-medium text-header"}
          placeholder={"Content"}
        />
        <div className={"flex mt-small mb-xsmall ml-px"}>
          <div className={"flex justify-center items-center"}>
            <img src={DescriptionIcon} alt={"description-icon"} />
          </div>
          <input
            type={"text"}
            className={
              "outline-none text-sm text-product-library-display-secondary-idle-tint"
            }
            placeholder={"Description"}
          />
        </div>
      </div>
      <div className={"flex justify-end mt-small pb-4 gap-2.5"}>
        <button
          type="button"
          className="px-3 py-1.5 rounded-small bg-product-library-actionable-secondary-idle-fill flex justify-center items-center min-w-17"
          onClick={onCancelForm}
        >
          <span className="text-sm font-medium text-product-library-actionable-secondary-on-idle-tint">
            Cancel
          </span>
        </button>
        <button
          type="submit"
          className={`px-3 py-1.5 rounded-small  flex justify-center items-center min-w-17 bg-product-library-actionable-primary-idle-fill hover:bg-product-library-actionable-primary-hover-fill`}
        >
          <span className="text-sm font-medium text-product-library-actionable-primary-on-idle-tint">
            Save
          </span>
        </button>
      </div>
    </form>
  );
};

export default MyTaskDetailHeaderForm;

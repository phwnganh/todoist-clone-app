import LabelIcon from "@/components/icons/LabelIcon.tsx";

type MyTaskBoardLabelsPreviewProps = {
  labels?: string[];
};
const MyTaskBoardLabelsPreview = ({
  labels = [],
}: MyTaskBoardLabelsPreviewProps) => {
  if (labels?.length === 0) return null;

  const firstLabel = labels[0];
  const extraLabelLength = labels?.length - 1;
  return (
    <>
      <div
        className={
          "flex gap-0.5 text-xs text-product-library-display-secondary-idle-tint"
        }
      >
        <div className={"w-4 h-4 flex justify-center items-center"}>
          <LabelIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
        </div>
        <span>{firstLabel}</span>
      </div>
      {extraLabelLength > 0 && (
        <span
          className={"text-xs text-product-library-display-secondary-idle-tint"}
        >
          +{extraLabelLength}
        </span>
      )}
    </>
  );
};

export default MyTaskBoardLabelsPreview;

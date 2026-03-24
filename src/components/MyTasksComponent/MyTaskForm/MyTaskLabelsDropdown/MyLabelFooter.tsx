import {useCreateLabels} from "@/hooks/useQueryHook/useLabels.ts";
import PlusIcon from "@/components/icons/PlusIcon.tsx";

type MyLabelFooterProps = {
  hasKeyword: boolean;
  keyword: string;
  showNotFound: boolean;
  onCloseDropdown: () => void;
};
const MyLabelFooter = ({
  hasKeyword,
  keyword,
  showNotFound, onCloseDropdown
}: MyLabelFooterProps) => {
  const {mutate} = useCreateLabels()

  const handleCreateLabel = () => {
    mutate({
      name: keyword
    })
    onCloseDropdown()
  }
  if (!hasKeyword) return null;
  return (
    <>
      {showNotFound && (
          <>
            <p className="text-sm text-product-library-display-secondary-idle-tint px-2.5 py-1">
              Label not found
            </p>
            <button type={"button"} className={"flex items-center gap-1.5 py-1 px-2 w-full hover:bg-product-library-selectable-secondary-hover-fill rounded-small"} onClick={handleCreateLabel}>
              <div className={"flex items-center justify-center"}>
                <PlusIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
              </div>
              <span className={"font-medium text-sm"}>Create "{keyword}"</span>
            </button>
          </>

      )}

    </>
  );
};

export default MyLabelFooter;

import {useAddProject} from "@/hooks/useQueryHook/useProjects.ts";
import {type MouseEvent} from "react";

type DropdownFooterProps = {
  hasKeyword: boolean;
  keyword: string;
  showNotFound: boolean;
  onCloseDropdown: () => void;
};
const DropdownFooter = ({
  hasKeyword,
  keyword,
  showNotFound,
    onCloseDropdown,
}: DropdownFooterProps) => {
  const {mutate} = useAddProject()

  const handleAddProject = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    mutate({
      name: keyword
    })
    onCloseDropdown()
  }
  if (!hasKeyword) return null;

  return (
    <>
      {showNotFound && (
        <p className="text-sm text-product-library-display-secondary-idle-tint px-2.5">
          Project not found
        </p>
      )}
      <button onClick={(e) => handleAddProject(e)} className="text-center text-product-library-actionable-tertiary-idle-tint font-medium text-sm py-1 px-1.5 hover:bg-product-library-selectable-secondary-hover-fill rounded-small">
        Create "{keyword}"
      </button>
    </>
  );
};

export default DropdownFooter;

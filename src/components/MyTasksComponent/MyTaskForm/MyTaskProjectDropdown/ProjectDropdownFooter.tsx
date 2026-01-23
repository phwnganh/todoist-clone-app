import PlusIcon from "../../../../assets/plus-icon.svg";
type ProjectDropdownFooterProps = {
  hasKeyword: boolean;
  keyword: string;
  showNotFound: boolean;
};
const ProjectDropdownFooter = ({
  hasKeyword,
  keyword,
  showNotFound,
}: ProjectDropdownFooterProps) => {
  if (!hasKeyword) return null;
  return (
    <>
      {showNotFound && (
        <p className="text-sm text-product-library-display-secondary-idle-tint px-2.5 py-1">
          Project not found
        </p>
      )}
      <button className={"flex items-center gap-1.5 py-1 px-2"}>
        <div className={"flex items-center justify-center"}>
          <img src={PlusIcon} alt="plus-icon" />
        </div>
        <span className={"font-medium text-sm"}>Create "{keyword}"</span>
      </button>
    </>
  );
};

export default ProjectDropdownFooter;

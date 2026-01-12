import type { Project } from "../../../../types/project.type.ts";
import VerifiedIcon from "../../../icons/VerifiedIcon.tsx";
import HashtagIcon from "../../../icons/HashtagIcon.tsx";

type ParentProjectOptionsProps = {
  project: Project;
  isParentProjectsSelected: boolean;
  onParentProjectsSelected: (parentProject: string) => void;
};
const ParentProjectOptions = ({
  project,
  isParentProjectsSelected,
  onParentProjectsSelected,
}: ParentProjectOptionsProps) => {
  return (
    <div
      role="option"
      aria-selected={isParentProjectsSelected}
      tabIndex={-1}
      data-selected={isParentProjectsSelected}
      key={project.id}
      onClick={() => onParentProjectsSelected(project.name)}
      className="group flex items-center gap-1.5 py-1 px-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"
    >
      <div className="flex justify-center items-center invisible group-data-[selected=true]:visible">
        <VerifiedIcon />
      </div>
      <span className="flex items-center gap-1.5">
        <div className="flex justify-center items-center">
          <HashtagIcon />
        </div>
        <div className="text-sm ">{project.name}</div>
      </span>
    </div>
  );
};

export default ParentProjectOptions;

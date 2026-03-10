import type { Project } from "@/types/project.type.ts";
import VerifiedIcon from "@/assets/verified-icon.svg";
import HashtagIcon from "@/components/icons/HashtagIcon.tsx";
import {getProjectColorClass} from "@/helpers/getProjectColorClass.ts";

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
      onMouseDown={(e) => {
        e.preventDefault();
        onParentProjectsSelected(project.name);
      }}
      className="group flex items-center gap-1.5 py-1 px-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"
    >
      <div className="flex justify-center items-center invisible group-data-[selected=true]:visible">
        <img src={VerifiedIcon} alt={"verified-icon"} />
      </div>
      <span className="flex items-center gap-1.5">
        <div className="flex justify-center items-center">
          <HashtagIcon className={getProjectColorClass(project.color)}/>
        </div>
        <div className="text-sm ">{project.name}</div>
      </span>
    </div>
  );
};

export default ParentProjectOptions;

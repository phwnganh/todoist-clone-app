import HashtagIcon from "@/components/icons/HashtagIcon.tsx";
import IndicatorDots from "@/components/ui/IndicatorDots.tsx";
import { useRef } from "react";
import MyProjectsToolbarDropdown from "./MyProjectsToolbarDropdown.tsx";
import type { Project } from "@/types/project.type.ts";
import { useClickOutside } from "@/hooks/useClickOutside.ts";
import { getProjectColorClass } from "@/helpers/getProjectColorClass.ts";
import {useProjectStore} from "@/stores/project.store.ts";
import {useNavigate} from "react-router-dom";
import {PROJECT_DETAILS} from "@/constants/routes.constants.ts";

type MyProjectsItemProps = {
  project: Project;
};
const MyProjectsItem = ({
  project,
}: MyProjectsItemProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const {openProjectDetailToolbar, onOpenProjectDetailToolbar, onCloseProjectDetailToolbar} = useProjectStore()
  const isOpenProjectDetailToolbar = openProjectDetailToolbar === project.id
  useClickOutside({
    ref: dropdownRef,
    handler: () => {
      onCloseProjectDetailToolbar();
    },
    enabled: isOpenProjectDetailToolbar,
  });
  return (
    <>
      <div role={"button"} onClick={() => navigate(`${PROJECT_DETAILS}/${project.id}`)} className="flex items-center cursor-pointer">
        <div className={`mr-small flex justify-center items-center`}>
          <HashtagIcon className={`${getProjectColorClass(project.color)}`} />
        </div>
        <div className="text-sm font-regular whitespace-nowrap">
          {project.name}
        </div>
      </div>
      <div
        className="flex items-center relative w-6 h-6"
        ref={dropdownRef}
      >
          <div
            role="button"
            onClick={() => onOpenProjectDetailToolbar(project.id)}
            className={`flex justify-center items-center gap-1 `}
          >
            <IndicatorDots />
          </div>
        {isOpenProjectDetailToolbar && (
            <MyProjectsToolbarDropdown project={project}
            />
        )}
      </div>
    </>
  );
};

export default MyProjectsItem;

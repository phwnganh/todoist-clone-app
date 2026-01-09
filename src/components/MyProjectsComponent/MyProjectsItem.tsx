import HashtagIcon from "../icons/HashtagIcon.tsx";
import IndicatorDots from "../ui/IndicatorDots.tsx";
import { useState } from "react";
import MyProjectsToolbarDropdown from "./MyProjectsToolbarDropdown.tsx";
import type {Project} from "../../types/project.type.ts";

type MyProjectsItemProps = {
    project: Project;
    isLoading: boolean;
    isError: boolean;
}
const MyProjectsItem = ({project, isLoading, isError}: MyProjectsItemProps) => {
  const [isOpenMyProjectsToolbars, setIsOpenMyProjectsToolbars] =
    useState(false);

  const handleToggleMyProjectsToolbars = () => {
    setIsOpenMyProjectsToolbars((prev) => !prev);
  };
  return (
    <>
      <div className="flex items-center">
        <div className="mr-small flex justify-center items-center">
          <HashtagIcon />
        </div>
        <div className="text-sm font-regular whitespace-nowrap">
            {project.name}
        </div>
      </div>
      <div
        role="button"
        onClick={handleToggleMyProjectsToolbars}
        className="group-hover:flex items-center hidden gap-1 relative"
      >
        <IndicatorDots />
        {isOpenMyProjectsToolbars && (
          <div className="absolute right-9">
            <MyProjectsToolbarDropdown />
          </div>
        )}
      </div>
    </>
  );
};

export default MyProjectsItem;

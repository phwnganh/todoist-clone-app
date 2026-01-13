import HashtagIcon from "../icons/HashtagIcon.tsx";
import IndicatorDots from "../ui/IndicatorDots.tsx";
import {useRef, useState} from "react";
import MyProjectsToolbarDropdown from "./MyProjectsToolbarDropdown.tsx";
import type {Project} from "../../types/project.type.ts";
import {useClickOutside} from "../../hooks/useClickOutside.ts";

type MyProjectsItemProps = {
    project: Project;
    isOpenProjectDetailToolbar: boolean;
    onCloseProjectDetailToolbar: () => void;
    onOpenProjectDetailToolbar: () => void;
    onEditProjectDetail: () => void;
}
const MyProjectsItem = ({project, isOpenProjectDetailToolbar, onCloseProjectDetailToolbar, onOpenProjectDetailToolbar, onEditProjectDetail}: MyProjectsItemProps) => {
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [isHovered, setIsHovered] = useState(false)
    useClickOutside({
        ref: dropdownRef,
        handler: () => {
            onCloseProjectDetailToolbar()
            setIsHovered(false)
        },
        enabled: isOpenProjectDetailToolbar,
    })

    const handleOpenProjectDetailToolbar = () => {
        onCloseProjectDetailToolbar();
        onEditProjectDetail()
    }
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
        <div className="flex items-center relative w-6 h-6" ref={dropdownRef}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => {
                         if(!isOpenProjectDetailToolbar) {
                             setIsHovered(false)
                         }
                     }}>
            {(isHovered || isOpenProjectDetailToolbar) && (
                <div
                    role="button"
                    onClick={onOpenProjectDetailToolbar}
                    className={"flex justify-center items-center gap-1"}
                >
                    <IndicatorDots />
                </div>
            )}
            {isOpenProjectDetailToolbar && (
                <div className="absolute right-9">
                    <MyProjectsToolbarDropdown handleOpenEditProjectModalDialog={handleOpenProjectDetailToolbar}/>
                </div>
            )}
        </div>


    </>
  );
};

export default MyProjectsItem;

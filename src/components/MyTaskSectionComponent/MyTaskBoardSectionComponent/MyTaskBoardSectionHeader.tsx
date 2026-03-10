import type { Task } from "@/types/task.type.ts";
import MenuIcon from "@/components/icons/MenuIcon.tsx";
import {useRef} from "react";
import {useSectionStore} from "@/stores/section.store.ts";
import type {Section} from "@/types/section.type.ts";
import MySectionsToolbarDropdown from "../MySectionsToolbarDropdown.tsx";
import DeleteMyTaskSectionModalDialog from "../DeleteMyTaskSectionComponent";
import {useClickOutside} from "@/hooks/useClickOutside.ts";

type MyTaskBoardSectionHeaderProps = {
  section?: Section;
  tasks: Task[] | undefined | null;
  onOpenEditMyTaskSection: () => void;
};
const MyTaskBoardSectionHeader = ({
  section,
  tasks,
  onOpenEditMyTaskSection,
}: MyTaskBoardSectionHeaderProps) => {
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const {openSectionToolbarDropdown, onOpenSectionToolbarDropdown, onCloseSectionToolbarDropdown, deleteSectionId} = useSectionStore()
    const isOpenToolbar = openSectionToolbarDropdown === section?.id;
    const isDeleteSection = deleteSectionId === section?.id;

    useClickOutside({
        ref: toolbarRef,
        handler: onCloseSectionToolbarDropdown,
        enabled: isOpenToolbar,
    })
  return (
    <div className={"flex justify-between items-center w-full"}>
      <div className={"flex items-center"}>
        <div
          role={"button"}
          onClick={onOpenEditMyTaskSection}
          className={"font-bold text-sm pt-1.5 pr-1.5 pb-1.25 line-clamp-1"}
        >
          {section?.name}
        </div>
        <span
          className={"text-sm text-product-library-display-secondary-idle-tint"}
        >
          {tasks?.length}
        </span>
      </div>
        <div className={"relative"} ref={toolbarRef}>
            <button type={"button"} onClick={() => onOpenSectionToolbarDropdown((section?.id))} className={"flex justify-center items-center"}>
                <MenuIcon />
            </button>
            {isOpenToolbar && (
                <MySectionsToolbarDropdown sectionId={section.id}/>
            )}
        </div>
        {isDeleteSection && (
            <DeleteMyTaskSectionModalDialog section={section}/>
        )}
    </div>
  );
};

export default MyTaskBoardSectionHeader;

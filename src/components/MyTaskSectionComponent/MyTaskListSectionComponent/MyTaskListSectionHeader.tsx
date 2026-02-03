import TaskSmallArrowDownIcon from "../../icons/TaskSmallArrowDownIcon.tsx";
import TaskSmallArrowRightIcon from "../../icons/TaskSmallArrowRightIcon.tsx";
import MenuIcon from "../../icons/MenuIcon.tsx";
import type { Task } from "../../../types/task.type.ts";
import {useSectionStore} from "../../../stores/section.store";
import {type Section} from "../../../types/section.type";
import MySectionsToolbarDropdown from "../MySectionsToolbarDropdown";

type MyTaskSectionHeaderProps = {
  isExpanded: boolean;
  onExpanded: () => void;
  section: Section;
  tasks: Task[] | undefined | null;
  onOpenEditMyTaskSection: () => void;
};

const MyTaskListSectionHeader = ({
  isExpanded,
  onExpanded,
  section,
  tasks,
  onOpenEditMyTaskSection,
}: MyTaskSectionHeaderProps) => {
  const {onOpenSectionToolbarDropdown, openSectionToolbarDropdown} = useSectionStore()
  const isOpenToolbar = openSectionToolbarDropdown === section.id
  return (
    <div className={"flex justify-between items-start px-4"}>
      <div role={"button"} className={"flex items-start"}>
        <button
          type={"button"}
          className={
            "absolute pr-0.75 top-1.5 -left-4 flex justify-center items-center rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
          }
          onClick={onExpanded}
        >
          {isExpanded ? (
            <TaskSmallArrowDownIcon />
          ) : (
            <TaskSmallArrowRightIcon />
          )}
        </button>
        <div className={"flex items-center"}>
          <div
            role={"button"}
            onClick={onOpenEditMyTaskSection}
            className={"font-bold text-sm pt-1.5 pr-1.5 pb-1.25"}
          >
            {section.name}
          </div>
          <span
            className={
              "text-sm text-product-library-display-secondary-idle-tint"
            }
          >
            {tasks?.length}
          </span>
        </div>
      </div>
      <div className={"relative"} onClick={() => onOpenSectionToolbarDropdown(section.id)}>
        <button type={"button"}  className={"flex justify-center items-center"}>
          <MenuIcon />
        </button>
        {isOpenToolbar && (<MySectionsToolbarDropdown/>)}
      </div>

    </div>
  );
};

export default MyTaskListSectionHeader;

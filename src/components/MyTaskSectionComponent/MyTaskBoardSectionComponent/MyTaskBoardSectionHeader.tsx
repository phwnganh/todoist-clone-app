import type { Task } from "../../../types/task.type.ts";
import MenuIcon from "../../icons/MenuIcon.tsx";

type MyTaskBoardSectionHeaderProps = {
  name: string;
  tasks: Task[] | undefined | null;
  onOpenEditMyTaskSection: () => void;
};
const MyTaskBoardSectionHeader = ({
  name,
  tasks,
  onOpenEditMyTaskSection,
}: MyTaskBoardSectionHeaderProps) => {
  return (
    <div className={"flex justify-between items-center"}>
      <div className={"flex items-center"}>
        <div
          role={"button"}
          onClick={onOpenEditMyTaskSection}
          className={"font-bold text-sm pt-1.5 pr-1.5 pb-1.25 line-clamp-1"}
        >
          {name}
        </div>
        <span
          className={"text-sm text-product-library-display-secondary-idle-tint"}
        >
          {tasks?.length}
        </span>
      </div>
      <button type={"button"} className={"flex justify-center items-center"}>
        <MenuIcon />
      </button>
    </div>
  );
};

export default MyTaskBoardSectionHeader;

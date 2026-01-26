import VerifiedIcon from "../../../../icons/VerifiedIcon.tsx";
import ChildrenIcon from "../../../../../assets/children-icon.svg";
import type { Task } from "../../../../../types/task.type.ts";
type ChildrenTaskItemProps = {
  hasSubChildren: boolean;
  childrenTask: Task;
  subChildren: Task[];
};
const ChildrenTaskItem = ({
  hasSubChildren,
  childrenTask,
  subChildren,
}: ChildrenTaskItemProps) => {
  return (
    <div className={"flex items-start gap-1.5"}>
      <div
        className={"w-6 h-6 flex justify-center items-center shrink-0"}
      ></div>
      <button
        type={"button"}
        aria-checked={"false"}
        aria-label={"Mark task as complete"}
        className={"mr-1.5 -ml-0.75 relative group/check"}
      >
        <div
          className={
            "h-5 w-5 rounded-full border-2 border-product-library-priorities-p4-primary-idle-fill"
          }
        ></div>
        <div
          className={
            "inset-0 absolute group-hover/check:flex justify-center items-center hidden"
          }
        >
          <VerifiedIcon
            className={"text-product-library-actionable-quaternary-idle-tint"}
          />
        </div>
      </button>
      <div className={"flex flex-col gap-1.5"}>
        <p className={"text-sm"}>{childrenTask.content}</p>
        <p
          className={
            "text-xs text-product-library-display-secondary-idle-tint line-clamp-1"
          }
        >
          {childrenTask.description}
        </p>
        {hasSubChildren && (
          <div
            className={
              "flex gap-0.5 text-xs text-product-library-display-secondary-idle-tint"
            }
          >
            <img src={ChildrenIcon} alt={"children-icon"} />
            <span>0/{subChildren?.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildrenTaskItem;

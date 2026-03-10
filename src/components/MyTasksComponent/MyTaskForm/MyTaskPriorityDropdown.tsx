import { priorityFilterData } from "@/data/myTaskFilter.data.ts";
import PriorityIcon from "@/components/icons/PriorityIcon.tsx";
import VerifiedIcon from "@/components/icons/VerifiedIcon.tsx";
import type {Priority} from "@/types/task.type.ts";

type MyTaskPriorityDropdownProps = {
    selectedPriority: Priority | null;
    onSelect: (priority: Priority) => void;
}
const MyTaskPriorityDropdown = ({selectedPriority, onSelect}: MyTaskPriorityDropdownProps) => {
  return (
    <div
      id={"priority-listbox"}
      aria-labelledby={"priority-trigger"}
      role={"listbox"}
      className={
        "absolute top-full z-1000 border border-product-library-border-idle-tint rounded-small w-max bg-white"
      }
    >
      {priorityFilterData.map((priority) => {
          const isSelected = selectedPriority === priority;
        return (
          <div
            key={priority.key}
            role={"option"}
            tabIndex={-1}
            data-selected={isSelected}
            className={
              "group flex flex-col py-1 px-1.5 flex-1 w-full hover:bg-product-library-selectable-secondary-hover-fill data-[selected=true]:bg-product-library-selectable-secondary-hover-fill rounded-small cursor-pointer"
            }
            onMouseDown={e => {
                e.preventDefault()
                onSelect(priority);
            }}
          >
            <div className={"flex items-center gap-1.5"}>
              <div className="w-6 h-6 flex justify-center items-center shrink-0">
                <PriorityIcon className={`text-${priority.color}`} />
              </div>
              <div className={"flex items-center gap-1.5"}>
                <div className="text-sm mx-2.5">{priority.label}</div>
                <div className={"flex justify-center items-center invisible group-data-[selected=true]:visible"}>
                  <VerifiedIcon
                    className={
                      "text-product-library-actionable-destructive-idle-tint"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyTaskPriorityDropdown;

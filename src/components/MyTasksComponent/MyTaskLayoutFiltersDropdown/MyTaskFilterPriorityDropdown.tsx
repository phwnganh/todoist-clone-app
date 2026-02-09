import { priorityFilterData } from "../../../data/myTaskFilter.data.ts";
import SquareIcon from "../../../assets/square-icon.svg";
import PriorityIcon from "../../icons/PriorityIcon.tsx";
const MyTaskFilterPriorityDropdown = () => {
  return (
    <div
      id={"priority-listbox"}
      aria-labelledby={"priority-trigger"}
      role={"listbox"}
      className={
        "absolute top-full right-0 z-50 border border-product-library-divider-primary rounded-large shadow-sm max-h-70 max-w-40 w-full bg-white p-1.5 cursor-pointer"
      }
    >
      {priorityFilterData.map((priority) => {
        return (
          <div
            key={priority.key}
            role={"option"}
            tabIndex={-1}
            className={
              "group flex flex-col py-1 px-1.5 flex-1 w-full hover:bg-product-library-selectable-secondary-hover-fill rounded-small"
            }
          >
            <div className="flex items-center gap-small">
              <div className="flex justify-center items-center">
                <img src={SquareIcon} alt={"square-icon"} />
              </div>
              <span className="flex items-center gap-1.5">
                <div className="w-6 h-6 flex justify-center items-center shrink-0">
                  <PriorityIcon className={`text-${priority.color}`} />
                </div>
                <div className="flex gap-1.5 overflow-hidden">
                  <div className="text-sm">{priority.label}</div>
                </div>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyTaskFilterPriorityDropdown;

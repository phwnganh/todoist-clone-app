import { groupingFilterData } from "../../../data/myTaskFilter.data.ts";
import VerifiedIcon from "../../../assets/verified-icon.svg";
import { type GroupedBy } from "../../../types/viewOptions.type.ts";

type MyTaskFilterGroupingDropdownProps = {
  selectedGrouping?: GroupedBy | null;
  onSelectGrouping: (group?: GroupedBy | null) => void;
};
const MyTaskFilterGroupingDropdown = ({
  selectedGrouping,
  onSelectGrouping,
}: MyTaskFilterGroupingDropdownProps) => {
  return (
    <div
      id={"grouping-listbox"}
      aria-labelledby={"grouping-trigger"}
      role={"listbox"}
      className={
        "absolute top-full right-0 z-50 border border-product-library-divider-primary rounded-large shadow-sm max-h-70 max-w-40 w-full bg-white p-1.5 cursor-pointer"
      }
    >
      {groupingFilterData.map((grouping, index) => {
        const isSelected = grouping.key === selectedGrouping;
        return (
          <div
            key={index}
            role={"option"}
            tabIndex={-1}
            onClick={() => onSelectGrouping(grouping?.key)}
            className={`group flex flex-col py-1 px-1.5 flex-1 w-full hover:bg-product-library-selectable-secondary-hover-fill rounded-small`}
          >
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-small">
                {isSelected ? (
                  <div className="w-4 h-4 flex justify-center items-center shrink-0">
                    <img src={VerifiedIcon} alt={"verified-icon"} />
                  </div>
                ) : (
                  <div
                    className={
                      "w-4 h-4 flex justify-center items-center shrink-0"
                    }
                  ></div>
                )}
                <div className="flex gap-1.5 overflow-hidden">
                  <div className="text-sm">{grouping.label}</div>
                </div>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyTaskFilterGroupingDropdown;

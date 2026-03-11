import { sortingFilterData } from "@/data/myTaskFilter.data.ts";
import type { SortedBy, SortOrder } from "@/types/viewOptions.type.ts";
import VerifiedIcon from "@/components/icons/VerifiedIcon.tsx";

type MyTaskFilterSortingDropdownProps = {
  selectedSorting?: SortedBy | null;
  onSelectSorting: (
    selectedSorting?: SortedBy | null,
    sortOrder?: SortOrder,
  ) => void;
};
const MyTaskFilterSortingDropdown = ({
  selectedSorting,
  onSelectSorting,
}: MyTaskFilterSortingDropdownProps) => {
  return (
    <div
      id={"sorting-listbox"}
      aria-labelledby={"sorting-trigger"}
      role={"listbox"}
      className={
        "absolute top-full right-0 z-50 border border-product-library-divider-primary rounded-large shadow-sm max-h-70 max-w-40 w-full bg-product-library-background-base-primary p-1.5 cursor-pointer"
      }
    >
      {sortingFilterData.map((sorting, index) => {
        const isSelected = sorting.key === selectedSorting;
        return (
          <div
            key={index}
            role={"option"}
            tabIndex={-1}
            onClick={() => onSelectSorting(sorting.key, "ASC")}
            className={
              "group flex flex-col py-1 px-1.5 flex-1 w-full hover:bg-product-library-selectable-secondary-hover-fill rounded-small"
            }
          >
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-small">
                {isSelected ? (
                  <div className="w-4 h-4 flex justify-center items-center shrink-0">
                    <VerifiedIcon className={"text-product-library-display-primary-idle-tint"}/>
                  </div>
                ) : (
                  <div className="w-4 h-4 flex justify-center items-center shrink-0"></div>
                )}
                <div className="flex gap-1.5 overflow-hidden">
                  <div className="text-sm">{sorting.label}</div>
                </div>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyTaskFilterSortingDropdown;

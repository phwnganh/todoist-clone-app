import {
  useGetAllLabels,
  useSearchLabels,
} from "@/hooks/useQueryHook/useLabels.ts";
import SearchingLabelInput from "./SearchingLabelInput.tsx";
import FilteringLabelItem from "./FilteringLabelItem.tsx";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce.ts";
import type { Label } from "@/types/label.type.ts";

type MyTaskFilterLabelDropdownProps = {
  selectedFilteringLabel?: string[];
  onSelectFilteringLabel?: (label: Label) => void;
};
const MyTaskFilterLabelDropdown = ({
  selectedFilteringLabel,
  onSelectFilteringLabel,
}: MyTaskFilterLabelDropdownProps) => {
  const [typedFilteredLabels, setTypedFilteredLabels] = useState<string>("");
  const keyword = typedFilteredLabels.trim().toLowerCase();
  const debouncedSearchFilteringLabels = useDebounce(keyword, 500);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const trimmedFilteringLabelValue = typedFilteredLabels.trim();
  const hasKeyword = trimmedFilteringLabelValue.length > 0;
  const { data: filteredLabels } = useSearchLabels(
    debouncedSearchFilteringLabels,
  );
  const { data: labels } = useGetAllLabels();
  const labelList =
    debouncedSearchFilteringLabels.length > 0
      ? (filteredLabels?.results ?? [])
      : labels?.results;
  const isNoLabelsFound = hasKeyword && labelList?.length === 0;

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);
  return (
    <div
      id={"filtering-label-listbox"}
      aria-labelledby={"filtering-label-trigger"}
      role={"listbox"}
      className={
        "absolute top-full right-0 z-50 border border-product-library-divider-primary rounded-large shadow-sm max-w-214.75 w-full bg-product-library-background-base-primary p-1.5 cursor-pointer"
      }
    >
      <div className={"flex flex-col py-1 px-1.5 w-full"}>
        <SearchingLabelInput
          labelValue={typedFilteredLabels}
          onLabelsSearched={setTypedFilteredLabels}
          inputRef={searchInputRef}
        />
        <hr
          className={"border-t border-t-product-library-divider-tertiary p-1.5"}
        />
        {isNoLabelsFound ? (
          <p className="text-sm text-product-library-display-secondary-idle-tint px-2.5 py-1">
            Label not found
          </p>
        ) : (
          labelList?.map((label) => {
            const isSelected = selectedFilteringLabel?.includes(label.name);
            return (
              <FilteringLabelItem
                key={label.id}
                label={label}
                isLabelsSelected={isSelected}
                onFilteringLabelsSelected={onSelectFilteringLabel}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyTaskFilterLabelDropdown;

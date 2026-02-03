import {useEffect, useRef, useState} from "react";
import {useDebounce} from "../../../../hooks/useDebounce.ts";
import {useSearchLabels} from "../../../../hooks/useQueryHook/useLabels.ts";
import LabelsSearchInput from "./LabelsSearchInput.tsx";
import LabelOptions from "./LabelOptions.tsx";
import type {Label} from "../../../../types/label.type.ts";

type MyTaskAvailableLabelsDropdownProps = {
    selectedLabel: Label[];
    onLabelSelected: (label: Label) => void;
}
const MyTaskAvailableLabelsDropdown = ({selectedLabel, onLabelSelected}: MyTaskAvailableLabelsDropdownProps) => {
    const [typedLabels, setTypedLabels] = useState<string>("")
    const keyword = typedLabels.trim().toLowerCase()
    const debouncedSearchKeyword = useDebounce(keyword, 500)

    const trimmedLabelsValue = typedLabels.trim();
    const hasKeyword = trimmedLabelsValue.length > 0;
    const searchInputRef = useRef<HTMLInputElement>(null);

    const {data: filteredLabels} = useSearchLabels(trimmedLabelsValue)

    useEffect(() => {
        searchInputRef.current?.focus()
    }, [])

    return (
        <div className={"absolute top-full z-1000 border border-product-library-divider-primary rounded-large shadow-sm overflow-y-auto scrollbar-custom scrollbar-thin max-h-70 w-75 mt-1 bg-white"} id={"labels-listbox"} role={"listbox"} aria-labelledby={"labels-trigger"}>
            <LabelsSearchInput labelValue={typedLabels} onLabelsSearched={setTypedLabels} inputRef={searchInputRef}/>
            <hr className="border-t border-t-product-library-divider-tertiary" />
            {filteredLabels?.results?.map(label => {
                const isSelected = selectedLabel.some(l => l.id === label.id)
                return (<LabelOptions key={label.id} label={label} isLabelsSelected={isSelected} onLabelsSelected={onLabelSelected}/>)
            })}
        </div>
    );
};

export default MyTaskAvailableLabelsDropdown;
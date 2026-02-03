import {useGetAllLabels} from "../../../../hooks/useQueryHook/useLabels.ts";
import LoadingSpin from "../../../ui/LoadingSpin.tsx";
import MyLabelListItem from "./MyLabelListItem.tsx";
import AddNewLabelButton from "./AddNewLabelButton.tsx";
import type {Label} from "../../../../types/label.type.ts";

type MyTaskLabelsDropdownProps = {
    selectedLabel: Label | null;
    onSelect: (label: Label) => void;
}
const MyTaskLabelsDropdown = ({selectedLabel, onSelect}: MyTaskLabelsDropdownProps) => {
    const {data: labels, isLoading} = useGetAllLabels()
    const results = labels?.results ?? []
    if(isLoading) {
        return <LoadingSpin/>
    }
    return (
        <div id={"label-listbox"} role={"listbox"} aria-labelledby={"label-trigger"} className={"absolute top-full z-1000 border border-product-library-divider-primary rounded-large shadow-sm overflow-y-auto scrollbar-thin scrollbar-custom w-195.5 bg-white mt-1"}>
            {results.length > 0 ? (
                <>
                    {labels?.results.map(label => (
                        <MyLabelListItem key={label.id} label={label} isLabelSelected={selectedLabel?.name === label.name} onSelectLabel={onSelect}/>
                    ))}
                    <AddNewLabelButton/>
                </>
            ) : <button type={"button"} className={"w-full text-start text-sm py-1 px-4 hover:bg-product-library-selectable-secondary-hover-fill"}>
                Label not found. <span className={"font-semibold"}>Create</span>
            </button>}
        </div>
    );
};

export default MyTaskLabelsDropdown;
import {useGetAllLabels} from "../../../../hooks/useQueryHook/useLabels.ts";
import LoadingSpin from "../../../ui/LoadingSpin.tsx";
import MyLabelListItem from "./MyLabelListItem.tsx";
import AddNewLabelButton from "./AddNewLabelButton.tsx";
import type {Label} from "../../../../types/label.type.ts";
import {shouldShowLabel} from "../../../../helpers/handleCommasTag.ts";

type MyTaskLabelsDropdownProps = {
    selectedLabels: Label[];
    onSelect: (label: Label) => void;
    keyword: string;
}
const MyTaskLabelsDropdown = ({selectedLabels, onSelect, keyword}: MyTaskLabelsDropdownProps) => {
    const {data: labels, isLoading} = useGetAllLabels()
    const results = labels?.results ?? []
    const filteredLabels = results?.filter(label => shouldShowLabel(label, selectedLabels, keyword))
    if(isLoading) {
        return <LoadingSpin/>
    }
    return (
        <div id={"label-listbox"} role={"listbox"} aria-labelledby={"label-trigger"} className={"absolute top-full z-1000 border border-product-library-divider-primary rounded-large shadow-sm overflow-y-auto scrollbar-thin scrollbar-custom w-195.5 bg-white mt-1"}>
            {filteredLabels.length > 0 ? (
                <>
                    {filteredLabels.map(label => (
                        <MyLabelListItem key={label.id} label={label} onSelectLabel={onSelect}/>
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
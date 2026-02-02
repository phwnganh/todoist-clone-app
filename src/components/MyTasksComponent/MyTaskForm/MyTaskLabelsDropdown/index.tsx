import {useGetAllLabels} from "../../../../hooks/useQueryHook/useLabels.ts";
import LoadingSpin from "../../../ui/LoadingSpin.tsx";
import MyLabelListItem from "./MyLabelListItem.tsx";
import AddNewLabelButton from "./AddNewLabelButton.tsx";

const MyTaskLabelsDropdown = () => {
    const {data: labels, isLoading} = useGetAllLabels()

    if(isLoading) {
        return <LoadingSpin/>
    }
    return (
        <div id={"label-listbox"} role={"listbox"} aria-labelledby={"label-trigger"} className={"absolute top-full z-1000 border border-product-library-divider-primary rounded-large shadow-sm overflow-y-auto scrollbar-thin scrollbar-custom w-195.5 bg-white mt-1"}>
            {labels?.results.map(label => (
                <MyLabelListItem key={label.id} label={label}/>
            ))}
            <AddNewLabelButton/>
        </div>
    );
};

export default MyTaskLabelsDropdown;
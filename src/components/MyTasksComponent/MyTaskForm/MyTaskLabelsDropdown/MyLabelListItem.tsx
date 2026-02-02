import type {Label} from "../../../../types/label.type.ts";
import LabelIcon from "../../../../assets/label-icon.svg";

type MyLabelListItemProps = {
    label: Label
}
const MyLabelListItem = ({label}: MyLabelListItemProps) => {
    return (
        <div className={"px-2 py-1 flex items-center gap-1.5 hover:bg-product-library-selectable-secondary-hover-fill"}>
            <div className={"w-6 h-6 flex justify-center items-center"}>
                <img src={LabelIcon} alt={"label-icon"} />
            </div>
            <p className={"text-sm"}>{label.name}</p>
        </div>
    );
};

export default MyLabelListItem;
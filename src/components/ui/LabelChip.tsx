import type {Label} from "@/types/label.type.ts";

type LabelChipProps = {
    label: Label;
    onRemove: () => void;
}
const LabelChip = ({label, onRemove}: LabelChipProps) => {
    return (
        <div className={"flex items-center gap-1.5 p-1 rounded bg-product-library-display-accent-secondary-fill text-sm"}>
            <span className={"font-medium"}>@{label.name}</span>
            <button type={"button"} onClick={onRemove} className={"text-xs opacity-60 hover:opacity-100"}>x</button>
        </div>
    );
};

export default LabelChip;
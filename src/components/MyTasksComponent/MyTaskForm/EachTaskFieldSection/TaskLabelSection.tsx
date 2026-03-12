import type {Label} from "@/types/label.type.ts";
import LabelIcon from "@/components/icons/LabelIcon.tsx";
import CustomLabel from "@/components/ui/CustomLabel.tsx";

type TaskLabelSectionProps = {
    labelsValue: Label[]
    onOpenLabel: () => void;
    variant?: string;
    onRemoveLabels: (labelId: string) => void;
}
const TaskLabelSection = ({labelsValue, onOpenLabel, variant, onRemoveLabels}: TaskLabelSectionProps) => {
    return (
        <>
            {!labelsValue.length ? (
                <div
                    role={"button"}
                    className={
                        "px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill cursor-pointer"
                    }
                    onClick={onOpenLabel}
                >
                    <div className={"w-4 h-4 flex justify-center items-center"}>
                        <LabelIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                    </div>
                    {variant === "list" && (
                        <p
                            className={
                                "text-sm text-product-library-display-secondary-idle-tint"
                            }
                        >
                            Labels
                        </p>
                    )}
                </div>
            ) : (
                labelsValue.map((label) => (
                    <CustomLabel
                        key={label.id}
                        onRemove={() => onRemoveLabels(label.id)}
                        className={
                            "border border-product-library-border-idle-tint rounded-small hover:bg-product-library-selectable-secondary-hover-fill text-sm text-product-library-display-secondary-idle-tint"
                        }
                        label={label}
                        icon={<LabelIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>}
                    />
                ))
            )}
        </>
    );
};

export default TaskLabelSection;
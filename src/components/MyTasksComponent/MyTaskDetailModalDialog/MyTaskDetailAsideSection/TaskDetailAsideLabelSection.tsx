import type {Label} from "../../../../types/label.type.ts";
import type {RefObject} from "react";
import SmallPlusAddIcon from "../../../icons/SmallPlusAddIcon.tsx";
import MyTaskAvailableLabelsDropdown from "../MyTaskAvailableLabelsDropdown";
import CustomLabel from "../../../ui/CustomLabel.tsx";

type TaskDetailAsideLabelSectionProps = {
    selectedLabels: Label[];
    labelsRef: RefObject<HTMLDivElement | null>;
    isOpenMyTaskDetailAside: boolean;
    onToggle: () => void;
    onSelectLabel: (label: Label) => void;
    onRemoveLabel: (id: string) => void;
    onCloseDropdown: () => void;
}
const TaskDetailAsideLabelSection = ({selectedLabels, labelsRef, isOpenMyTaskDetailAside, onToggle, onSelectLabel, onRemoveLabel, onCloseDropdown}: TaskDetailAsideLabelSectionProps) => {
    return (
        <>
            <div className={"relative"} ref={labelsRef}>
                <div
                    role={"listbox"}
                    onClick={onToggle}
                    className={
                        "cursor-pointer flex justify-between items-center hover:bg-product-library-display-accent-secondary-fill rounded-sm p-1.5"
                    }
                >
                    <p
                        className={
                            "text-product-library-display-secondary-idle-tint font-medium text-sm"
                        }
                    >
                        Labels
                    </p>
                    <button
                        type={"button"}
                        className={"flex justify-center items-center"}
                    >
                        <SmallPlusAddIcon />
                    </button>
                </div>
                {isOpenMyTaskDetailAside && (
                    <MyTaskAvailableLabelsDropdown
                        selectedLabel={selectedLabels}
                        onLabelSelected={onSelectLabel}
                        onCloseDropdown={onCloseDropdown}
                    />
                )}
            </div>
            {selectedLabels.length > 0 && (
                <div className={"flex flex-wrap gap-1"}>
                    {selectedLabels.map((label) => (
                        <CustomLabel
                            key={label.id}
                            className={
                                "bg-label-pill-idle-fill hover:bg-label-pill-hover-fill"
                            }
                            onRemove={onRemoveLabel}
                            label={label}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default TaskDetailAsideLabelSection;
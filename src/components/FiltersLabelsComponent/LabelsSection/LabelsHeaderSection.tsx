import TaskSmallArrowDownIcon from "@/components/icons/TaskSmallArrowDownIcon.tsx";
import TaskSmallArrowRightIcon from "@/components/icons/TaskSmallArrowRightIcon.tsx";
import PlusIcon from "@/components/icons/PlusIcon.tsx";

type LabelsHeaderSectionProps = {
    isExpanded: boolean;
    onExpanded: () => void;
}
const LabelsHeaderSection = ({isExpanded, onExpanded}: LabelsHeaderSectionProps) => {
    return (
        <div className={"border-b border-b-product-library-divider-primary"}>
            <div className={"flex justify-between items-start px-4"}>
                <div className={"flex items-center"}>
                    <button
                        type={"button"}
                        className={
                            "flex pr-0.75 rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                        }
                        onClick={onExpanded}
                    >
                        {isExpanded ? (
                            <TaskSmallArrowDownIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                        ) : (
                            <TaskSmallArrowRightIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                        )}
                    </button>
                    <p className={"font-bold text-sm pt-1.5 pr-1.5 pb-1.25 text-product-library-display-primary-idle-tint"}>abc</p>
                </div>
                <button type={"button"} className={"flex justify-center items-center"}>
                    <PlusIcon className={"text-product-library-display-secondary-idle-tint"}/>
                </button>
            </div>
        </div>
    );
};

export default LabelsHeaderSection;
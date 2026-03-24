import TaskSmallArrowDownIcon from "@/components/icons/TaskSmallArrowDownIcon.tsx";
import TaskSmallArrowRightIcon from "@/components/icons/TaskSmallArrowRightIcon.tsx";
import PlusIcon from "@/components/icons/PlusIcon.tsx";
import {useLabelStore} from "@/stores/label.store.ts";
import AddLabelsModalDialog from "@/components/FiltersLabelsComponent/AddLabelsComponent";

type LabelsHeaderSectionProps = {
    isExpanded: boolean;
    onExpanded: () => void;
}
const LabelsHeaderSection = ({isExpanded, onExpanded}: LabelsHeaderSectionProps) => {
    const {openAddLabelModalDialog, onOpenAddLabelModalDialog} = useLabelStore()
    return (
        <div className={"border-b border-b-product-library-divider-primary"}>
            <div className={"flex justify-between items-start"}>
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
                <button type={"button"} onClick={onOpenAddLabelModalDialog} className={"flex justify-center items-center rounded-small hover:bg-product-library-selectable-secondary-hover-fill"}>
                    <PlusIcon className={"text-product-library-display-secondary-idle-tint"}/>
                </button>
            </div>
            {openAddLabelModalDialog && <AddLabelsModalDialog/>}
        </div>
    );
};

export default LabelsHeaderSection;
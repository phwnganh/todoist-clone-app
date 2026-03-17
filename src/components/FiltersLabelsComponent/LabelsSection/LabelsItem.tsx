import type {Label} from "@/types/label.type.ts";
import LabelIcon from "@/components/icons/LabelIcon.tsx";
import {getTasksByLabel} from "@/helpers/getTasksByLabel.ts";
import {useGetAllTasks} from "@/hooks/useQueryHook/useTasks.ts";
import HeartIcon from "@/components/icons/HeartIcon.tsx";
import EditIcon from "@/components/icons/EditIcon.tsx";
import MenuIcon from "@/components/icons/MenuIcon.tsx";
import {getProjectColorClass} from "@/helpers/getProjectColorClass.ts";
import {useLabelStore} from "@/stores/label.store.ts";
import EditLabelModalDialog from "@/components/FiltersLabelsComponent/EditLabelsComponent/EditLabelModalDialog.tsx";
import MyLabelsToolbarDropdown from "@/components/FiltersLabelsComponent/LabelsSection/MyLabelsToolbarDropdown.tsx";
import {useRef} from "react";
import {useClickOutside} from "@/hooks/useClickOutside.ts";

type LabelsItemProps = {
    label: Label;
}
const LabelsItem = ({label}: LabelsItemProps) => {
    const {data: tasksData} = useGetAllTasks()
    const tasksByLabel = getTasksByLabel(label.name, tasksData)
    const tasksByLabelLength = tasksByLabel?.length
    const labelsToolbarRef = useRef<HTMLDivElement | null>(null)
    const {openEditLabelModalDialog, onOpenEditLabelModalDialog, openLabelToolbarDropdown, onOpenLabelToolbarDropdown, onCloseLabelToolbarDropdown} = useLabelStore()
    const isOpenEditLabel = openEditLabelModalDialog === label.id
    const isOpenLabelToolbarDropdown = openLabelToolbarDropdown === label.id

    useClickOutside({
        ref: labelsToolbarRef,
        handler: onCloseLabelToolbarDropdown,
        enabled: isOpenLabelToolbarDropdown
    })
    return (
        <li className={"border-b border-b-product-library-divider-primary cursor-pointer group"}>
            <div className={"flex justify-between w-full items-center p-1.5"}>
                <div className={"flex items-center gap-1.5"}>
                    <div className={"flex justify-center items-center shrink-0"}>
                        <LabelIcon className={`${getProjectColorClass(label.color)}`}/>
                    </div>
                    <p className={"text-sm mb-0.75 text-product-library-display-primary-idle-tint"}>
                        {label.name}
                    </p>
                </div>
                <div className={"relative w-6 h-6 flex justify-end"}>
                    {tasksByLabelLength > 0 &&
                        <p className={`absolute ${isOpenLabelToolbarDropdown ? "opacity-0 pointer-events-none" : "group-hover:opacity-0 group-hover:pointer-events-auto opacity-100 pointer-events-none"} text-sm text-product-library-actionable-quaternary-idle-tint`}>{tasksByLabelLength}</p>
                    }
                    <div className={`absolute ${isOpenLabelToolbarDropdown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"} flex pl-4 gap-small`}>
                        <button type={"button"} aria-label={"add-to-favourite"} className={
                            "rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                        }>
                            <HeartIcon className={"text-product-library-display-secondary-idle-tint"}/>
                        </button>
                        <button type={"button"} aria-label={"edit-label"} onClick={() => onOpenEditLabelModalDialog(label.id)} className={
                            "rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                        }>
                            <EditIcon className={"text-product-library-display-secondary-idle-tint"}/>
                        </button>
                        <div className={"relative"} ref={labelsToolbarRef}>
                            <button type={"button"} aria-label={"menu"} onClick={() => onOpenLabelToolbarDropdown(label.id)} className={
                                "rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                            }>
                                <MenuIcon className={"text-product-library-display-secondary-idle-tint"}/>
                            </button>
                            {isOpenLabelToolbarDropdown && <MyLabelsToolbarDropdown labelId={label.id}/>}

                        </div>

                    </div>
                </div>
            </div>
            {isOpenEditLabel && <EditLabelModalDialog label={label}/>}
        </li>
    );
};

export default LabelsItem;
import type {Label} from "@/types/label.type.ts";
import LabelIcon from "@/components/icons/LabelIcon.tsx";
import {getTasksByLabel} from "@/helpers/getTasksByLabel.ts";
import {useGetAllTasks} from "@/hooks/useQueryHook/useTasks.ts";
import HeartIcon from "@/components/icons/HeartIcon.tsx";
import EditIcon from "@/components/icons/EditIcon.tsx";
import MenuIcon from "@/components/icons/MenuIcon.tsx";
import {getProjectColorClass} from "@/helpers/getProjectColorClass.ts";

type LabelsItemProps = {
    label: Label;
}
const LabelsItem = ({label}: LabelsItemProps) => {
    const {data: tasksData} = useGetAllTasks()
    const tasksByLabel = getTasksByLabel(label.name, tasksData)
    const tasksByLabelLength = tasksByLabel?.length
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
                        <p className={"absolute group-hover:opacity-0 group-hover:pointer-events-auto opacity-100 pointer-events-none text-sm text-product-library-actionable-quaternary-idle-tint"}>{tasksByLabelLength}</p>
                    }
                    <div className={"absolute opacity-0 group-hover:opacity-100 flex pl-4 gap-small"}>
                        <button type={"button"} aria-label={"add-to-favourite"} className={
                            "rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                        }>
                            <HeartIcon className={"text-product-library-display-secondary-idle-tint"}/>
                        </button>
                        <button type={"button"} aria-label={"edit-label"} className={
                            "rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                        }>
                            <EditIcon className={"text-product-library-display-secondary-idle-tint"}/>
                        </button>
                        <button type={"button"} aria-label={"menu"} className={
                            "rounded-small hover:bg-product-library-selectable-secondary-hover-fill"
                        }>
                            <MenuIcon className={"text-product-library-display-secondary-idle-tint"}/>
                        </button>
                    </div>
                </div>


            </div>

        </li>
    );
};

export default LabelsItem;
import type {Label} from "@/types/label.type.ts";
import LabelIcon from "@/components/icons/LabelIcon.tsx";
import {getTasksByLabel} from "@/helpers/getTasksByLabel.ts";
import {useGetAllTasks} from "@/hooks/useQueryHook/useTasks.ts";

type LabelsItemProps = {
    label: Label;
}
const LabelsItem = ({label}: LabelsItemProps) => {
    const {data: tasksData} = useGetAllTasks()
    const tasksByLabel = getTasksByLabel(label.name, tasksData)
    const tasksByLabelLength = tasksByLabel?.length
    return (
        <li className={"border-b border-b-product-library-divider-primary"}>
            <div className={"flex justify-between w-full items-center p-1.5 group"}>
                <div className={"flex items-center gap-1"}>
                    <div className={"flex justify-center items-center shrink-0"}>
                        <LabelIcon className={"text-product-library-display-secondary-idle-tint"}/>
                    </div>
                    <p className={"text-sm mb-0.75 text-product-library-display-primary-idle-tint"}>
                        {label.name}
                    </p>
                </div>
                {tasksByLabelLength > 0 &&
                    <p className={"text-sm text-product-library-actionable-quaternary-idle-tint"}>{tasksByLabelLength}</p>
                }
            </div>

        </li>
    );
};

export default LabelsItem;
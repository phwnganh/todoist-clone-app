import type {ReactNode} from "react";
import type {Label} from "../../types/label.type.ts";

type CustomLabelProps = {
    className?: string
    icon?: ReactNode;
    onRemove: (labelId: string) => void;
    label: Label;
}

const CustomLabel = ({className, icon, onRemove, label}: CustomLabelProps) => {
    return (
        <div role={"button"} className={`flex justify-between items-center px-3 py-1 text-sm border-product-library-border-idle-tint rounded-small h-7 ${className} cursor-pointer`}>
            <div className={"flex items-center gap-1.5"}>
                {icon &&
                    <div className={"w-4 h-4 flex justify-center items-center"}>
                        {icon}
                    </div>
                }
                <span>{label.name}</span>
            </div>

            <button type={"button"} onClick={() => onRemove(label.id)} className={"w-4 h-4 flex justify-center items-center"}>x</button>
        </div>
    );
};

export default CustomLabel;
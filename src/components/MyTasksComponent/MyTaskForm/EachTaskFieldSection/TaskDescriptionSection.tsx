import type {ChangeEvent} from "react";

type TaskDescriptionSectionProps = {
    descriptionValue: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const TaskDescriptionSection = ({descriptionValue, onChange}: TaskDescriptionSectionProps) => {
    return (
        <input
            type={"text"}
            className={
                "text-xs leading-tight text-product-library-display-primary-idle-tint my-0.5 outline-none"
            }
            placeholder={"Description"}
            value={descriptionValue}
            onChange={(e) =>
                onChange(e)
            }
        />
    );
};

export default TaskDescriptionSection;
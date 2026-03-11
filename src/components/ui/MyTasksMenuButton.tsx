import {type ReactNode} from "react";

type MyTasksMenuButtonProps={
    label: string;
    danger?: boolean;
    onClick: () => void;
    icon: ReactNode
}
const MyTasksMenuButton = ({label, danger, onClick, icon}: MyTasksMenuButtonProps) => {

    return (
        <button className={`flex items-center gap-small text-sm text-start px-3 py-1.5 hover:bg-product-library-selectable-secondary-hover-fill rounded-small ${danger ? "text-product-library-display-accent-primary-tint" : ""}`}
        onClick={onClick}>
            <div className={"w-6 h-6 flex justify-center items-center"}>
                {icon}
            </div>
            <span className={"text-sm text-product-library-display-primary-idle-tint"}>{label}</span>
        </button>
    );
};

export default MyTasksMenuButton;
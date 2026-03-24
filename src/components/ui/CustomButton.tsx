import type {ButtonHTMLAttributes, ReactNode} from "react";

type CustomButtonProps = {
    type: "button" | "submit" | "reset";
    className?: string;
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>
const CustomButton = ({type, className, children, ...props}: CustomButtonProps) => {
    return (
        <button type={type} className={`flex justify-center items-center rounded-small ${className}`} {...props}>
            {children}
        </button>
    );
};

export default CustomButton;
import {createPortal} from "react-dom";
import type {HTMLAttributes, ReactNode} from "react";

type CustomDialogProps = {
    labelTitle: string;
    className?: string;
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement>
const CustomDialog = ({labelTitle, className, children, ...props}: CustomDialogProps) => {
    return createPortal(
        <div aria-modal={"true"} aria-labelledby={labelTitle}
             className={"fixed inset-0 bg-product-library-background-overlay z-50 pt-[13vh]"} {...props}
        >
        <div className={`${className} max-w-full mx-auto rounded-large bg-product-library-background-base-primary transition-all duration-500 ease-in-out`}>
            {children}
        </div>
        </div>,
        document.body
    );
};

export default CustomDialog;
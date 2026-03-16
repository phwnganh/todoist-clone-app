import type {HTMLAttributes, ReactNode} from "react";
import {createPortal} from "react-dom";

type CustomDetailModalDialogProps = {
    className?: string
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement>
const CustomDetailModalDialog = ({className, children, ...props}: CustomDetailModalDialogProps) => {
    return createPortal(
        <div role={"dialog"} aria-modal={"true"} {...props} className={"fixed inset-0 bg-product-library-background-overlay z-50 md:pt-16"}>
            <div className={`w-216 max-w-full h-full md:h-200 mx-auto rounded-large bg-product-library-background-base-primary ${className}`}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default CustomDetailModalDialog;
import type {ReactNode} from "react";

const CustomMenuDropdown = ({children, className}: {children: ReactNode, className?: string}) => {
    return (
        <div className={`absolute top-full right-0 ${className} z-50 border border-product-library-divider-primary rounded-large shadow-sm mt-1 py-1.5 bg-product-library-background-base-primary`}>
            <div className={"flex flex-col gap-1"}>{children}</div>
        </div>
    );
};

export default CustomMenuDropdown;
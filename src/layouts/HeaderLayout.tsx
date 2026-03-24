import {type ReactNode} from "react";
import CollapseSidebarIcon from "@/components/icons/CollapseSidebarIcon.tsx";

type HeaderLayoutProps = {
    showCollapse: boolean;
    onToggleSidebar: () => void;
    left?: ReactNode;
    right?: ReactNode
}
const HeaderLayout = ({showCollapse, onToggleSidebar, left, right}: HeaderLayoutProps) => {
    return (
        <header className={`flex items-center justify-between lg:sticky lg:top-0 z-30 transition-all duration-200 bg-transparent lg:bg-product-library-background-base-primary`}>
            <div className="flex items-center">
                {showCollapse && (
                    <button className="w-8 h-8 flex justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill rounded-small" onClick={onToggleSidebar}>
                        <CollapseSidebarIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                </button>
                )}
            </div>
                {left}


            {right}
        </header>
    );
};

export default HeaderLayout;
import CollapseSideBarIcon from "../assets/collapse-sidebar-icon.svg";
import {type ReactNode} from "react";

type HeaderLayoutProps = {
    showCollapse: boolean;
    onToggleSidebar: () => void;
    left?: ReactNode;
    right?: ReactNode
}
const HeaderLayout = ({showCollapse, onToggleSidebar, left, right}: HeaderLayoutProps) => {
    return (
        <header className={`flex items-center justify-between lg:sticky lg:top-0 z-30 transition-all duration-200 bg-transparent lg:bg-white`}>
            <div className="flex items-center">
                {showCollapse && (
                    <button className="w-8 h-8 flex justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small" onClick={onToggleSidebar}>
                        <img src={CollapseSideBarIcon} alt={"collapse-side-bar-icon"}/>
                </button>
                )}
            </div>
                {left}


            {right}
        </header>
    );
};

export default HeaderLayout;
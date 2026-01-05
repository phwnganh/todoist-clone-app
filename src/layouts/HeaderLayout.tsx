import CollapseSideBarIcon from "../components/icons/CollapseSideBarIcon.tsx";
import type {ReactNode} from "react";

type HeaderLayoutProps = {
    showCollapse: boolean;
    onToggleSidebar: () => void;
    right?: ReactNode
}
const HeaderLayout = ({showCollapse, onToggleSidebar, right}: HeaderLayoutProps) => {

    return (
        <header className="flex items-center justify-between">
            <div className="flex items-center">
                {showCollapse ? (
                    <button className="w-8 h-8 flex justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small" onClick={onToggleSidebar}>
                    <CollapseSideBarIcon/>
                </button>
                ) : <div className="w-8 h-8"></div>}
            </div>


            {right}
        </header>
    );
};

export default HeaderLayout;
import UserInfoHeader from "./UserInfoHeader.tsx";
import BellIcon from "@/components/icons/BellIcon.tsx";
import CollapseSidebarIcon from "@/components/icons/CollapseSidebarIcon.tsx";
const SidebarHeader = ({ onToggle }: { onToggle: () => void }) => {
  const buttonIconClass =
    "w-8 h-8 flex justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill rounded-small";
  return (
    <div className="flex justify-between items-center m-medium pl-2">
      <UserInfoHeader />
      <div className="flex items-center gap-xsmall">
        <button className={buttonIconClass}>
          <BellIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
        </button>
        <button onClick={onToggle} className={buttonIconClass}>
          <CollapseSidebarIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
        </button>
      </div>
    </div>
  );
};

export default SidebarHeader;

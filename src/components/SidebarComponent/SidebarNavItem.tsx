import type { MenuNavItem } from "../../types/menu-nav.type.ts";
import { NavLink } from "react-router-dom";
import { ICON_MAP } from "../icons/IconMap";

type SidebarNavItemProps = {
  item: MenuNavItem;
  onClick?: () => void;
};
const SidebarNavItem = ({ item, onClick }: SidebarNavItemProps) => {
  const commonClass = "flex items-center p-1.25";
  const Icon = ICON_MAP[item.icon];
  const renderContent = (isActive?: boolean) => (
    <>
      <div
        className={`flex justify-center items-center ${
          isActive ? "text-product-library-actionable-tertiary-idle-tint" : ""
        }`}
      >
        <Icon />
      </div>
      <span
        className={`text-sm wrap-break-word py-0.75 pl-1.25 ${
          isActive ? "text-product-library-actionable-tertiary-idle-tint" : ""
        }`}
      >
        {item.label}
      </span>
      <div className="w-6 h-6 flex items-center justify-center ml-auto"></div>
    </>
  );

  if (!item.getTo) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${commonClass} hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small`}
      >
        {renderContent(false)}
      </button>
    );
  }
  return (
    <NavLink
      to={item.getTo}
      className={({ isActive }) =>
        `${commonClass} hover:rounded-small ${
          isActive
            ? "bg-product-library-priorities-p2-secondary-hover-fill rounded-small hover:bg-product-library-priorities-p2-secondary-hover-fill"
            : "hover:bg-product-library-selectable-secondary-hover-fill"
        }`
      }
    >
      {({ isActive }) => renderContent(isActive)}
    </NavLink>
  );
};

export default SidebarNavItem;

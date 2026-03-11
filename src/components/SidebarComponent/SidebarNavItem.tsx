import type { MenuNavItem } from "@/types/menu-nav.type.ts";
import { NavLink } from "react-router-dom";

type SidebarNavItemProps = {
  item: MenuNavItem;
  onClick?: () => void;
};
const SidebarNavItem = ({ item, onClick }: SidebarNavItemProps) => {
  const commonClass = "flex items-center p-1.25";
  const renderContent = (isActive?: boolean) => (
    <>
      <div
        className={`flex justify-center items-center ${
          isActive ? "text-product-library-actionable-tertiary-idle-tint" : ""
        }`}
      >
        {typeof item.icon === "string" ? (
          <img src={item.icon} alt={item.label} />
        ) : (
          <item.icon />
        )}
      </div>
      <span
        className={`text-sm wrap-break-word py-0.75 pl-1.25 text-product-library-display-primary-idle-tint ${
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
        `${commonClass} rounded-small ${
          isActive
            ? "bg-product-library-display-accent-secondary-fill rounded-small hover:bg-product-library-display-accent-secondary-fill"
            : "hover:bg-product-library-selectable-secondary-hover-fill"
        }`
      }
    >
      {({ isActive }) => renderContent(isActive)}
    </NavLink>
  );
};

export default SidebarNavItem;

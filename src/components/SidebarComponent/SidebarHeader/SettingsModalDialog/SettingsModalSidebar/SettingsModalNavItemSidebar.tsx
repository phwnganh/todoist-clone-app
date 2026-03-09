import type {SettingMenuNavItem} from "@/types/menu-nav.type.ts";

type SettingsNavItemProps = {
    item: SettingMenuNavItem;
    onClick?: () => void;
    active?: boolean;
}
const SettingsModalNavItemSidebar = ({item, onClick, active}: SettingsNavItemProps) => {
    const commonClass = "flex items-center p-1.25";

    return (
        <li onClick={onClick} className={`${commonClass} rounded-small ${active ? "bg-product-library-display-accent-secondary-fill rounded-small hover:bg-product-library-display-accent-secondary-fill"
            : "hover:bg-product-library-selectable-secondary-hover-fill"} cursor-pointer`}>
            <div className={`flex justify-center items-center ${active ? "text-product-library-actionable-tertiary-idle-tint" : ""}`}>
                {typeof item.icon === "string" ? (
                    <img src={item.icon} alt={item.label} />
                ) : (
                    <item.icon />
                )}
            </div>
            <span
                className={`text-sm wrap-break-word py-0.75 pl-1.25 ${
                    active ? "text-product-library-actionable-tertiary-idle-tint" : ""
                }`}
            >
        {item.label}
      </span>
            <div className="w-6 h-6 flex items-center justify-center ml-auto"></div>
        </li>
    );
};

export default SettingsModalNavItemSidebar;
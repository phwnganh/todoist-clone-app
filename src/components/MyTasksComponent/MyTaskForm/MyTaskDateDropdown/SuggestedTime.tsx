import type { SuggestedTimeMenuToolbar } from "@/types/menu-nav.type.ts";

type SuggestedTimeProps = {
  item: SuggestedTimeMenuToolbar;
};
const SuggestedTime = ({ item }: SuggestedTimeProps) => {
  return (
    <button
      type={"button"}
      onClick={item.onClick}
      className={
        "py-1 pr-4 pl-3 flex justify-between items-center hover:bg-product-library-selectable-secondary-hover-fill rounded-small"
      }
    >
      <div className={"flex items-center gap-small"}>
        <div className={"flex justify-center items-center w-6 h-6"}>
          {item.icon}
        </div>
        <p className={"font-medium text-sm mr-1"}>{item.label}</p>
      </div>
      <p className={"text-gray-500 text-sm"}>{item.time}</p>
    </button>
  );
};

export default SuggestedTime;

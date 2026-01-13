import { useRef } from "react";
import SearchIcon from "../../assets/search-icon.svg";
import CloseIcon from "../../assets/close-icon.svg";
type MyProjectsSearchActionProps = {
    value: string;
    onSearchChange: (value: string) => void;
}
const MyProjectsSearchAction = ({value, onSearchChange}: MyProjectsSearchActionProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClearSearch = () => {
    onSearchChange("");
    searchInputRef?.current?.focus();
  };
  return (
    <div className="mt-2 flex items-center border border-product-library-border-idle-tint hover:border-product-library-border-focus-tint rounded-small">
      <div className="ml-xsmall">
        <img src={SearchIcon} alt={"search-icon"} />
      </div>
      <input
        type="text"
        className="py-1.5 px-2 text-sm w-full outline-none"
        ref={searchInputRef}
        value={value}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search projects"
      />
      {value && (
        <button
          onClick={handleClearSearch}
          className="flex items-center justify-center mr-1 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"
        >
          <img src={CloseIcon} alt={"close-icon"} />
        </button>
      )}
    </div>
  );
};

export default MyProjectsSearchAction;

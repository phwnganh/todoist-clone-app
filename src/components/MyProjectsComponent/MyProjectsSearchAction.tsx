import { useRef } from "react";
import SearchIcon from "../icons/SearchIcon.tsx";
import CloseIcon from "../icons/CloseIcon.tsx";
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
        <SearchIcon />
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
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default MyProjectsSearchAction;

import type { RefObject } from "react";

type SearchInputProps = {
  parentProjectValue: string;
  onParentProjectsSearched: (value: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
};
const SearchInput = ({
  parentProjectValue,
  onParentProjectsSearched,
  inputRef,
}: SearchInputProps) => {
  return (
    <div className="p-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a project name"
        className="text-sm border border-product-library-border-idle-tint rounded-small w-full py-1.5 px-2 outline-none focus:outline-none"
        onChange={(e) => onParentProjectsSearched(e.target.value)}
        value={parentProjectValue}
      />
    </div>
  );
};

export default SearchInput;

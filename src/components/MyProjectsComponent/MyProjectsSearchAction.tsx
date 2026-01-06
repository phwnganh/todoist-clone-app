import {useRef, useState} from "react";
import SearchIcon from "../icons/SearchIcon.tsx";
import CloseIcon from "../icons/CloseIcon.tsx";

const MyProjectsSearchAction = () => {
    const [searchValue, setSearchValue] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleClearSearch = () => {
        setSearchValue("");
        searchInputRef?.current?.focus();
    }
    return (
        <div className="mt-2 flex items-center border border-product-library-border-idle-tint hover:border-product-library-border-focus-tint rounded-small">
            <div className="ml-xsmall">
                <SearchIcon/>
            </div>
            <input type="text" className="py-1.5 px-2 text-sm w-full outline-none" ref={searchInputRef} value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Search projects"/>
            {searchValue &&
                <button onClick={handleClearSearch} className="flex items-center justify-center mr-1 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
                    <CloseIcon/>
                </button>}

        </div>
    );
};

export default MyProjectsSearchAction;
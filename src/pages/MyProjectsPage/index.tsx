import {useOutletContext} from "react-router-dom";
import { type HeaderLayoutType } from "../../types/headerLayout.type.ts";
import HeaderLayout from "../../layouts/HeaderLayout.tsx";
import SettingsIcon from "../../components/icons/SettingsIcon.tsx";
import SearchIcon from "../../components/icons/SearchIcon.tsx";
import PlusIcon from "../../components/icons/PlusIcon.tsx";
import SmallArrowDownIcon from "../../components/icons/SmallArrowDownIcon.tsx";
import HashtagIcon from "../../components/icons/HashtagIcon.tsx";
import CloseIcon from "../../components/icons/CloseIcon.tsx";
import {useRef, useState} from "react";
import MyProjectsDropdown from "../../components/MyProjectsComponent/MyProjectsDropdown.tsx";

const MyProjectsPage = () => {
  const { showCollapse, onToggleSidebar } =
    useOutletContext<HeaderLayoutType>();
  const [searchValue, setSearchValue] = useState("");
  const [isOpenAddProjectsDropdown, setOpenAddProjectsDropdown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClearSearch = () => {
      setSearchValue("");
      searchInputRef?.current?.focus();
  }

  const handleOpenAddProjectsDropdown = () => {
      setOpenAddProjectsDropdown(prev => !prev);
  }
  return (
    <>
      <HeaderLayout
        showCollapse={showCollapse}
        onToggleSidebar={onToggleSidebar}
        right={
          <button className="flex items-center justify-center p-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
            <div className="mr-1.5">
              <SettingsIcon />
            </div>
            <span className="text-product-library-actionable-quaternary-idle-tint text-sm font-medium">
              Settings
            </span>
          </button>
        }
      ></HeaderLayout>
      <section className="max-w-200 mx-auto w-full">
        <div className="flex flex-col gap-small">
          <h1 className="p-1 font-strong text-product-library-display-primary-idle-tint text-header-large">
            My Projects
          </h1>
            <div className="w-full px-1">
                <button role="button" className="inline-flex px-1 text-product-library-display-secondary-idle-tint hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
            Free
          </button>
            </div>

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
            <div className="flex justify-between">
                <div className="flex items-center">
                    <p className="text-product-library-display-secondary-idle-tint text-sm pr-2">Archived projects only</p>
                    <label className="h-4.5 w-8 relative inline-block">
                        <input type="checkbox" className="sr-only peer"/>
                        <div className="w-full h-full rounded-full bg-product-library-selectable-primary-unselected-fill peer-checked:bg-product-library-actionable-primary-idle-fill transition-colors"></div>
                        <div className="absolute top-0.75 left-0.75 h-3 w-3 rounded-full bg-white peer-checked:translate-x-3.5"></div>
                    </label>
                </div>
                <div className="relative">
                    <button onClick={handleOpenAddProjectsDropdown} className="px-3 h-8 flex items-center bg-product-library-actionable-secondary-idle-fill rounded-small hover:bg-product-library-border-hover-tint">
                        <div className="mr-1.5 flex justify-center items-center">
                            <PlusIcon/>
                        </div>
                        <span className="text-product-library-actionable-secondary-on-idle-tint overflow-hidden text-sm font-medium">Add</span>
                        <div className="ml-1.5 flex justify-center items-center">
                            <SmallArrowDownIcon/>
                        </div>
                    </button>
                    {isOpenAddProjectsDropdown && <MyProjectsDropdown/>}
                </div>

            </div>
            <div className="pt-xlarge pb-xsmall"></div>
            <div className="mt-medium flex flex-col gap-4">
                <div className="font-medium text-sm text-product-library-display-primary-idle-tint">2 projects</div>
                <hr className="border-t border-t-product-library-divider-tertiary"/>
            </div>
            <button className="group pt-3 flex justify-between pr-3 py-3 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
                <div className="flex items-center">
                    <div className="mr-small flex justify-center items-center">
                        <HashtagIcon/>
                    </div>
                    <div className="text-sm font-regular whitespace-nowrap">Getting Started</div>
                </div>
                <div role="button" className="group-hover:flex items-center hidden gap-1">
                    <div className="rounded-full w-1.5 h-1.5 border border-product-library-display-primary-idle-tint"></div>
                    <div className="rounded-full w-1.5 h-1.5 border border-product-library-display-primary-idle-tint"></div>
                    <div className="rounded-full w-1.5 h-1.5 border border-product-library-display-primary-idle-tint"></div>
                </div>
            </button>
        </div>
      </section>
    </>
  );
};

export default MyProjectsPage;

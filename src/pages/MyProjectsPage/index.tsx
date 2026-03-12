import {useOutletContext} from "react-router-dom";
import { type HeaderLayoutType } from "@/types/headerLayout.type.ts";
import HeaderLayout from "@/layouts/HeaderLayout.tsx";
import MyProjectsSearchAction from "@/components/MyProjectsComponent/MyProjectsSearchAction.tsx";
import MyProjectsToolbarAction from "@/components/MyProjectsComponent/MyProjectsToolbarAction.tsx";
import MyProjectsList from "@/components/MyProjectsComponent/MyProjectsList.tsx";
import {useState} from "react";
import {useDebounce} from "@/hooks/useDebounce.ts";
import SettingIcon from "@/components/icons/SettingIcon.tsx";
import {useSidebarStore} from "@/stores/sidebar.store.ts";

const MyProjectsPage = () => {
  const { showCollapse, onToggleSidebar } =
    useOutletContext<HeaderLayoutType>();
  const {onOpenSettingModalDialog} = useSidebarStore()
    const [searchValue, setSearchValue] = useState("")
    const debouncedSearch = useDebounce(searchValue, 500);
  return (
    <>
      <HeaderLayout
        showCollapse={showCollapse}
        onToggleSidebar={onToggleSidebar}
        right={
          <button onClick={onOpenSettingModalDialog} type={"button"} className="flex items-center justify-center p-1.5 hover:bg-product-library-selectable-secondary-hover-fill rounded-small">
            <div className="mr-1.5">
              <SettingIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
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

            <MyProjectsSearchAction value={searchValue} onSearchChange={setSearchValue}/>
            <MyProjectsToolbarAction/>
            <div className="pt-xlarge pb-xsmall"></div>
            <MyProjectsList search={debouncedSearch}/>
        </div>
      </section>
    </>
  );
};

export default MyProjectsPage;

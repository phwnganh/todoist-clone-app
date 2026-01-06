import {useOutletContext} from "react-router-dom";
import { type HeaderLayoutType } from "../../types/headerLayout.type.ts";
import HeaderLayout from "../../layouts/HeaderLayout.tsx";
import SettingsIcon from "../../components/icons/SettingsIcon.tsx";
import MyProjectsSearchAction from "../../components/MyProjectsComponent/MyProjectsSearchAction.tsx";
import MyProjectsToolbarAction from "../../components/MyProjectsComponent/MyProjectsToolbarAction.tsx";
import MyProjectsList from "../../components/MyProjectsComponent/MyProjectsList.tsx";

const MyProjectsPage = () => {
  const { showCollapse, onToggleSidebar } =
    useOutletContext<HeaderLayoutType>();

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

            <MyProjectsSearchAction/>
            <MyProjectsToolbarAction/>
            <div className="pt-xlarge pb-xsmall"></div>
            <MyProjectsList/>
        </div>
      </section>
    </>
  );
};

export default MyProjectsPage;

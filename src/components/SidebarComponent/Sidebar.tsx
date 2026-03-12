import type { MenuNavItem } from "@/types/menu-nav.type.ts";
import { PROJECTS } from "@/constants/routes.constants.ts";
import SidebarNavItem from "./SidebarNavItem.tsx";
import { useState } from "react";
import SearchModalDialog from "../SearchModalDialog.tsx";
import { NavLink } from "react-router-dom";
import { MENU_NAV_ITEMS } from "@/data/menuNav.data.ts";
import SidebarMyProjectList from "./SidebarMyProjectList.tsx";
import SidebarHeader from "./SidebarHeader";
import PlusAddIcon from "@/components/icons/PlusAddIcon.tsx";
import {useExpanded} from "@/hooks/useExpanded.ts";
import TaskSmallArrowDownIcon from "@/components/icons/TaskSmallArrowDownIcon.tsx";
import TaskSmallArrowRightIcon from "@/components/icons/TaskSmallArrowRightIcon.tsx";
import AddIcon from "@/components/icons/AddIcon.tsx";
import QuestionIcon from "@/components/icons/QuestionIcon.tsx";
type SidebarProps = {
  open: boolean;
  isMobile: boolean;
  onToggle: () => void;
};
const Sidebar = ({ open, onToggle, isMobile }: SidebarProps) => {
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const {isExpanded, handleExpanded} = useExpanded()
  const handleSearchClick = () => {
    setOpenSearchModal(true);
  };

  return (
    <nav
      className={`flex flex-col bg-product-library-background-base-secondary z-40 transition-all duration-300 ease-out overflow-hidden ${
        isMobile ? "fixed inset-y-0 left-0 top-0 z-50" : "relative z-40"
      } ${open ? "w-70" : isMobile ? "w-70 -translate-x-full" : "w-0"}`}
    >
      <div className="flex flex-col">
        {/*sidebar header*/}
        <SidebarHeader onToggle={onToggle} />
        <div className="mx-medium mb-small"></div>
        {/*add task modal*/}
        <button className="flex items-center px-2.5 py-0.75 text-product-library-actionable-tertiary-idle-tint hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
          <div className="flex justify-center items-center mr-1.5 pl-1.5">
            <PlusAddIcon/>
          </div>
          <span className="text-center font-medium text-sm">Add task</span>
        </button>

        {/*menu nav item*/}
        <div className="px-medium py-xsmall flex flex-col">
          <ul className="flex flex-col list-none">
            {MENU_NAV_ITEMS.map((item: MenuNavItem) => (
              <SidebarNavItem
                key={item.key}
                item={item}
                onClick={item.key === "search" ? handleSearchClick : undefined}
              />
            ))}
          </ul>
          <NavLink
            to={PROJECTS}
            className={({ isActive }) =>
              `group flex items-center hover:rounded-small py-0.75 ${
                isActive
                  ? "bg-product-library-display-accent-secondary-fill rounded-small hover:bg-product-library-display-accent-secondary-fill"
                  : "hover:bg-product-library-selectable-secondary-hover-fill"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <p
                  className={`font-medium text-sm pl-xsmall py-xsmall ${
                    isActive
                      ? "text-product-library-display-primary-idle-tint"
                      : "text-product-library-display-secondary-idle-tint"
                  }`}
                >
                  My Projects
                </p>
                <div className="flex items-center ml-auto shrink-0">
                  <button onClick={(e) => e.preventDefault()} className="w-7 h-7 hidden group-hover:flex justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill rounded-small">
                    <AddIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleExpanded()
                    }}
                    className="w-7 h-7 flex justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill rounded-small"
                  >
                    {isExpanded ? (
                        <TaskSmallArrowDownIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                    ) : (
                        <TaskSmallArrowRightIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                    )}
                  </button>
                </div>
              </>
            )}
          </NavLink>

          {isExpanded && <SidebarMyProjectList />}
        </div>
      </div>

      <div className="flex flex-col gap-small my-2 px-3 mt-auto">
        <button className="px-2.5 py-0.75 flex items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
          <div className="w-6 h-6 flex justify-center items-center mr-1.5 ">
            <AddIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
          </div>
          <span className="text-sm text-product-library-display-secondary-idle-tint font-medium">
            Add a team
          </span>
        </button>
        <button className="px-2.5 py-0.75 flex items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
          <div className="w-6 h-6 flex justify-center items-center mr-1.5">
            <QuestionIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
          </div>
          <span className="text-sm text-product-library-display-secondary-idle-tint font-medium">
            Help & resources
          </span>
        </button>
      </div>
      {openSearchModal && (
        <SearchModalDialog onOpenSearch={() => setOpenSearchModal(false)} />
      )}
    </nav>
  );
};

export default Sidebar;

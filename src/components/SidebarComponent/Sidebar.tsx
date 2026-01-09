import type { MenuNavItem } from "../../types/menu-nav.type.ts";
import AddIcon from "../icons/AddIcon.tsx";
import ArrowDownIcon from "../icons/ArrowDownIcon.tsx";
import QuestionIcon from "../icons/QuestionIcon.tsx";
import { PROJECTS } from "../../constants/routes.constants.ts";
import SidebarNavItem from "./SidebarNavItem.tsx";
import {Fragment, useState} from "react";
import SearchModalDialog from "../SearchModalDialog.tsx";
import { NavLink } from "react-router-dom";
import SmallArrowDownIcon from "../icons/SmallArrowDownIcon.tsx";
import BellIcon from "../icons/BellIcon.tsx";
import CollapseSideBarIcon from "../icons/CollapseSideBarIcon.tsx";
import RightArrowIcon from "../icons/RightArrowIcon.tsx";
import { MENU_NAV_ITEMS } from "../../data/menuNavData.ts";
import SidebarMyProjectsItem from "./SidebarMyProjectsItem.tsx";
import {useGetAllProjects} from "../../hooks/useProjects.ts";
import {useGetUserProfile} from "../../hooks/useUserProfile.ts";

type SidebarProps = {
  open: boolean;
  isMobile: boolean;
  onToggle: () => void;
};
const Sidebar = ({ open, onToggle, isMobile }: SidebarProps) => {
  const {data: projects} = useGetAllProjects()
  const {data: user} = useGetUserProfile()
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [isProjectListOpen, setIsProjectListOpen] = useState(false);
  const handleSearchClick = () => {
    setOpenSearchModal(true);
  };

  const handleToggleProjectList = () => {
    setIsProjectListOpen((prev) => !prev);
  };

  const buttonIconClass =
    "w-8 h-8 flex justify-center items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small";

  return (
    <nav
      className={`flex flex-col bg-product-library-background-base-secondary z-40 transition-all duration-300 ease-out overflow-hidden ${
        isMobile ? "fixed inset-y-0 left-0" : "relative"
      } ${open ? "w-70" : isMobile ? "w-70 -translate-x-full" : "w-0"}`}
    >
      <div className="flex flex-col">
        {/*sidebar header*/}
        <div className="flex justify-between items-center m-medium pl-2">
          <button className="flex items-center py-0.75 -ml-0.75 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
            <div className="rounded-full w-6.5 h-6.5 bg-white -ml-1.5 mr-1.5">
              <img src={user?.avatar_medium} alt={user?.full_name} />
            </div>
            <span className="flex items-center">
              <span className="whitespace-nowrap text-product-library-display-primary-idle-tint overflow-hidden">
                {user?.full_name?.trim().split(" ")[0]}
              </span>
              <SmallArrowDownIcon />
            </span>
          </button>
          <div className="flex items-center gap-xsmall">
            <button className={buttonIconClass}>
              <BellIcon />
            </button>
            <button onClick={onToggle} className={buttonIconClass}>
              <CollapseSideBarIcon />
            </button>
          </div>
        </div>
        <div className="mx-medium mb-small"></div>
        {/*add task modal*/}
        <button className="flex items-center px-2.5 py-0.75 text-product-library-actionable-tertiary-idle-tint hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
          <div className="flex justify-center items-center mr-1.5 pl-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11m-.711-16.5a.75.75 0 1 1 1.5 0v4.789H17.5a.75.75 0 0 1 0 1.5h-4.711V17.5a.75.75 0 0 1-1.5 0V12.79H6.5a.75.75 0 1 1 0-1.5h4.789z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <span className="text-center font-medium text-sm">Add task</span>
        </button>

        {/*menu nav item*/}
        <div className="px-medium py-xsmall flex flex-col gap-large">
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
                  ? "bg-product-library-priorities-p2-secondary-hover-fill rounded-small hover:bg-product-library-priorities-p2-secondary-hover-fill"
                  : "hover:bg-product-library-selectable-secondary-hover-fill"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <p
                  className={`font-medium text-sm pl-xsmall py-xsmall ${
                    isActive
                      ? "text-black"
                      : "text-product-library-display-secondary-idle-tint"
                  }`}
                >
                  My Projects
                </p>
                <div className="flex items-center ml-auto shrink-0">
                  <button className="w-7 h-7 hidden group-hover:flex justify-center items-center hover:bg-product-library-border-idle-tint hover:rounded-small">
                    <AddIcon />
                  </button>
                  <button
                    onClick={handleToggleProjectList}
                    className="w-7 h-7 flex justify-center items-center hover:bg-product-library-border-idle-tint hover:rounded-small"
                  >
                    {isProjectListOpen ? <ArrowDownIcon /> : <RightArrowIcon />}
                  </button>
                </div>
              </>
            )}
          </NavLink>

          {!isProjectListOpen && projects?.results.map(project => (
              <Fragment key={project.id}>
                <SidebarMyProjectsItem project={project}/>
              </Fragment>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-small my-2 px-3 mt-auto">
        <button className="px-2.5 py-0.75 flex items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
          <div className="w-6 h-6 flex justify-center items-center mr-1.5 ">
            <AddIcon />
          </div>
          <span className="text-sm text-product-library-display-secondary-idle-tint font-medium">
            Add a team
          </span>
        </button>
        <button className="px-2.5 py-0.75 flex items-center hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
          <div className="w-6 h-6 flex justify-center items-center mr-1.5">
            <QuestionIcon />
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

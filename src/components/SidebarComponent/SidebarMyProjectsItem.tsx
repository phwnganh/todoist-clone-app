import HashtagIcon from "@/components/icons/HashtagIcon.tsx";
import type { Project } from "@/types/project.type.ts";
import { PROJECT_DETAILS } from "@/constants/routes.constants.ts";
import { NavLink } from "react-router-dom";
import { getProjectColorClass } from "@/helpers/getProjectColorClass.ts";

const SidebarMyProjectsItem = ({ project }: { project: Project }) => {
  return (
    <NavLink
      to={`${PROJECT_DETAILS}/${project.id}`}
      className={({ isActive }) =>
        `flex items-center rounded-small ${
          isActive
            ? "bg-product-library-display-accent-secondary-fill hover:bg-product-library-display-accent-secondary-fill"
            : "hover:bg-product-library-selectable-secondary-hover-fill"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={`p-1.25 flex items-center ${
              isActive
                ? "text-product-library-actionable-tertiary-idle-tint"
                : "text-product-library-display-primary-idle-tint"
            }`}
          >
            <div className="flex justify-center items-center">
              <HashtagIcon
                className={`${getProjectColorClass(project.color)}`}
              />
            </div>
            <div className={`py-0.75 pl-1.25 text-sm`}>{project.name}</div>
          </div>
          <div className="w-7 h-7 flex justify-center items-center ml-auto"></div>
        </>
      )}
    </NavLink>
  );
};

export default SidebarMyProjectsItem;

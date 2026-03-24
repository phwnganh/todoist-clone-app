import MyProjectsMenuButton from "@/components/ui/MyProjectsMenuButton.tsx";
import type { MyProjectMenuToolbar } from "@/types/menu-nav.type.ts";
import {useProjectStore} from "@/stores/project.store.ts";
import type {Project} from "@/types/project.type.ts";
import CustomMenuDropdown from "@/components/ui/CustomMenuDropdown.tsx";

type MyProjectsToolbarDropdownProps = {
  project: Project
};
const MyProjectsToolbarDropdown = ({
  project
}: MyProjectsToolbarDropdownProps) => {
  const {onEditProjectDetail, onDeleteProjectDetail, onCloseProjectDetailToolbar} = useProjectStore()
  const MY_PROJECTS_MENU_TOOLBAR: MyProjectMenuToolbar[] = [
    {
      label: "Add project above",
      onClick: () => {},
    },
    {
      label: "Add project below",
      onClick: () => {},
    },
    "divider",
    {
      label: "Edit",
      onClick: () => {
        console.log("edit");
        onCloseProjectDetailToolbar();
        onEditProjectDetail(project);
      },
    },
    {
      label: "Add to favorites",
      onClick: () => {},
    },
    {
      label: "Duplicate",
      onClick: () => {},
    },
    "divider",
    {
      label: "Archive",
      onClick: () => {},
    },
    {
      label: "Delete",
      danger: true,
      onClick: () => {
        onCloseProjectDetailToolbar();
        onDeleteProjectDetail(project);
      },
    },
  ];

  return (
    <CustomMenuDropdown className={"min-w-70"}>
        {MY_PROJECTS_MENU_TOOLBAR.map((item, index) => {
          if (item === "divider") {
            return (
              <hr
                key={index}
                className="border-t border-t-product-library-divider-tertiary"
              />
            );
          }
          return (
            <MyProjectsMenuButton
              key={item.label}
              label={item.label}
              danger={item.danger}
              onClick={item.onClick}
            />
          );
        })}
    </CustomMenuDropdown>
  );
};

export default MyProjectsToolbarDropdown;

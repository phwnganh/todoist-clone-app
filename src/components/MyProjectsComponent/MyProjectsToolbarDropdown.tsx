import MyProjectsMenuButton from "../ui/MyProjectsMenuButton.tsx";
import type {MyProjectMenuToolbar} from "../../types/menu-nav.type.ts";

type MyProjectsToolbarDropdownProps = {
    handleOpenEditProjectModalDialog: () => void;
    handleOpenDeleteProjectDetail: () => void;
}
const MyProjectsToolbarDropdown = ({handleOpenEditProjectModalDialog, handleOpenDeleteProjectDetail}: MyProjectsToolbarDropdownProps) => {

    const MY_PROJECTS_MENU_TOOLBAR: MyProjectMenuToolbar[] = [
        {
            label: "Add project above",
            onClick: () => {

            }
        },
        {
            label: "Add project below",
            onClick: () => {

            }
        },
        "divider",
        {
            label: "Edit",
            onClick: () => {
                console.log("edit")
                handleOpenEditProjectModalDialog()
            }
        },
        {
            label: "Add to favorites",
            onClick: () => {

            }
        },
        {
            label: "Duplicate",
            onClick: () => {

            }
        },
        "divider",
        {
            label: "Archive",
            onClick: () => {

            }
        },
        {
            label: "Delete",
            danger: true,
            onClick: () => {
                handleOpenDeleteProjectDetail()
            }
        }
    ]

    return (
    <div className="border border-product-library-divider-primary rounded-large shadow-sm mt-1 min-w-70 py-1.5 bg-white overflow-hidden">
      <div className="flex flex-col gap-1">
        {MY_PROJECTS_MENU_TOOLBAR.map((item, index) => {
          if (item === "divider") {
            return (
              <hr key={index} className="border-t border-t-product-library-divider-tertiary" />
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
      </div>
    </div>
  );
};

export default MyProjectsToolbarDropdown;

import {useSectionStore} from "../../stores/section.store";
import {type MySectionMenuToolbar} from "../../types/menu-nav.type";
import EditIcon from "../icons/EditIcon";
import TaskMoveToIcon from "../icons/MoveToTaskIcon";
import TrashIcon from "../icons/TrashIcon";
import MyTasksMenuButton from "../ui/MyTasksMenuButton";
type MySectionsToolbarDropdownProps = {
    sectionId: string | null;
}
const MySectionsToolbarDropdown = ({sectionId}: MySectionsToolbarDropdownProps) => {
    const {onCloseSectionToolbarDropdown, onOpenEditSection, onOpenDeleteSection} = useSectionStore()
    const MY_SECTIONS_MENU_TOOLBAR: MySectionMenuToolbar[] = [
        {
            label: "Edit",
            onClick: () => {
                onCloseSectionToolbarDropdown()
                onOpenEditSection(sectionId)

            },
            icon: <EditIcon/>
        },
        {
            label: "Move to...",
            onClick: () => {

            },
            icon: <TaskMoveToIcon/>
        },
        "divider",
        {
            label: "Delete",
            danger: true,
            onClick: () => {
                onCloseSectionToolbarDropdown()
                onOpenDeleteSection(sectionId)
            },
            icon: (
                <TrashIcon
                    className={"text-product-library-actionable-destructive-idle-fill"}
                />
            ),
        }
    ]
    return (
        <div className="absolute top-full right-0 z-50 border border-product-library-divider-primary rounded-large shadow-sm mt-1 min-w-70 py-1.5 bg-white overflow-hidden">
            <div className={"flex flex-col gap-1"}>
                {MY_SECTIONS_MENU_TOOLBAR.map((item, index) => {
                    if(item === "divider"){
                        return (
                            <hr
                                key={index}
                                className={"border-t-product-library-divider-tertiary"}
                            />
                        )
                    }
                    return (
                        <MyTasksMenuButton
                            key={item.label}
                            label={item.label}
                            onClick={item.onClick}
                            danger={item.danger}
                            icon={item.icon}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default MySectionsToolbarDropdown;
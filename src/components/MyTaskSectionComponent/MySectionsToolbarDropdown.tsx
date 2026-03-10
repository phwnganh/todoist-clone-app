import {useSectionStore} from "@/stores/section.store";
import {type MySectionMenuToolbar} from "@/types/menu-nav.type";
import EditIcon from "@/components/icons/EditIcon";
import TaskMoveToIcon from "@/components/icons/MoveToTaskIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import MyTasksMenuButton from "@/components/ui/MyTasksMenuButton";
import CustomMenuDropdown from "@/components/ui/CustomMenuDropdown.tsx";
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
        <CustomMenuDropdown className={"min-w-70"}>
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
        </CustomMenuDropdown>
    );
};

export default MySectionsToolbarDropdown;
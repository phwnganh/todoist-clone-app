import type {MySectionMenuToolbar} from "@/types/menu-nav.type.ts";
import EditIcon from "@/components/icons/EditIcon.tsx";
import HeartIcon from "@/components/icons/HeartIcon.tsx";
import CopyLinkIcon from "@/components/icons/CopyLinkIcon.tsx";
import TrashIcon from "@/components/icons/TrashIcon.tsx";
import CustomMenuDropdown from "@/components/ui/CustomMenuDropdown.tsx";
import MenuButton from "@/components/ui/MenuButton.tsx";
import {useLabelStore} from "@/stores/label.store.ts";

type MyLabelsToolbarDropdownProps = {
    labelId: string;
}
const MyLabelsToolbarDropdown = ({labelId}: MyLabelsToolbarDropdownProps) => {
    const {onCloseLabelToolbarDropdown, onOpenEditLabelModalDialog, onOpenDeleteLabelModalDialog} = useLabelStore()
    const MY_LABELS_MENU_TOOLBAR: MySectionMenuToolbar[] = [
        {
            label: "Edit",
            icon: <EditIcon className={"text-product-library-display-secondary-idle-tint"}/>,
            onClick: () => {
                onCloseLabelToolbarDropdown()
                onOpenEditLabelModalDialog(labelId)
            }
        },
        {
            label: "Add to favorites",
            icon: <HeartIcon className={"text-product-library-display-secondary-idle-tint"}/>,
            onClick: () => {
                console.log("heart")
            }
        },
        {
            label: "Copy link to label",
            icon: <CopyLinkIcon className={"text-product-library-display-secondary-idle-tint"}/>,
            onClick: () => {
                console.log("copy link")
            }
        },
        "divider",
        {
            label: "Delete",
            icon: <TrashIcon className={"text-product-library-actionable-destructive-idle-fill"}/>,
            onClick: () => {
                onCloseLabelToolbarDropdown()
                onOpenDeleteLabelModalDialog(labelId)
            }
        }
    ]
    return (
        <CustomMenuDropdown className={"min-w-70"}>
            {MY_LABELS_MENU_TOOLBAR.map((item, index) => {
                if(item === "divider"){
                    return (
                        <hr
                            key={index}
                            className={"border-t-product-library-divider-tertiary"}
                        />
                    )
                }
                return (
                    <MenuButton key={item.label} label={item.label} onClick={item.onClick} danger={item.danger} icon={item.icon}/>
                )
            })}
        </CustomMenuDropdown>
    );
};

export default MyLabelsToolbarDropdown;
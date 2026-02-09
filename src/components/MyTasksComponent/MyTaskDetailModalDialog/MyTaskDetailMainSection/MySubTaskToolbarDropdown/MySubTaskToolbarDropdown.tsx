import {useTaskStore} from "../../../../../stores/task.store.ts";
import type {MyTaskMenuToolbar} from "../../../../../types/menu-nav.type.ts";
import TaskAboveIcon from "../../../../icons/TaskBelowIcon.tsx";
import TaskBelowIcon from "../../../../icons/TaskBelowIcon.tsx";
import EditIcon from "../../../../icons/EditIcon.tsx";
import TaskMoveToIcon from "../../../../icons/MoveToTaskIcon.tsx";
import DuplicateIcon from "../../../../icons/TaskDuplicateIcon.tsx";
import TrashIcon from "../../../../icons/TrashIcon.tsx";
import MyTasksMenuButton from "../../../../ui/MyTasksMenuButton.tsx";

const MySubTaskToolbarDropdown = ({taskId}: {taskId: string}) => {
    const {onOpenEditSubTask, onOpenDeleteMyTask, onCloseTaskDetailToolbar} = useTaskStore()
    const MY_TASKS_MENU_TOOLBAR: MyTaskMenuToolbar[] = [
        {
            type: "item",
            label: "Add task above",
            onClick: () => {},
            icon: <TaskAboveIcon />,
        },
        {
            type: "item",
            label: "Add task below",
            onClick: () => {},
            icon: <TaskBelowIcon />,
        },
        {type: "divider"},
        {
            type: "item",
            label: "Edit",
            onClick: () => {
                onCloseTaskDetailToolbar();
                console.log("task id: ", taskId);
                onOpenEditSubTask(taskId);
            },
            icon: <EditIcon />,
        },
        {type: "divider"},
        {
            type: "item",
            label: "Move to...",
            onClick: () => {},
            icon: <TaskMoveToIcon />,
        },
        {
            type: "item",
            label: "Duplicate",
            onClick: () => {},
            icon: <DuplicateIcon />,
        },
        {type: "divider"},
        {
            type: "item",
            label: "Delete",
            danger: true,
            onClick: () => {
                onCloseTaskDetailToolbar()
                onOpenDeleteMyTask(taskId)
            },
            icon: (
                <TrashIcon
                    className={"text-product-library-actionable-destructive-idle-fill"}
                />
            ),
        },
    ];

    return (
        <div
            className={
                "border border-product-library-divider-primary rounded-large shadow-sm mt-1 min-w-70 py-1.5 bg-white overflow-hidden"
            }
        >
            <div className={"flex flex-col gap-1"}>
                {MY_TASKS_MENU_TOOLBAR.map((item, index) => {
                    if (item.type === "divider") {
                        return (
                            <hr
                                key={index}
                                className={"border-t-product-library-divider-tertiary"}
                            />
                        );
                    }
                    else if(item.type === "item") {
                        return (
                            <MyTasksMenuButton
                                key={item.label}
                                label={item.label}
                                onClick={item.onClick}
                                danger={item.danger}
                                icon={item.icon}
                            />
                        );
                    }

                })}
            </div>
        </div>
    );
};

export default MySubTaskToolbarDropdown;
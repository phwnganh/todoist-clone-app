import type { MyTaskMenuToolbar } from "../../types/menu-nav.type.ts";
import TaskAboveIcon from "../icons/TaskBelowIcon.tsx";
import TaskBelowIcon from "../icons/TaskBelowIcon.tsx";
import EditIcon from "../icons/EditIcon.tsx";
import TaskMoveToIcon from "../icons/MoveToTaskIcon.tsx";
import DuplicateIcon from "../icons/TaskDuplicateIcon.tsx";
import { useTaskStore } from "../../stores/task.store.ts";
import TrashIcon from "../icons/TrashIcon.tsx";
import MyTasksMenuButton from "../ui/MyTasksMenuButton.tsx";
const MyTasksToolbarDropdown = ({ taskId }: { taskId: string }) => {
  const { onOpenEditTask, onCloseTaskDetailToolbar, onOpenDeleteMyTask } = useTaskStore();
  const MY_TASKS_MENU_TOOLBAR: MyTaskMenuToolbar[] = [
    {
      label: "Add task above",
      onClick: () => {},
      icon: <TaskAboveIcon />,
    },
    {
      label: "Add task below",
      onClick: () => {},
      icon: <TaskBelowIcon />,
    },
    "divider",
    {
      label: "Edit",
      onClick: () => {
        onCloseTaskDetailToolbar();
        console.log("task id: ", taskId);
        onOpenEditTask(taskId);
      },
      icon: <EditIcon />,
    },
    "divider",
    {
      label: "Move to...",
      onClick: () => {},
      icon: <TaskMoveToIcon />,
    },
    {
      label: "Duplicate",
      onClick: () => {},
      icon: <DuplicateIcon />,
    },
    "divider",
    {
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
          if (item === "divider") {
            return (
              <hr
                key={index}
                className={"border-t-product-library-divider-tertiary"}
              />
            );
          }
          return (
            <MyTasksMenuButton
              key={item.label}
              label={item.label}
              onClick={item.onClick}
              danger={item.danger}
              icon={item.icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyTasksToolbarDropdown;

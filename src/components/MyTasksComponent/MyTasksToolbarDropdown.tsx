import type { MyTaskMenuToolbar } from "../../types/menu-nav.type.ts";
import TaskAboveIcon from "../icons/TaskBelowIcon.tsx";
import TaskBelowIcon from "../icons/TaskBelowIcon.tsx";
import EditIcon from "../icons/EditIcon.tsx";
import TaskMoveToIcon from "../icons/MoveToTaskIcon.tsx";
import DuplicateIcon from "../icons/TaskDuplicateIcon.tsx";
import { useTaskStore } from "../../stores/task.store.ts";
import TrashIcon from "../icons/TrashIcon.tsx";
import MyTasksMenuButton from "../ui/MyTasksMenuButton.tsx";
import CalendarIcon from "../icons/CalendarIcon.tsx";
import TomorrowIcon from "../icons/TomorrowIcon.tsx";
import NextWeekIcon from "../icons/NextWeekIcon.tsx";
import NextWeekendIcon from "../icons/NextWeekendIcon.tsx";
import PriorityIcon from "../icons/PriorityIcon.tsx";
import MenuIcon from "../icons/MenuIcon.tsx";
import type {Task} from "../../types/task.type.ts";
import {useUpdateMyTask} from "../../hooks/useQueryHook/useTasks.ts";
const MyTasksToolbarDropdown = ({ taskId, task }: { taskId: string; task: Task }) => {
  const { onOpenEditTask, onCloseTaskDetailToolbar, onOpenDeleteMyTask } = useTaskStore();

  const {mutate} = useUpdateMyTask()
  const handleSelectPriority = (priority: number) => {
    mutate({
      id: taskId,
      content: task.content,
      priority: priority
    })
  }
  const currentPriority = task.priority;
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
        onOpenEditTask(taskId);
      },
      icon: <EditIcon />,
    },
    {type: "divider"},
    {
      type: "section",
      label: "Date"
    },
    {
      type: "icon-row",
      items: [
        {icon: <CalendarIcon className={"hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}/>},
        {icon: <TomorrowIcon className={"hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}/>},
        {icon: <NextWeekIcon className={"hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}/>},
        {icon: <NextWeekendIcon className={"hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}/>},
        {icon: <MenuIcon className={"hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}/>}
      ]
    },
    {type: "divider"},
    {
      type: "section",
      label: "Priority",
    },
    {
      type: "icon-row",
      items: [
        {icon: <PriorityIcon className={"text-product-library-priorities-p1-primary-idle-tint hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}/>,
        active: currentPriority === 4,
        onClick: () => handleSelectPriority(4)},
        {icon: <PriorityIcon className={"text-product-library-priorities-p2-primary-idle-tint hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}/>,
        active: currentPriority === 3,
        onClick: () => handleSelectPriority(3)},
        {icon: <PriorityIcon className={"text-product-library-priorities-p3-primary-idle-tint hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}/>,
        active: currentPriority === 2,
        onClick: () => handleSelectPriority(2)},
        {icon: <PriorityIcon className={"text-product-library-selectable-primary-unselected-tint hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}/>,
        active: currentPriority === 1,
        onClick: () => handleSelectPriority(1)}
      ]
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
    }
  ];

  return (
    <div
      className={
        "border border-product-library-divider-primary rounded-large shadow-sm mt-1 min-w-70 py-1.5 bg-white overflow-hidden"
      }
    >
      <div className={"flex flex-col gap-1"}>
        {MY_TASKS_MENU_TOOLBAR.map((item, index) => {
          switch (item.type) {
            case "divider":
              return <hr key={index} className="border-t-product-library-divider-tertiary" />

            case "section":
              return (
                  <div key={index} className={"px-3 py-1 text-xs font-medium text-gray-700"}>{item.label}</div>
              )
            case "icon-row":
              return (
                  <div key={index} className={"flex gap-2 px-3 py-1"}>
                    {item.items.map((iconItem, iconIndex) => {
                      const isActive = iconItem.active;
                          return (
                              <button type={"button"} key={iconIndex} onClick={iconItem.onClick}
                                      className={`flex justify-center items-center w-6 h-6 ${isActive && "border border-product-library-divider-primary rounded-small"}`}>{iconItem.icon}</button>
                          )
                        }
                    )}
                  </div>
              )
            case "item":
              return (
                  <MyTasksMenuButton key={item.label} label={item.label} onClick={item.onClick} icon={item.icon}/>
              )
          }
        })}
      </div>
    </div>
  );
};

export default MyTasksToolbarDropdown;

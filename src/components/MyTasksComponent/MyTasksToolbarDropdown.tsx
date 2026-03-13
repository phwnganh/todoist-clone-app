import type { MyTaskMenuToolbar } from "@/types/menu-nav.type.ts";
import TaskAboveIcon from "@/components/icons/TaskBelowIcon.tsx";
import TaskBelowIcon from "@/components/icons/TaskBelowIcon.tsx";
import EditIcon from "@/components/icons/EditIcon.tsx";
import TaskMoveToIcon from "@/components/icons/MoveToTaskIcon.tsx";
import DuplicateIcon from "@/components/icons/TaskDuplicateIcon.tsx";
import { useTaskStore } from "@/stores/task.store.ts";
import TrashIcon from "@/components/icons/TrashIcon.tsx";
import MyTasksMenuButton from "@/components/ui/MyTasksMenuButton.tsx";
import CalendarIcon from "@/components/icons/CalendarIcon.tsx";
import TomorrowIcon from "@/components/icons/TomorrowIcon.tsx";
import NextWeekIcon from "@/components/icons/NextWeekIcon.tsx";
import NextWeekendIcon from "@/components/icons/NextWeekendIcon.tsx";
import PriorityIcon from "@/components/icons/PriorityIcon.tsx";
import MenuIcon from "@/components/icons/MenuIcon.tsx";
import type {Due, Task} from "@/types/task.type.ts";
import {useUpdateMyTask} from "@/hooks/useQueryHook/useTasks.ts";
import {buildDue, getNextWeek, getNextWeekend, getToday, getTomorrow} from "@/helpers/formateDate.ts";
import {isSameDay} from "date-fns";
import NoDateIcon from "@/components/icons/NoDateIcon.tsx";
import CustomMenuDropdown from "@/components/ui/CustomMenuDropdown.tsx";
const MyTasksToolbarDropdown = ({ taskId, task }: { taskId: string; task: Task }) => {
  const { onOpenEditTask, onCloseTaskDetailToolbar, onOpenDeleteMyTask } = useTaskStore();

  const today = getToday();
  const tomorrow = getTomorrow()
  const nextWeek = getNextWeek()
  const nextWeekend = getNextWeekend()
  const {mutate} = useUpdateMyTask()
  const handleSelectPriority = (priority: number) => {
    mutate({
      id: taskId,
      content: task.content,
      priority: priority
    })
  }

  const handleSelectDueDate = (due?: Due | null) => {
    mutate({
      id: taskId,
      content: task.content,
      due: due
    })
  }

  const handleRemoveDueDate = () => {
    mutate({
      id: taskId,
      content: task.content,
      due: null
    })
  }

  const currentPriority = task.priority;
  const currentDue = task.due;
  const currentDueDate = currentDue?.date
  const MY_TASKS_MENU_TOOLBAR: MyTaskMenuToolbar[] = [
    {
      type: "item",
      label: "Add task above",
      onClick: () => {},
      icon: <TaskAboveIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>,
    },
    {
      type: "item",
      label: "Add task below",
      onClick: () => {},
      icon: <TaskBelowIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>,
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
      icon: <EditIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>,
    },
    {type: "divider"},
    {
      type: "section",
      label: "Date"
    },
    {
      type: "icon-row",
      items: [
        {icon: <CalendarIcon className={"hover:bg-product-library-selectable-secondary-hover-fill rounded-small text-product-library-actionable-quaternary-idle-tint"}/>,
          active: currentDueDate && isSameDay(new Date(currentDueDate), today),
          onClick: () => handleSelectDueDate(buildDue(today))
        },
        {icon: <TomorrowIcon className={"hover:bg-product-library-selectable-secondary-hover-fill rounded-small text-product-library-actionable-quaternary-idle-tint"}/>,
        active: currentDueDate && isSameDay(new Date(currentDueDate), tomorrow),
          onClick: () => handleSelectDueDate(buildDue(tomorrow))},
        {icon: <NextWeekIcon className={"hover:bg-product-library-selectable-secondary-hover-fill rounded-small text-product-library-actionable-quaternary-idle-tint"}/>,
        active: currentDueDate && isSameDay(new Date(currentDueDate), nextWeek),
          onClick: () => handleSelectDueDate(buildDue(nextWeek))},
        {icon: <NextWeekendIcon className={"hover:bg-product-library-selectable-secondary-hover-fill rounded-small text-product-library-actionable-quaternary-idle-tint"}/>,
        active: currentDueDate && isSameDay(new Date(currentDueDate), nextWeekend),
          onClick: () => handleSelectDueDate(buildDue(nextWeekend))},
          ...(currentDue ? [{
            icon: <NoDateIcon className={"hover:bg-product-library-selectable-secondary-hover-fill rounded-small text-product-library-actionable-quaternary-idle-tint"}/>,
            onClick: handleRemoveDueDate
          }]: []),
        {icon: <MenuIcon className={"hover:bg-product-library-selectable-secondary-hover-fill rounded-small text-product-library-actionable-quaternary-idle-tint"}/>}
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
      icon: <TaskMoveToIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>,
    },
    {
      type: "item",
      label: "Duplicate",
      onClick: () => {},
      icon: <DuplicateIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>,
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
      <CustomMenuDropdown className={"min-w-70"}>
        {MY_TASKS_MENU_TOOLBAR.map((item, index) => {
          switch (item.type) {
            case "divider":
              return <hr key={index} className="border-t-product-library-divider-tertiary" />

            case "section":
              return (
                  <div key={index} className={"px-3 py-1 text-xs font-medium text-product-library-display-primary-idle-tint"}>{item.label}</div>
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
      </CustomMenuDropdown>
  );
};

export default MyTasksToolbarDropdown;

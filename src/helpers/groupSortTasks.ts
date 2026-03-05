import type { Task } from "../types/task.type.ts";
import type {
  GroupedBy,
  SortedBy,
  SortOrder,
  TaskGroup,
  ViewOptionsPayload,
} from "../types/viewOptions.type.ts";
import {extractDateFromList, extractLabelsFromList, extractPrioritiesFromList} from "./extractCriteriaFromFiltereds.ts";
import {
  addDays,
  addMonths,
  compareAsc,
  compareDesc,
  format,
  isBefore,
  isToday,
  isTomorrow,
  parseISO, startOfDay,
  startOfMonth
} from "date-fns";
import {priorityFilterData} from "../data/myTaskFilter.data";

export const parseFilterQuery = (query?: string | null): string[] => {
  if (!query) return [];
  // split each criteria by & comma
  return query
    .split("&")
    .map((q) => q.trim())
    .filter(Boolean);
};

export const buildFilterQuery = (criteria: string[]): string | null => {
  if (criteria.length === 0) return null;
  const labelCriteria = criteria.filter((c) => c.startsWith("@"));
  const otherCriteria = criteria.filter((c) => !c.startsWith("@"));

  let finalCriteria: string[] = [];

  if (labelCriteria.length === 1) {
    finalCriteria.push(labelCriteria[0]);
  }

  if (labelCriteria.length > 1) {
    finalCriteria.push(`(${labelCriteria.join(" | ")})`);
  }

  finalCriteria = [...finalCriteria, ...otherCriteria];
  return finalCriteria.join(" & ");
};

export const buildDateFilterQuery = (key: string | null): string | null => {
  switch (key){
    case "all":
      return null;
    // case "today":
    //   return "overdue";
    case "this-week":
      return "due before: next week";
    // case "next-7-days":
    //   return "7 days";
    case "this-month":
      return "due before: first day";
    // case "next-30-days":
    //   return "30 days";
    case "no-date":
      return "no date";
    default:
      return null;
  }
}

const getDateTitle = (date: Date) => {
  const formattedDate = format(date, "d MMM")
  const weekday = format(date, "EEEE")

  if(isToday(date)){
    return `${formattedDate} - Today - ${weekday}`;
  }
  if(isTomorrow(date)){
    return `${formattedDate} - Tomorrow - ${weekday}`;
  }
  return `${formattedDate} - ${weekday}`;
}

const getDateGroupKey = (date: Date) => {
  return format(date, "yyyy-MM-dd")
}
export const filterTasks = (tasks: Task[], view?: ViewOptionsPayload) => {
  let res = [...tasks]

  if(!view?.show_completed_tasks){
    res = res.filter(task => !task.checked)
  }

  if(!view?.filtered_by) return res;

  const criteria = parseFilterQuery(view.filtered_by)

  // priority
  const priorities = extractPrioritiesFromList(criteria)
  if(priorities.length > 0){
    const priorityNumbers: number[] = []

    priorities.forEach(key => {
      const found = priorityFilterData.find(p => p.key === key);
      if(found){
        priorityNumbers.push(found.value)
      }
    })
    res = res.filter(task => priorityNumbers.includes(task.priority ?? 0))
  }

  // label
  const labels = extractLabelsFromList(criteria)
  if(labels.length > 0){
    const cleanedLabels = labels.map(l => l.replace("@", ""))
    res = res.filter(task => task.labels?.some(label => cleanedLabels.includes(label)))
  }

  // date
  const dateQuery = extractDateFromList(criteria)
  if(dateQuery){
    const now = new Date()
    if(dateQuery === "no date"){
      res = res.filter(task => !task.due?.date)
    }

    if(dateQuery === "due before: next week"){
      const nextWeek = addDays(now, 7)

      res = res.filter(task => {
        if(!task.due?.date) return false;
        return isBefore(parseISO(task.due.date), nextWeek)
      })
    }

    if(dateQuery === "due before: first day"){
      const firstDayNextMonth = startOfMonth(addMonths(now, 1))
      res = res.filter(task => {
        if(!task.due?.date) return false;
        return isBefore(parseISO(task.due.date), firstDayNextMonth)
      })
    }
  }
  return res
}
export const sortTasks = (
  tasks: Task[],
  sortedBy?: SortedBy | null,
  order?: SortOrder,
): Task[] => {
  if (!sortedBy) return tasks;

  const compare = order === "DESC" ? compareDesc : compareAsc

  return [...tasks].sort((a, b) => {
    switch (sortedBy) {
      case "ALPHABETICALLY":
        return order === "ASC" ? a.content.localeCompare(b.content) : b.content.localeCompare(a.content)
      case "ADDED_DATE":
        return compare(parseISO(a.added_at ?? ""), parseISO(b.added_at ?? ""))
      case "DUE_DATE":
        if(!a.due?.date) return 1;
        if(!b.due?.date) return -1;

        return compare(parseISO(a.due.date), parseISO(b.due.date))
      case "PRIORITY":
        return order === "ASC" ? (a.priority ?? 0) - (b.priority ?? 0) : (b.priority ?? 0) - (a.priority ?? 0)
      default:
        return 0;
    }
  });
};

export const groupTasks = (
  tasks: Task[],
  grouped_by?: GroupedBy,
): TaskGroup[] => {
  if (!grouped_by)
    return [
      {
        title: "",
        tasks,
      },
    ];
  const groups: Record<string, Task[]> = {};

  tasks.forEach((task) => {
    let key = "";
    switch (grouped_by) {
      case "PRIORITY": {
        const priority = priorityFilterData.find(p => p.value === task.priority);
        key = priority ? priority.label : ""
        break;
      }
      case "DUE_DATE": {
        if (!task.due?.date) {
          key = "NO_DATE";
          break;
        }
        const date = parseISO(task.due.date);
        const today = startOfDay(new Date())

        if (isBefore(date, today)) {
          key = "OVERDUE"
        } else {
          key = getDateGroupKey(date);
        }
        break;
      }
      case "ADDED_DATE":
      {
        if(!task.added_at){
          key = "NO_DATE";
          break;
        }
        const date = new Date(task.added_at);
        key = getDateGroupKey(date);
      }
        break;

      case "LABEL":
        key = task.labels?.[0] ?? "No label";
        break;
    }

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(task);
  });

  const res = Object.entries(groups).map(([key, tasks]) => {
    let title = key;

    if(grouped_by === "DUE_DATE" || grouped_by === "ADDED_DATE"){
      if(key === "OVERDUE"){
        title = "Overdue";
      }else if(key === "NO_DATE"){
        title = "No date";
      }else{
        title = getDateTitle(parseISO(key))
      }
    }
    return {
      key,
      title,
      tasks
    }
  });

  if(grouped_by === "PRIORITY"){
    res.sort((a, b) => {
      const priorityA = priorityFilterData.find(p => p.label === a.title)
      const priorityB = priorityFilterData.find(p => p.label === b.title)

      const valueA = priorityA?.value ?? 0
      const valueB = priorityB?.value ?? 0

      return valueB - valueA
    })
  }

  if(grouped_by === "DUE_DATE" || grouped_by === "ADDED_DATE"){
    res.sort((a, b) => {
      if(a.key === "OVERDUE") return -1;
      if(b.key === "OVERDUE") return 1;

      if(a.key === "NO_DATE") return 1;
      if(b.key === "NO_DATE") return -1;

      const dateA = parseISO(a.key)
      const dateB = parseISO(b.key)

      return dateA.getTime() - dateB.getTime();
    })
  }
  return res;
};

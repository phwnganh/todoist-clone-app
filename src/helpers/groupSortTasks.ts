import type { Task } from "../types/task.type.ts";
import type {
  GroupedBy,
  SortedBy,
  SortOrder,
  TaskGroup,
  ViewOptionsPayload,
} from "../types/viewOptions.type.ts";

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
export const filterTasks = (tasks: Task[], view?: ViewOptionsPayload) => {
  let res = [...tasks];
  if (!view?.show_completed_tasks) {
    res = res.filter((task) => !task.checked);
  }
  if (view?.filtered_by) {
    const filteredValue = view.filtered_by;

    if (/^p[1-4]$/.test(filteredValue)) {
      const priorityNumber = Number(filteredValue.replace("p", ""));

      res = res.filter((task) => task.priority === priorityNumber);
    } else {
      res = res.filter((task) => task.labels?.includes(filteredValue));
    }
  }
  return res;
};
export const sortTasks = (
  tasks: Task[],
  sortedBy?: SortedBy | null,
  order?: SortOrder,
): Task[] => {
  if (!sortedBy) return tasks;

  const multiplier = order === "DESC" ? -1 : 1;

  return [...tasks].sort((a, b) => {
    let res = 0;
    switch (sortedBy) {
      case "ALPHABETICALLY":
        res = a.content.localeCompare(b.content);
        break;
      case "ADDED_DATE":
        res =
          new Date(a.added_at ?? 0).getTime() -
          new Date(b.added_at ?? 0).getTime();
        break;
      case "DUE_DATE":
        res =
          new Date(a.due?.date ?? 0).getTime() -
          new Date(b.due?.date ?? 0).getTime();
        break;
      case "PRIORITY":
        res = (a.priority ?? 0) - (b.priority ?? 0);
        break;
      case "LABEL":
        res = (a.labels?.[0] ?? "").localeCompare(b.labels?.[0] ?? "");
        break;
    }
    return res * multiplier;
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
      case "PRIORITY":
        key = `Priority ${task.priority}`;
        break;
      case "DUE_DATE":
        key = task.due?.date ?? "No date";
        break;
      case "ADDED_DATE":
        key = task.added_at ? new Date(task.added_at).toDateString() : "";
        break;
      case "DEADLINE":
        key = task.deadline?.property1 ?? "No deadline";
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

  return Object.entries(groups).map(([title, tasks]) => ({
    title,
    tasks,
  }));
};

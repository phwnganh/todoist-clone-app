import {format, isBefore, isToday, isTomorrow, parseISO, startOfDay} from "date-fns";
import type {Task} from "@/types/task.type.ts";
import type {GroupedBy, TaskGroup} from "@/types/viewOptions.type.ts";
import {priorityFilterData} from "@/data/myTaskFilter.data.ts";

export const getDateTitle = (date: Date) => {
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

export const getDateGroupKey = (date: Date) => {
    return format(date, "yyyy-MM-dd")
}

export const getGroupKeys = (task: Task, groupedBy: GroupedBy): string[] => {
    switch (groupedBy) {
        case "PRIORITY": {
            const priority = priorityFilterData.find(p => p.value === task.priority);
            return [priority?.label ?? ""]
        }
        case "DUE_DATE": {
            if (!task.due?.date) return ["NO_DATE"]
            const date = parseISO(task.due.date);
            const today = startOfDay(new Date())

            if (isBefore(date, today)) return ["OVERDUE"];
            return [getDateGroupKey(date)]
        }
        case "ADDED_DATE": {
            if (!task.added_at) return ["NO_DATE"]
            const date = new Date(task.added_at);
            return [getDateGroupKey(date)]
        }

        case "LABEL":
        {
            return task.labels?.length ? task.labels : ["No label"]
        }
        default:
            return [""]
    }
}

export const getGroupsTitle = (key: string, groupedBy: GroupedBy) => {
    if(groupedBy === "DUE_DATE" || groupedBy === "ADDED_DATE"){
        if(key === "OVERDUE"){
            return "Overdue"
        }else if(key === "NO_DATE"){
            return "No date"
        }

        return getDateTitle(parseISO(key))
    }
    return key
}

export const sortGroups = (groups: TaskGroup[], groupBy: GroupedBy) => {
    if(groupBy === "PRIORITY"){
        return [...groups].sort((a, b) => {
            const priorityA = priorityFilterData.find(p => p.label === a.title)?.value ?? 0
            const priorityB = priorityFilterData.find(p => p.label === b.title)?.value ?? 0
            return priorityB - priorityA
        })
    }

    if(groupBy === "DUE_DATE" || groupBy === "ADDED_DATE"){
        return [...groups].sort((a, b) => {
            if(a.key === "OVERDUE") return -1;
            if(b.key === "OVERDUE") return 1;

            if(a.key === "NO_DATE") return 1;
            if(b.key === "NO_DATE") return -1;

            const dateA = parseISO(a.key)
            const dateB = parseISO(b.key)

            return dateA.getTime() - dateB.getTime();
        })
    }

    if(groupBy === "LABEL"){
        return [...groups].sort((a, b) => {
            if(a.key === "No label") return 1;
            if(b.key === "No label") return -1;

            return a.key.localeCompare(b.key)
        })
    }
    return groups;
}
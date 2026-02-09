import type {Due} from "../types/task.type.ts";
import {
    format,
    addDays,
    nextMonday,
    nextSaturday,
    parseISO,
    isToday,
    isTomorrow,
    startOfWeek,
    addWeeks,
    isWeekend, isPast
} from 'date-fns'
import type {DueCategory} from "../types/menu-nav.type.ts";
export const formatWeekday = (date: Date) => {
    return format(date, "EEE")
}

export const formatFullDate = (date: Date) => {
    return format(date, "EEE d MMM")
}

export const getToday = () => {
    return new Date();
}

export const getTomorrow = () => {
    const d = new Date();
    return addDays(d, 1)
}

export const getNextWeek = () => {
    const d = new Date();
    return nextMonday(d)
}

export const getNextWeekend = () => {
    const d = new Date();
    return nextSaturday(addDays(d, 7))
}

export const formatOnlyDate = (date: Date) => {
    return format(date, "yyyy-MM-dd")
}

export const formatChipDate = (dateOnly: string) => {
    return format(new Date(dateOnly), "MMM d")
}

export const formatDueString = (date: Date) => {
    return format(date, "d MMM")
}

export const buildDue  = (date: Date): Due => ({
    date: formatOnlyDate(date),
    string: formatDueString(date),
    timezone: null
})

export const getDueCategory = (dueDate?: string | null): DueCategory => {
    if(!dueDate) return ""
    const date = parseISO(dueDate)
    const now = new Date()

    if(isToday(date)) return "today";
    if(isTomorrow(date)) return "tomorrow";
    if(isPast(date) && !isToday(date)) return "overdue"

    const nextWeekStart = startOfWeek(addWeeks(now, 1), {
        weekStartsOn: 1
    });

    const nextWeekEnd = addWeeks(nextWeekStart, 1)
    const isInNextWeek = date >= nextWeekStart && date < nextWeekEnd
    if(isInNextWeek && isWeekend(date)){
        return "nextWeekend"
    }
    if(isInNextWeek){
        return "nextWeek"
    }
    return ""
}
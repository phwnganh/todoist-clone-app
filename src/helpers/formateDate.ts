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
    isWeekend, isPast, startOfDay,
} from 'date-fns'
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

export const getDueInfo = (due?: string | null) => {
    if(!due){
        return {category: "", label: null}
    }

    const date = startOfDay(parseISO(due))
    const today = startOfDay(new Date())

    if(isToday(date)){
        return {
            category: "today",
            label: "Today"
        }
    }

    if(isTomorrow(date)){
        return {
            category: "tomorrow",
            label: "Tomorrow"
        }
    }

    if(isPast(date)){
        return {
            category: "overdue",
            label: format(date, "d MMM")
        }
    }

    const start = addDays(today, 2)
    const end = addDays(today, 7)

    if(date >= start && date <= end){
        const nextWeekStart = startOfWeek(addWeeks(today, 1), {
            weekStartsOn: 1
        })
        const nextWeekEnd = addDays(nextWeekStart, 7)

        const isNextWeekend = date >= nextWeekStart && date < nextWeekEnd && isWeekend(date)

        if(isNextWeekend){
            return {
                category: "nextWeekend",
                label: format(date, "EEEE")
            }
        }

        return {
            category: "nextWeek",
            label: format(date, "EEEE")
        }
    }
    return {
        category: "",
        label: format(date, "d MMM")
    }
}
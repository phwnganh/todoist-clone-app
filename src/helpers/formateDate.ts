import type {Due} from "../types/task.type.ts";
import {format, addDays, nextMonday, nextSaturday} from 'date-fns'
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
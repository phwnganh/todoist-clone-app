import {MONTH, WEEKDAY} from "../constants/time.constants.ts";

export const formatWeekday = (date: Date) => {
    return WEEKDAY[date.getDay()];
}

export const formatFullDate = (date: Date) => {
    return `${formatWeekday(date)} ${date.getDate()} ${MONTH[date.getMonth()]}`;
}

export const getToday = () => {
    return new Date();
}

export const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
}

export const getNextWeek = () => {
    const d = new Date();
    const day = d.getDay();
    const diffToNextMonday = (8 - day) % 7 || 7;
    d.setDate(d.getDate() + diffToNextMonday);
    return d;
}

export const getNextWeekend = () => {
    const d = new Date();
    const day = d.getDay();
    const diffToThisSaturday = (6 - day + 7) % 7;
    const diffToNextSaturday = diffToThisSaturday + 7;
    d.setDate(d.getDate() + diffToNextSaturday);
    return d;
}

export const formatOnlyDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const formatChipDate = (dateOnly: string) => {
    const [year, month, day] = dateOnly.split("-").map(Number);
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short"
    })
}
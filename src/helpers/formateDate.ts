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
    const diffToNextSaturday = (13 - day) % 7 || 7;
    d.setDate(d.getDate() + diffToNextSaturday);
    return d;
}
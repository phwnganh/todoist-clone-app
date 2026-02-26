import {
    addDays, addWeeks, isValid,
    nextFriday,
    nextMonday,
    nextSaturday,
    nextSunday,
    nextThursday,
    nextTuesday,
    nextWednesday, parse, startOfWeek
} from "date-fns";

export function dateSuggestions(keyword: string){
    const today = new Date()
    const trimmedKeyword = keyword.toLowerCase().trim()

    const results = new Map<string, Date>()
    // if(trimmedKeyword.includes("today")){
    //     results.push(today)
    // }
    //
    // if(trimmedKeyword.includes("tom")){
    //     results.push(addDays(today, 1))
    // }
    //
    // if(trimmedKeyword.includes("next week")){
    //     const startNextWeek = addWeeks(startOfWeek(today, {weekStartsOn: 1}), 1)
    //     results.push(startNextWeek)
    // }
    //
    // if(trimmedKeyword.includes("next weekend")){
    //     const startNextWeek = addWeeks(startOfWeek(today, {weekStartsOn: 1}), 1)
    //     const saturdayNextWeek = addDays(startNextWeek, 5)
    //     results.push(saturdayNextWeek)
    // }
    //
    // if(trimmedKeyword.includes("mon")){
    //     results.push(nextMonday(today))
    // }
    // if(trimmedKeyword.includes("tue")){
    //     results.push(nextTuesday(today))
    // }
    // if(trimmedKeyword.includes("wed")){
    //     results.push(nextWednesday(today))
    // }
    //
    // if(trimmedKeyword.includes("thu")){
    //     results.push(nextThursday(today))
    // }
    //
    // if(trimmedKeyword.includes("fri")){
    //     results.push(nextFriday(today))
    // }
    //
    // if(trimmedKeyword.includes("sat")){
    //     results.push(nextSaturday(today))
    // }
    //
    // if(trimmedKeyword.includes("sun")){
    //     results.push(nextSunday(today))
    // }
    //
    // const parsed = parse(trimmedKeyword, "d MMM", today)
    // if(isValid(parsed)){
    //     results.push(parsed)
    // }
    //
    // if(trimmedKeyword.startsWith("in ")){
    //     const number = parseInt(trimmedKeyword.replace("in ", ""))
    //     if(!isNaN(number)){
    //         results.push(addDays(today, number))
    //     }
    // }

    const pushDate = (date: Date) => {
        results.set(date.toISOString(), date)
    }

    if(trimmedKeyword === "today") pushDate(today)
    if(trimmedKeyword === "tomorrow" || trimmedKeyword === "tom") pushDate(addDays(today, 1))

    const inMatchedDays = trimmedKeyword.match(/^in\s+(\d+)/)
    if(inMatchedDays){
        const days = parseInt(inMatchedDays[1])
        pushDate(addDays(today, days))
    }

    if(trimmedKeyword === "next week"){
        const nextWeekStart = addWeeks(startOfWeek(today, {weekStartsOn: 1}), 1)
        pushDate(nextWeekStart)
    }

    if(trimmedKeyword === "next weekend"){
        const nextWeekStart = addWeeks(startOfWeek(today, {weekStartsOn: 1}), 1)
        pushDate(addDays(nextWeekStart, 5))
    }

    const nextWeekdayMap: Record<string, (d: Date) => Date> = {
        "next mon": nextMonday,
        "next tue": nextTuesday,
        "next wed": nextWednesday,
        "next thu": nextThursday,
        "next fri": nextFriday,
        "next sat": nextSaturday,
        "next sun": nextSunday
    }

    Object.entries(nextWeekdayMap).forEach(([key, fn]) => {
        if(trimmedKeyword === key) pushDate(fn(today))
    })

    const weekdayMap: Record<string, (d: Date) => Date> = {
        mon: nextMonday,
        tue: nextTuesday,
        wed: nextWednesday,
        thu: nextThursday,
        fri: nextFriday,
        sat: nextSaturday,
        sun: nextSunday,
    }

    Object.entries(weekdayMap).forEach(([key, fn]) => {
        if(trimmedKeyword === key) pushDate(fn(today))
    })

    const parsedTextMonth = parse(trimmedKeyword, "d MMM", today)
    if(isValid(parsedTextMonth)) pushDate(parsedTextMonth)

    const parsedSlash = parse(trimmedKeyword, "d/MM", today)
    if(isValid(parsedSlash)) pushDate(parsedSlash)
    return Array.from(results.values())
}
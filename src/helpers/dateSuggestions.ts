import {
    addDays, addWeeks, isValid, nextFriday, nextMonday, nextSaturday, nextSunday,
    nextThursday, nextTuesday, nextWednesday, parse, startOfWeek
} from "date-fns";

export function dateSuggestions(keyword: string){
    const today = new Date()
    const trimmedKeyword = keyword.toLowerCase().trim()

    const results: Date[] = []

    const addResult = (date: Date) => {
        results.push(date);
    }

    if(trimmedKeyword === "today") addResult(today)
    if(trimmedKeyword === "tomorrow" || trimmedKeyword === "tom") addResult(addDays(today, 1))

    const inMatchedDays = trimmedKeyword.match(/^in\s+(\d+)$/)
    if(inMatchedDays){
        const days = parseInt(inMatchedDays[1])
        addResult(addDays(today, days))
    }

    const startNextWeek = addWeeks(startOfWeek(today, {weekStartsOn: 1}), 1)
    if(trimmedKeyword === "next week"){
        addResult(startNextWeek)
    }

    if(trimmedKeyword === "next weekend"){
        addResult(addDays(startNextWeek, 5))
    }

    const weekdays: Record<string, (d: Date) => Date> = {
        mon: nextMonday,
        tue: nextTuesday,
        wed: nextWednesday,
        thu: nextThursday,
        fri: nextFriday,
        sat: nextSaturday,
        sun: nextSunday,
    }

    if(weekdays[trimmedKeyword]){
        addResult(weekdays[trimmedKeyword](today))
    }

    if(trimmedKeyword.startsWith("next ")){
        const day = trimmedKeyword.replace("next ", "")
        const fn = weekdays[day]
        if(fn){
            const startFirstNextWeek = fn(today)
            const secondNextWeek = addWeeks(startFirstNextWeek, 1)
            addResult(secondNextWeek)
        }
    }

    const parsedTextMonth = parse(trimmedKeyword, "d MMM", today)
    if(isValid(parsedTextMonth)){
        addResult(parsedTextMonth)
    }

    const parsedSlash = parse(trimmedKeyword, "d/MM", today)
    if(isValid(parsedSlash)){
        addResult(parsedSlash)
    }

    return results
}
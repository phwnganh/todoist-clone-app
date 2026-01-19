import {hashtagColors} from "../data/color.data.ts";

export const getProjectColorClass = (colorValue?: string) => {
    const color = hashtagColors.find(color => color.value === colorValue)
    if(!color){
        return ""
    }
    return color.colorVar
}
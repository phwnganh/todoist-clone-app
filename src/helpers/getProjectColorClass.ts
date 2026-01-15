import {hashtagColors} from "../data/colorData.ts";

export const getProjectColorClass = (colorValue: string) => {
    const color = hashtagColors.find(color => color.value === colorValue)
    if(!color){
        return ""
    }
    return color.colorVar
}
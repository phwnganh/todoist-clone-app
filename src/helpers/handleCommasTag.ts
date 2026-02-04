import type {Label} from "../types/label.type.ts";

export const insertLabelCommasFirst = (content: string) => {
    if(content.endsWith("@")) return content;
    return content + "@";
}

export const removeLabelCommasFirst = (content: string) => {
    if(!content.endsWith("@")) return content;
    return content.slice(0, -1);
}

export const getLabelKeyword = (content: string) => {
    const index = content.lastIndexOf("@");
    if(index === -1) return ""
    return content.slice(index + 1);
}

export const shouldShowLabel = (label: Label, selectedLabels: Label[], keyword: string) => {
    if(selectedLabels.some(l => l.id === label.id)) return false;
    else if(keyword && !label.name.toLowerCase().includes(keyword.toLowerCase())) return false;
    return true;
}
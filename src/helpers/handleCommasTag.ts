import type {Label} from "@/types/label.type.ts";

export const insertLabelCommasFirst = (content: string) => {
    if(content.endsWith("@")) return content;
    return content + "@";
}

export const removeLabelCommasFirst = (content: string) => {
    return content.replace(/@[^@]*$/, "").trim()
}

export const getLabelKeyword = (content: string) => {
    const match = content.match(/@([^@]*)$/)
    return match ? match[1].trim() : null;
}

export const shouldShowLabel = (label: Label, selectedLabels: Label[], keyword: string) => {
    if(selectedLabels.some(l => l.id === label.id)) return false;
    else if(keyword && !label.name.toLowerCase().includes(keyword.toLowerCase())) return false;
    return true;
}
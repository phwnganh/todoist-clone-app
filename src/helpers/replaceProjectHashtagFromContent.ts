import type {Project} from "../types/project.type.ts";

export const replaceProjectHashtagFromContent = (content: string, oldProject?: Project | null) => {
    if(!oldProject) return content.trim();

    const escapedName = oldProject.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")

    const regex = new RegExp(`\\s*#${escapedName}`, "g")
    return content.replace(regex, "").replace(/\s+/g, " ").trim()
}
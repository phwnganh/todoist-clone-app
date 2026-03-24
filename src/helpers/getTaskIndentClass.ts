import {TASK_INDENTS} from "@/constants/taskIndent.constants.ts";

export const getTaskIndentClass = (level: number) => TASK_INDENTS[level] ?? TASK_INDENTS[TASK_INDENTS.length - 1];
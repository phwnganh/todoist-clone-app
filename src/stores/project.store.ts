import type {Project} from "../types/project.type.ts";
import {create} from "zustand/react";

type ProjectState = {
    projects: Project[];
    projectId: string;
    setProjectId: (id: string) => void;
    reset: () => void;
}

export const useProjectStore = create<ProjectState>(set => ({
    projects: [],
    projectId: "",
    setProjectId: (projectId) => set({projectId: projectId}),
    reset: () => set({projects: []})
}))
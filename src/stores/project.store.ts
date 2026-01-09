import type {Project} from "../types/project.type.ts";
import {create} from "zustand/react";

type ProjectState = {
    projects: Project[];
    createMyProject: (project: Project) => void;
    reset: () => void;
}

export const useProjectStore = create<ProjectState>(set => ({
    projects: [],
    createMyProject: (payload) => set((state) => ({
        projects: [...state.projects, payload],
    })),
    reset: () => set({projects: []})
}))
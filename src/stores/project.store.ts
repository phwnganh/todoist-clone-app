import {create} from "zustand/react";
import type {Project} from "../types/project.type.ts";

type ProjectState = {
    projectId: string;
    setProjectId: (id: string) => void;
    openProjectDetailToolbar: string | null;
    editProjectDetail: Project | null;
    deleteProjectDetail: Project | null;
    onOpenProjectDetailToolbar: (id: string) => void;
    onCloseProjectDetailToolbar: () => void;
    onEditProjectDetail: (project: Project) => void;
    onCloseEditProjectDetail: () => void;
    onDeleteProjectDetail: (project: Project) => void;
    onCloseDeleteProjectDetail: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
    projectId: "",
    setProjectId: (projectId) => set({projectId: projectId}),
    openProjectDetailToolbar: null,
    editProjectDetail: null,
    deleteProjectDetail: null,
    onOpenProjectDetailToolbar: (id) => set({openProjectDetailToolbar: id}),
    onCloseProjectDetailToolbar: () => set({openProjectDetailToolbar: null}),
    onEditProjectDetail: (project) => set({editProjectDetail: project}),
    onCloseEditProjectDetail: () => set({editProjectDetail: null}),
    onDeleteProjectDetail: (project) => set({deleteProjectDetail: project}),
    onCloseDeleteProjectDetail: () => set({deleteProjectDetail: null}),
}))
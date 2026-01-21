import {create} from "zustand/react";

type ProjectState = {
    projectId: string;
    setProjectId: (id: string) => void;
    openProjectDetailToolbar: string | null;
    editProjectDetail: string | null;
    deleteProjectDetail: string | null;
    onOpenProjectDetailToolbar: (id: string) => void;
    onCloseProjectDetailToolbar: () => void;
    onEditProjectDetail: (id: string) => void;
    onCloseEditProjectDetail: () => void;
    onDeleteProjectDetail: (id: string) => void;
    onCloseDeleteProjectDetail: () => void;
}

export const useProjectStore = create<ProjectState>(set => ({
    projectId: "",
    setProjectId: (projectId) => set({projectId: projectId}),
    openProjectDetailToolbar: null,
    editProjectDetail: null,
    deleteProjectDetail: null,
    onOpenProjectDetailToolbar: (id) => set({openProjectDetailToolbar: id}),
    onCloseProjectDetailToolbar: () => set({openProjectDetailToolbar: null}),
    onEditProjectDetail: (id) => set({editProjectDetail: id}),
    onCloseEditProjectDetail: () => set({editProjectDetail: null}),
    onDeleteProjectDetail: (id) => set({deleteProjectDetail: id}),
    onCloseDeleteProjectDetail: () => set({deleteProjectDetail: null}),
}))
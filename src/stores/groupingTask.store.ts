import {create} from "zustand/react";

type GroupingTaskStore = {
    groupedBy: string | null;
    setGroupedBy: (value: string | null) => void;
}

export const useGroupingTaskStore = create<GroupingTaskStore>(set => ({
    groupedBy: null,
    setGroupedBy: (value) => set({groupedBy: value})
}))
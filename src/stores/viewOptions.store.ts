import type {ViewOptionsPayload} from "@/types/viewOptions.type.ts";
import {create} from "zustand/react";
import {persist} from "zustand/middleware";

type ViewOptionsStore = {
    viewOptionsMap: Record<string, ViewOptionsPayload>;
    hydrated: boolean;
    setHydrated: (value: boolean) => void;
    setViewOptions: (viewType: string, viewId: string, payload: ViewOptionsPayload) => void;
    getViewOptions: (viewType: string, viewId: string) => ViewOptionsPayload | undefined;
}

export const useViewOptionsStore = create<ViewOptionsStore>()(
    persist((set, get) => ({
        viewOptionsMap: {},
        hydrated: false,
        setHydrated: value => set({hydrated: value}),
        setViewOptions: (viewType, viewId, payload) => {
            const key = `${viewType}-${viewId}`;
            set(state => {
                const previous = state.viewOptionsMap[key] ?? {}

                return {
                    viewOptionsMap: {
                        ...state.viewOptionsMap,
                        [key]: {
                            ...previous,
                            ...payload
                        }
                    }
                }
                }
            )
        },
        getViewOptions: (viewType, viewId) => {
            const key = `${viewType}-${viewId}`;
            return get().viewOptionsMap[key]
        }
    }),
        {
            name: 'view-options-storage',
            onRehydrateStorage: () => state => {
                state?.setHydrated(true);
            }
        })
)
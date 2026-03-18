import {create} from "zustand/react";
import {persist} from "zustand/middleware";

export type ThemeMode = "light" | "dark";

type ThemeStore = {
    theme: ThemeMode;
    setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>()(
    persist((set) => ({
        theme: "light",
        setTheme: mode => {
            document.documentElement.classList.toggle("dark", mode === "dark");
            set({theme: mode});
        }
    }),
        {
            name: "theme-storage",
            onRehydrateStorage: () => state => {
                if(state?.theme === "dark"){
                    document.documentElement.classList.add("dark");
                }else{
                    document.documentElement.classList.remove("dark");
                }
            }
        })
)
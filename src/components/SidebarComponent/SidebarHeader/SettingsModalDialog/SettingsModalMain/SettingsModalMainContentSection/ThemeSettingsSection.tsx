import SettingsModalMainSectionLayout from "@/layouts/SettingsModalMainSectionLayout.tsx";
import LightThemeSelection from "@/components/ui/ThemeSettingsModal/LightThemeSelection.tsx";
import DarkThemeSelection from "@/components/ui/ThemeSettingsModal/DarkThemeSelection.tsx";
import {changeTheme} from "@/helpers/changeTheme.ts";
const ThemeSettingsSection = () => {
    const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    return (
        <SettingsModalMainSectionLayout>
            <h3 className={"text-sm font-medium text-product-library-display-primary-idle-tint"}>Your themes</h3>
            <div className={"flex flex-col sm:flex-row gap-large"}>
                <button type={"button"} id={"default-theme"} aria-checked={currentTheme === "light"} onClick={() => changeTheme("light")} role={"radio"} aria-label={"default-theme"} className={"rounded-large border border-product-library-divider-primary flex overflow-hidden w-fit sm:w-auto"}>
                    <LightThemeSelection/>
                </button>
                <button type={"button"} id={"dark-theme"} aria-checked={currentTheme === "dark"} onClick={() => changeTheme("dark")} role={"radio"} aria-label={"dark-theme"} className={"rounded-large border border-product-library-divider-primary flex overflow-hidden w-fit sm:w-auto"}>
                    <DarkThemeSelection/>
                </button>
            </div>
        </SettingsModalMainSectionLayout>
    );
};

export default ThemeSettingsSection;
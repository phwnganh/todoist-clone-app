import SettingsModalMainSectionLayout from "@/layouts/SettingsModalMainSectionLayout.tsx";
import LightThemeSelection from "@/components/ui/ThemeSettingsModal/LightThemeSelection.tsx";
import DarkThemeSelection from "@/components/ui/ThemeSettingsModal/DarkThemeSelection.tsx";
const ThemeSettingsSection = () => {
    return (
        <SettingsModalMainSectionLayout>
            <h3 className={"text-sm font-medium text-product-library-display-primary-idle-tint"}>Your themes</h3>
            <div className={"flex flex-col sm:flex-row gap-large"}>
                <button type={"button"} id={"default-theme"} aria-checked={"false"} role={"radio"} aria-label={"default-theme"} className={"rounded-large border border-product-library-divider-primary flex overflow-hidden"}>
                    <LightThemeSelection/>
                </button>
                <button type={"button"} id={"dark-theme"} aria-checked={"false"} role={"radio"} aria-label={"dark-theme"} className={"rounded-large border border-product-library-divider-primary flex overflow-hidden"}>
                    <DarkThemeSelection/>
                </button>
            </div>
        </SettingsModalMainSectionLayout>
    );
};

export default ThemeSettingsSection;
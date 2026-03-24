import type {RefObject} from "react";
import type {OpenLabelsDropdown} from "@/types/menu-nav.type.ts";
import type {Color} from "@/types/color.type.ts";
import FormSmallArrowDownIcon from "@/components/icons/FormSmallArrowDownIcon.tsx";
import MyProjectFormColorListDropdown
    from "@/components/MyProjectsComponent/MyProjectForm/MyProjectFormColorListDropdown.tsx";

type LabelColorSectionProps = {
    colorRef: RefObject<HTMLDivElement | null>;
    openLabelDropdown: OpenLabelsDropdown;
    onToggleLabelDropdown: (openLabelDropdown: OpenLabelsDropdown) => void;
    colorValue: Color | null;
    onSelectColor: (color: Color) => void;
}
const LabelColorSection = ({colorRef, openLabelDropdown, onToggleLabelDropdown, colorValue, onSelectColor}: LabelColorSectionProps) => {
    return (
        <div className={"relative"} ref={colorRef}>
            <label htmlFor={"label-color"} className="text-product-library-display-primary-idle-tint text-sm font-strong pb-1.5"
            >Color</label>
            <button type={"button"} aria-haspopup={"listbox"} aria-expanded={openLabelDropdown === "color"}
            aria-controls={"color-listbox"} id={"color-trigger"}
            onClick={() => onToggleLabelDropdown("color")}
                    className="border border-product-library-border-idle-tint rounded-small flex items-center gap-1.5 pr-1.5 pl-2.5 h-8 hover:border-product-library-border-focus-tint w-full">
                <div className={"flex items-center justify-center w-6 h-6"}>
                    <div className={`rounded-xl w-3 h-3 ${colorValue?.hexadecimal ?? "bg-charcoal"}`}></div>
                </div>
                <div className={"flex-1"}>
                    <div className={"text-product-library-display-primary-idle-tint text-sm text-start"}>{colorValue?.label ?? "Charcoal"}</div>
                </div>
                <div className="flex items-center justify-center">
                    <FormSmallArrowDownIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                </div>
            </button>
            {openLabelDropdown === "color" && (
                <MyProjectFormColorListDropdown
                    selectedColor={colorValue}
                    onSelect={(color: Color) => onSelectColor(color)}
                />
            )}
        </div>
    );
};

export default LabelColorSection;
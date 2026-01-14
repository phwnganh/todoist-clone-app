import { colorData } from "../../../data/colorData.ts";
import VerifiedIcon from "../../../assets/verified-icon.svg";
import type { Color } from "../../../types/color.type.ts";

type AddProjectsColorListDropdownProps = {
  selectedColor: Color | null;
  onSelect: (color: Color) => void;
};

const MyProjectFormColorListDropdown = ({
  selectedColor,
  onSelect,
}: AddProjectsColorListDropdownProps) => {
  return (
    <div
      id="color-listbox"
      role="listbox"
      aria-labelledby="color-trigger"
      className="absolute top-full z-1000 border border-product-library-divider-primary rounded-large shadow-sm overflow-y-auto scrollbar-thin scrollbar-custom max-h-70 w-full mt-1 bg-white p-1.5"
    >
      {colorData.map((color) => {
        const isSelected = selectedColor === color;
        return (
          <div
            role="option"
            tabIndex={-1}
            data-selected={isSelected}
            className="group flex flex-col py-1 px-1.5 flex-1 w-full hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"
            key={color.id}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(color)
            }}
          >
            <div className="flex items-center gap-1.5">
              <div className="flex justify-center items-center invisible group-data-[selected=true]:visible">
                <img src={VerifiedIcon} alt={"verified-icon"} />
              </div>
              <span className="flex items-center gap-small">
                <div className="w-4 h-4 flex justify-center items-center shrink-0"></div>
                <div className="flex gap-1.5 overflow-hidden">
                  <div className="flex justify-center items-center">
                    <div
                      className={`rounded-xl w-3 h-3 ${color.hexadecimal}`}
                    ></div>
                  </div>
                  <div className="text-sm">{color.label}</div>
                </div>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyProjectFormColorListDropdown;

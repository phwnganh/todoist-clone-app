import type {InputHTMLAttributes} from "react";

type CustomSwitchProps = InputHTMLAttributes<HTMLInputElement>

const CustomSwitch = ({className, ...props}: CustomSwitchProps) => {
  return (
    <>
      <label htmlFor={"switch"} className="h-4.5 w-8 relative inline-block">
        <input type="checkbox" id={"switch-icon"} className={`sr-only peer ${className}`} {...props} />
        <div className="w-full h-full rounded-full bg-product-library-selectable-primary-unselected-fill peer-checked:bg-product-library-actionable-primary-idle-fill transition-colors"></div>
        <div className="absolute top-0.75 left-0.75 h-3 w-3 rounded-full bg-product-library-selectable-primary-on-selected-fill peer-checked:translate-x-3.5"></div>
      </label>
    </>
  );
};

export default CustomSwitch;

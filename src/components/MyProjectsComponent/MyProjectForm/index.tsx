import { createPortal } from "react-dom";
import LargeCloseIcon from "@/assets/large-close-icon.svg";
import type { Color } from "@/types/color.type.ts";
import CustomSwitch from "@/components/ui/CustomSwitch.tsx";
import { LAYOUT_ITEMS } from "@/data/menuNav.data.ts";
import {
  type FormEvent,
  Fragment,
  useState,
  type ChangeEvent,
  useRef,
} from "react";
import type { OpenDropdown } from "@/types/menu-nav.type.ts";
import { updateMyProjectField } from "@/helpers/updateMyProjectField.ts";
import { useClickOutside } from "@/hooks/useClickOutside.ts";
import QuestionIcon from "@/components/icons/QuestionIcon.tsx";
import ProjectNameSection from "@/components/MyProjectsComponent/EachProjectFieldSection/ProjectNameSection.tsx";
import ProjectColorSection from "@/components/MyProjectsComponent/EachProjectFieldSection/ProjectColorSection.tsx";
import ProjectWorkspaceSection
  from "@/components/MyProjectsComponent/EachProjectFieldSection/ProjectWorkspaceSection.tsx";
import ParentProjectSection from "@/components/MyProjectsComponent/EachProjectFieldSection/ParentProjectSection.tsx";

export type MyProjectFormValues = {
  name: string;
  color: Color | null;
  parentProject: string | null;
  layout: string;
};
type MyProjectFormProps = {
  title: string;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
  submittingLabel: string;
  values: MyProjectFormValues;
  onChange: (values: MyProjectFormValues) => void;
  isPending?: boolean;
  errorMessage?: string | null;
};
const MyProjectForm = ({
  title,
  onClose,
  onSubmit,
  submitLabel,
  values,
  onChange,
  isPending,
  errorMessage,
  submittingLabel,
}: MyProjectFormProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<OpenDropdown>(null);
  const colorRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const parentProjectRef = useRef<HTMLDivElement | null>(null);
  const dummyRef = useRef<HTMLDivElement | null>(null);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(updateMyProjectField(values, "name", e.target.value));
  };
  const handleToggleDropdown = (name: OpenDropdown) => {
    setIsOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleSelectColor = (color: Color) => {
    onChange(updateMyProjectField(values, "color", color));
    setIsOpenDropdown(null);
  };

  const handleSelectParentProjects = (parentProject: string) => {
    onChange(updateMyProjectField(values, "parentProject", parentProject));
    setIsOpenDropdown(null);
  };

  const handleSelectLayout = (layoutName: string) => {
    onChange(updateMyProjectField(values, "layout", layoutName));
  };

  useClickOutside({
    ref:
      isOpenDropdown === "color"
        ? colorRef
        : isOpenDropdown === "workspace"
        ? workspaceRef
        : isOpenDropdown === "parentProject"
        ? parentProjectRef
        : dummyRef,
    handler: () => setIsOpenDropdown(null),
    enabled: isOpenDropdown !== null,
  });

  const layoutItemClass = (layoutName: string) => `
    pt-xsmall px-xsmall pb-small w-full cursor-pointer ${
      values.layout === layoutName
        ? "bg-product-library-background-base-primary rounded-large text-product-library-display-primary-idle-tint"
        : "hover:text-product-library-display-primary-idle-tint"
    }`;

  const isAddButtonDisabled = values.name.trim() === "" || isPending;
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-project-title"
      className="fixed inset-0 bg-product-library-background-overlay z-50 pt-[13vh]"
    >
      <div className="w-120 max-w-full mx-auto rounded-large bg-product-library-background-base-primary transition-all duration-500 ease-in-out">
        <header className="flex justify-between py-2 pr-2 pl-4">
          <div className="flex flex-wrap gap-xsmall">
            <h1
              id="add-project-title"
              className="font-medium text-product-library-display-primary-idle-tint"
            >
              {title}
            </h1>
            <div className="flex justify-center items-center">
              <QuestionIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
            </div>
          </div>
          <button
            aria-label="Close dialog"
            className="flex justify-center items-center"
            onClick={onClose}
          >
            <img src={LargeCloseIcon} alt={"large-close-icon"} />
          </button>
        </header>
        <hr className="border-t border-t-product-library-divider-tertiary" />
        <form onSubmit={onSubmit}>
          <div className="p-4 flex flex-col gap-large">
            {/*name section*/}
            <ProjectNameSection onNameChange={handleNameChange} nameValue={values.name}/>

            {/*color section*/}
            <ProjectColorSection colorRef={colorRef} openDropdown={isOpenDropdown} onToggleDropdown={handleToggleDropdown} colorValue={values.color} onSelectColor={handleSelectColor}/>
            {/*workspace section*/}
            <ProjectWorkspaceSection workspaceRef={workspaceRef} openDropdown={isOpenDropdown} onToggleDropdown={handleToggleDropdown}/>

            {/*parent project*/}
            <ParentProjectSection parentProjectRef={parentProjectRef} openDropdown={isOpenDropdown} onToggleDropdown={handleToggleDropdown} parentProjectValue={values.parentProject} onSelectParentProject={handleSelectParentProjects} onCloseDropdown={() => setIsOpenDropdown(null)}/>

            {/*add to favorites*/}
            <div className="flex items-center">
              <div
                role="switch"
                aria-checked="true"
                className="mr-2 flex justify-center items-center"
              >
                <CustomSwitch />
              </div>
              <div className="text-sm text-product-library-display-primary-idle-tint">
                Add to favorites
              </div>
            </div>

            {/*layout*/}
            <div>
              <label className="text-product-library-selectable-tertiary-on-unselected-enabled-tint text-sm font-strong pb-1.5">
                Layout
              </label>
              <div className="flex justify-center border-2 border-product-library-selectable-background gap-0.75 bg-product-library-selectable-background rounded-large text-product-library-display-secondary-idle-tint ">
                {LAYOUT_ITEMS.map((layout) => {
                  return (
                    <Fragment key={layout.key}>
                      <label className={`${layoutItemClass(layout.key)}`}>
                        <input
                          type="radio"
                          className="sr-only"
                          value={layout.key}
                          checked={values.layout === layout.key}
                          onChange={() => handleSelectLayout(layout.key)}
                        />
                        <span className="flex flex-col gap-xsmall items-center justify-center text-xs">
                          <layout.icon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                          {layout.label}
                        </span>
                      </label>
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <hr className="border-t border-t-product-library-divider-tertiary" />
          </div>
          {errorMessage && (
            <div
              className={
                "text-sm text-product-library-actionable-destructive-idle-tint"
              }
              role={"alert"}
            >
              {errorMessage}
            </div>
          )}
          <footer className="flex justify-end px-4 pb-4 gap-2.5">
            <button
              type="button"
              className="px-3 py-1.5 rounded-small bg-product-library-actionable-secondary-idle-fill flex justify-center items-center min-w-17"
              onClick={onClose}
            >
              <span className="text-sm font-medium text-product-library-actionable-secondary-on-idle-tint">
                Cancel
              </span>
            </button>
            <button
              type="submit"
              className={`px-3 py-1.5 rounded-small  flex justify-center items-center min-w-17 ${
                isAddButtonDisabled
                  ? "bg-product-library-actionable-primary-disabled-fill cursor-not-allowed"
                  : "bg-product-library-actionable-primary-idle-fill hover:bg-product-library-actionable-primary-hover-fill"
              }`}
              disabled={isAddButtonDisabled}
            >
              <span className="text-sm font-medium text-product-library-actionable-primary-on-idle-tint">
                {isPending ? submittingLabel : submitLabel}
              </span>
            </button>
          </footer>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default MyProjectForm;

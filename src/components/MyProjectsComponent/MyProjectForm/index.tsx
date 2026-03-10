import { createPortal } from "react-dom";
import QuestionIcon from "@/assets/question-icon.svg";
import LargeCloseIcon from "@/assets/large-close-icon.svg";
import FormSmallArrowDownIcon from "@/assets/form-small-arrow-down-icon.svg";
import MyProjectFormColorListDropdown from "./MyProjectFormColorListDropdown.tsx";
import type { Color } from "@/types/color.type.ts";
import UserAvatar from "@/assets/User-avatar.png";
import MyProjectFormWorkspaceListDropdown from "./MyProjectFormWorkspaceListDropdown.tsx";
import HashtagIcon from "@/assets/hashtag-icon.svg";
import AddProjectsParentProjectListDropdown from "./MyProjectFormParentProjectListDropdown";
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
        ? "bg-white rounded-large text-product-library-display-primary-idle-tint"
        : "hover:text-product-library-display-primary-idle-tint"
    }`;

  const isAddButtonDisabled = values.name.trim() === "" || isPending;
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-project-title"
      className="fixed inset-0 bg-black/40 z-50 pt-[13vh]"
    >
      <div className="w-120 max-w-full mx-auto rounded-large bg-white transition-all duration-500 ease-in-out">
        <header className="flex justify-between py-2 pr-2 pl-4">
          <div className="flex flex-wrap gap-xsmall">
            <h1
              id="add-project-title"
              className="font-medium text-product-library-display-primary-idle-tint"
            >
              {title}
            </h1>
            <div className="flex justify-center items-center">
              <img src={QuestionIcon} alt={"question-icon"} />
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
            <div>
              <label
                htmlFor="project-name"
                className="text-product-library-display-primary-idle-tint text-sm font-strong pb-1.5"
              >
                Name
              </label>
              <div className="border border-product-library-border-idle-tint rounded-small flex items-center justify-between hover:border-product-library-border-focus-tint">
                <input
                  id="project-name"
                  name="name"
                  type="text"
                  maxLength={120}
                  className="py-1.5 px-2 w-full outline-none text-sm"
                  onChange={handleNameChange}
                  value={values.name}
                />
                {values.name.length < 120 ? (
                  <div className="mr-xsmall -ml-xsmall text-sm text-product-library-display-secondary-idle-tint">
                    {values.name.length}/120
                  </div>
                ) : (
                  <div className="mr-xsmall -ml-xsmall text-sm text-product-library-actionable-destructive-idle-tint">
                    {values.name.length}/120
                  </div>
                )}
              </div>
            </div>

            {/*color section*/}
            <div className="relative" ref={colorRef}>
              <label
                htmlFor="project-color"
                className="text-product-library-display-primary-idle-tint text-sm font-strong pb-1.5"
              >
                Color
              </label>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpenDropdown === "color"}
                aria-controls="color-listbox"
                id="color-trigger"
                onClick={() => handleToggleDropdown("color")}
                className="border border-product-library-border-idle-tint rounded-small flex items-center gap-1.5 pr-1.5 pl-2.5 h-8 hover:border-product-library-border-focus-tint w-full"
              >
                <div className="flex items-center justify-center w-6 h-6">
                  <div
                    className={`rounded-xl w-3 h-3 ${
                      values.color?.hexadecimal ?? "bg-charcoal"
                    }`}
                  ></div>
                </div>
                <div className="flex-1">
                  <div className="text-product-library-display-primary-idle-tint text-sm text-start">
                    {values.color?.label ?? "Charcoal"}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src={FormSmallArrowDownIcon}
                    alt={"form-small-arrow-down-icon"}
                  />
                </div>
              </button>
              {isOpenDropdown === "color" && (
                <MyProjectFormColorListDropdown
                  selectedColor={values.color}
                  onSelect={(color: Color) => handleSelectColor(color)}
                />
              )}
            </div>

            {/*workspace section*/}
            <div className="relative" ref={workspaceRef}>
              <label
                htmlFor="project-workspace"
                className="text-product-library-display-primary-idle-tint text-sm font-strong pb-1.5"
              >
                Workspace
              </label>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpenDropdown === "workspace"}
                aria-controls="workspace-listbox"
                onClick={() => handleToggleDropdown("workspace")}
                className="border border-product-library-border-idle-tint rounded-small flex items-center gap-1.5 pr-1.5 pl-2.5 h-8 hover:border-product-library-border-focus-tint w-full"
              >
                <div className="flex items-center justify-center w-4.5 h-4.5 rounded-small">
                  <img
                    src={UserAvatar}
                    alt="user-avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-product-library-display-primary-idle-tint text-sm text-start">
                    My Projects
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src={FormSmallArrowDownIcon}
                    alt={"form-small-arrow-down-icon"}
                  />
                </div>
              </button>
              {isOpenDropdown === "workspace" && (
                <MyProjectFormWorkspaceListDropdown />
              )}
            </div>

            {/*parent project*/}
            <div className="relative" ref={parentProjectRef}>
              <label
                htmlFor="parent-project"
                className="text-product-library-display-primary-idle-tint text-sm font-strong pb-1.5"
              >
                Parent project
              </label>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpenDropdown === "parentProject"}
                aria-controls="parentProject-listbox"
                onClick={() => handleToggleDropdown("parentProject")}
                className="border border-product-library-border-idle-tint rounded-small flex items-center gap-1.5 pr-1.5 pl-2.5 h-8 justify-between hover:border-product-library-border-focus-tint w-full"
              >
                <div className="flex items-center gap-1.5">
                  {values.parentProject !== "No Parent" && (
                    <div className="flex justify-center items-center">
                      <img src={HashtagIcon} alt={"hashtag-icon"} />
                    </div>
                  )}

                  <div className="text-product-library-display-primary-idle-tint text-sm text-start">
                    {values.parentProject ?? "No Parent"}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src={FormSmallArrowDownIcon}
                    alt={"form-small-arrow-down-icon"}
                  />
                </div>
              </button>
              {isOpenDropdown === "parentProject" && (
                <AddProjectsParentProjectListDropdown
                  selectedProject={values.parentProject}
                  onSelect={(parentProject: string) =>
                    handleSelectParentProjects(parentProject)
                  }
                  onCloseDropdown={() => setIsOpenDropdown(null)}
                />
              )}
            </div>

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
                          <img src={layout.icon} alt={layout.key} />
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

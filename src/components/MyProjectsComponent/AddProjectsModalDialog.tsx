import QuestionIcon from "../icons/QuestionIcon.tsx";
import LargeCloseIcon from "../icons/LargeCloseIcon.tsx";
import FormSmallArrowDownIcon from "../icons/FormSmallArrowDownIcon.tsx";
import UserAvatar from "../../assets/User-avatar.png";
import CustomSwitch from "../ui/CustomSwitch.tsx";
import { type ChangeEvent, type FormEvent, Fragment, useState } from "react";
import AddProjectsColorListDropdown from "./AddProjectsColorListDropdown.tsx";
import { createPortal } from "react-dom";
import type { Color } from "../../types/color.type.ts";
import AddProjectsWorkspaceListDropdown from "./AddProjectsWorkspaceListDropdown.tsx";
import AddProjectsParentProjectListDropdown from "./AddProjectsParentProjectListDropdown";
import HashtagIcon from "../icons/HashtagIcon.tsx";
import type { OpenDropdown } from "../../types/menu-nav.type.ts";
import { LAYOUT_ITEMS } from "../../data/menuNavData.ts";
import { LAYOUT_MAP } from "../icons/IconMap.tsx";

const AddProjectsModalDialog = ({ onClose }: { onClose: () => void }) => {
  const [nameValue, setNameValue] = useState("");
  const [isOpenDropdown, setIsOpenDropdown] = useState<OpenDropdown>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedParentProject, setSelectedParentProject] = useState<
    string | null
  >(null);
  const [selectedLayout, setSelectedLayout] = useState<string | null>("list");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const handleToggleDropdown = (name: OpenDropdown) => {
    setIsOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleSelectColor = (color: Color) => {
    setSelectedColor(color);
    setIsOpenDropdown(null);
  };

  const handleSelectParentProjects = (parentProject: string) => {
    setSelectedParentProject(parentProject);
    setIsOpenDropdown(null);
  };

  const handleSelectLayout = (layoutName: string) => {
    setSelectedLayout(layoutName);
  };

  const handleAddMyProjects = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const layoutItemClass = (layoutName: string) => `
    pt-xsmall px-xsmall pb-small w-full cursor-pointer ${
      selectedLayout === layoutName
        ? "bg-white rounded-large text-product-library-display-primary-idle-tint"
        : "hover:text-product-library-display-primary-idle-tint"
    }`;

  const isAddButtonDisabled = nameValue.trim() === "";
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
              Add project
            </h1>
            <div className="flex justify-center items-center">
              <QuestionIcon />
            </div>
          </div>
          <button
            aria-label="Close dialog"
            className="flex justify-center items-center"
            onClick={onClose}
          >
            <LargeCloseIcon />
          </button>
        </header>
        <hr className="border-t border-t-product-library-divider-tertiary" />
        <form onSubmit={handleAddMyProjects}>
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
                  value={nameValue}
                />
                {nameValue.length < 120 ? (
                  <div className="mr-xsmall -ml-xsmall text-sm text-product-library-display-secondary-idle-tint">
                    {nameValue.length}/120
                  </div>
                ) : (
                  <div className="mr-xsmall -ml-xsmall text-sm text-product-library-actionable-destructive-idle-tint">
                    {nameValue.length}/120
                  </div>
                )}
              </div>
            </div>

            {/*color section*/}
            <div className="relative">
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
                      selectedColor?.hexadecimal ?? "bg-charcoal"
                    }`}
                  ></div>
                </div>
                <div className="flex-1">
                  <div className="text-product-library-display-primary-idle-tint text-sm text-start">
                    {selectedColor?.label ?? "Charcoal"}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <FormSmallArrowDownIcon />
                </div>
              </button>
              {isOpenDropdown === "color" && (
                <AddProjectsColorListDropdown
                  selectedColor={selectedColor}
                  onSelect={(color: Color) => handleSelectColor(color)}
                />
              )}
            </div>

            {/*workspace section*/}
            <div className="relative">
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
                  <FormSmallArrowDownIcon />
                </div>
              </button>
              {isOpenDropdown === "workspace" && (
                <AddProjectsWorkspaceListDropdown />
              )}
            </div>

            {/*parent project*/}
            <div className="relative">
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
                  {selectedParentProject !== "No Parent" && (
                    <div className="flex justify-center items-center">
                      <HashtagIcon />
                    </div>
                  )}

                  <div className="text-product-library-display-primary-idle-tint text-sm text-start">
                    {selectedParentProject ?? "No Parent"}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <FormSmallArrowDownIcon />
                </div>
              </button>
              {isOpenDropdown === "parentProject" && (
                <AddProjectsParentProjectListDropdown
                  selectedProject={selectedParentProject}
                  onSelect={(parentProject: string) =>
                    handleSelectParentProjects(parentProject)
                  }
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
                  const Icon = LAYOUT_MAP[layout.icon];
                  return (
                    <Fragment key={layout.key}>
                      <label className={`${layoutItemClass(layout.key)}`}>
                        <input
                          type="radio"
                          className="sr-only"
                          value={layout.key}
                          checked={selectedLayout === layout.key}
                          onChange={() => handleSelectLayout(layout.key)}
                        />
                        <span className="flex flex-col gap-xsmall items-center justify-center text-xs">
                          <Icon />
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
                Add
              </span>
            </button>
          </footer>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddProjectsModalDialog;

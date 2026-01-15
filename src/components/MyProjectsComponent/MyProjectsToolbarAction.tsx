import PlusIcon from "../../assets/plus-icon.svg";
import SmallArrowDownIcon from "../../assets/small-arrow-down-icon.svg";
import MyProjectsDropdown from "./MyProjectsDropdown.tsx";
import { useRef, useState } from "react";
import CustomSwitch from "../ui/CustomSwitch.tsx";
import { useClickOutside } from "../../hooks/useClickOutside.ts";
import AddProjectsModalDialog from "./AddProjectsModalDialog";

const MyProjectsToolbarAction = () => {
  const [isOpenAddProjectsDropdown, setOpenAddProjectsDropdown] =
    useState(false);
  const [isAddProjectsModalOpen, setIsAddProjectsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const handleOpenAddProjectsDropdown = () => {
    setOpenAddProjectsDropdown((prev) => !prev);
  };

  const handleOpenAddProjectsModal = () => {
    setOpenAddProjectsDropdown(false);
    setIsAddProjectsModalOpen(true);
  };

  const handleCloseAddProjectsModal = () => {
    setIsAddProjectsModalOpen(false);
  };

  useClickOutside({
    ref: dropdownRef,
    handler: () => setOpenAddProjectsDropdown(false),
    enabled: isOpenAddProjectsDropdown,
  });
  return (
    <div className="flex justify-between flex-wrap gap-2 sm:gap-0">
      <div className="flex items-center">
        <p className="text-product-library-display-secondary-idle-tint text-sm pr-2">
          Archived projects only
        </p>
        <CustomSwitch />
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleOpenAddProjectsDropdown}
          className="px-3 h-8 flex items-center bg-product-library-actionable-secondary-idle-fill rounded-small hover:bg-product-library-border-hover-tint"
        >
          <div className="mr-1.5 flex justify-center items-center">
            <img src={PlusIcon} alt={"plus-icon"} />
          </div>
          <span className="text-product-library-actionable-secondary-on-idle-tint overflow-hidden text-sm font-medium">
            Add
          </span>
          <div className="ml-1.5 flex justify-center items-center">
            <img src={SmallArrowDownIcon} alt={"small-arrow-down-icon"} />
          </div>
        </button>
        {isOpenAddProjectsDropdown && (
          <MyProjectsDropdown
            onOpenAddProjectModal={handleOpenAddProjectsModal}
          />
        )}
        {isAddProjectsModalOpen && (
          <AddProjectsModalDialog onClose={handleCloseAddProjectsModal} />
        )}
      </div>
    </div>
  );
};

export default MyProjectsToolbarAction;

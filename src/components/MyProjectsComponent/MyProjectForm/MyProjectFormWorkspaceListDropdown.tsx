import VerifiedIcon from "@/components/icons/VerifiedIcon.tsx";
import type {User} from "@/types/user.type.ts";

type MyProjectFormWorkspaceListDropdownProps = {
  user?: User
}
const MyProjectFormWorkspaceListDropdown = ({user}: MyProjectFormWorkspaceListDropdownProps) => {
  return (
    <div
      id="workspace-listbox"
      role="listbox"
      aria-labelledby="workspace-trigger"
      className="absolute top-full z-1000 border border-product-library-divider-primary rounded-large shadow-sm overflow-y-auto scrollbar-thin scrollbar-custom max-h-70 w-full mt-1 bg-product-library-background-base-primary p-1.5"
    >
      <div className="flex flex-col">
        <div
          role="option"
          tabIndex={-1}
          className="flex items-center gap-1.5 py-1 px-1.5 w-full hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"
        >
          <div className="flex justify-center items-center">
            <VerifiedIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
          </div>
          <span className="flex items-center gap-small">
            <div className="flex gap-1.5 overflow-hidden">
              <div className="flex justify-center items-center w-4.5 h-4.5 rounded-small bg-product-library-background-base-primary">
                <img
                    src={user?.avatar_small}
                    alt={user?.full_name}
                    className={"rounded-small"}
                />
              </div>
              <div className="text-sm text-product-library-display-primary-idle-tint">My Projects</div>
            </div>
          </span>
        </div>
        <button className="text-center text-sm text-product-library-actionable-tertiary-idle-tint font-medium py-1 px-1.5 w-full hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
          Add team workspace
        </button>
      </div>
    </div>
  );
};

export default MyProjectFormWorkspaceListDropdown;

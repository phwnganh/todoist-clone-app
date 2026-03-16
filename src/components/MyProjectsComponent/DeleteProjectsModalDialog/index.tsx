import { createPortal } from "react-dom";
import { useDeleteProject } from "@/hooks/useQueryHook/useProjects.ts";
import { type MouseEvent } from "react";
import type {Project} from "@/types/project.type.ts";
import CustomDialog from "@/components/ui/CustomDialog.tsx";

type DeleteProjectModalDialogProps = {
  project: Project;
  onClose: () => void;
};
const DeleteProjectsModalDialog = ({
  project,
  onClose,
}: DeleteProjectModalDialogProps) => {
  const { mutate } = useDeleteProject();

  const handleDeleteProject = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(
      { projectId: project.id }
    );
    onClose();

  };
  return (
    <CustomDialog role={"alertdialog"} labelTitle={"delete-projects"} className={"w-md px-4"}>
        <header className={"pt-4 pb-2"}>
          <h1
            id={"delete-project-title"}
            className={
              "font-medium text-product-library-display-primary-idle-tint"
            }
          >
            Delete project?
          </h1>
        </header>
        <main>
          <p className={"text-xs text-product-library-display-primary-idle-tint"}>
            The <span className={"font-strong"}>{project?.name}</span>{" "}
            project and all of its tasks will be permanently deleted.
          </p>
        </main>
        <footer className={"pt-6 pb-4 flex justify-end gap-2.5"}>
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
            type="button"
            className={`px-3 py-1.5 rounded-small  flex justify-center items-center min-w-17 
                            bg-product-library-actionable-primary-idle-fill hover:bg-product-library-actionable-primary-hover-fill
                        }`}
            onClick={handleDeleteProject}
          >
            <span className="text-sm font-medium text-product-library-actionable-primary-on-idle-tint">
              Delete
            </span>
          </button>
        </footer>
    </CustomDialog>
  );
};

export default DeleteProjectsModalDialog;

import {createPortal} from "react-dom";
import {useDeleteProject, useGetAProject} from "../../../hooks/useProjects";
import {type MouseEvent} from "react";
import LoadingSpin from "../../ui/LoadingSpin";

type DeleteProjectModalDialogProps = {
    projectId: string;
    onClose: () => void;
}
const DeleteProjectsModalDialog = ({projectId, onClose}: DeleteProjectModalDialogProps) => {
    const {data: projectDetail, isLoading} = useGetAProject(projectId)
    const {mutate} = useDeleteProject()

    const handleDeleteProject = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        mutate({projectId: projectId}, {
            onSuccess: () => {
                onClose();
            }
        })
    }

    if(isLoading){
        return (<div className={"mt-medium"}>
            <LoadingSpin/>
        </div>)
    }
    return createPortal(
        <div role={"alertdialog"} aria-label={"delete-projects"} className={"fixed inset-0 bg-black/40 z-50 pt-[13vh]"}>
            <div className={"w-md max-w-full mx-auto rounded-large bg-white transition-all duration-500 ease-in-out px-4"}>
                <header className={"pt-4 pb-2"}>
                    <h1 id={"delete-project-title"} className={"font-medium text-product-library-display-primary-idle-tint"}>Delete project?</h1>
                </header>
                <main>
                    <p className={"text-xs"}>The <span className={"font-strong"}>{projectDetail?.name}</span> project and all of its tasks will be permanently deleted.</p>
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
            </div>
        </div>,
        document.body
    );
};

export default DeleteProjectsModalDialog;
import {useSectionStore} from "@/stores/section.store.ts";
import {type MouseEvent} from "react";
import {useDeleteSection} from "@/hooks/useQueryHook/useSections.ts";
import type {Section} from "@/types/section.type.ts";
import CustomDialog from "@/components/ui/CustomDialog.tsx";

const DeleteMyTaskSectionModalDialog = ({section}: {section: Section}) => {
    const {onCloseDeleteSection, deleteSectionId} = useSectionStore()
    const {mutate} = useDeleteSection()
    const handleDeleteMySection = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!deleteSectionId) return;
        mutate({
            sectionId: deleteSectionId
        })
    }
    return (
        <CustomDialog role={"alertdialog"} labelTitle={"delete-section"} className={"w-md px-4"}>
                <header className={"pt-4 pb-2"}>
                    <h1 id={"delete-task-title"} className={"font-medium text-product-library-display-primary-idle-tint"}>
                        Delete section?
                    </h1>
                </header>
                <main>
                    <p className={"text-xs text-product-library-display-primary-idle-tint"}>
                        The <span className={"font-strong"}>{section.name}</span> section will be permanently deleted.
                    </p>
                </main>
                <footer className={"pt-6 pb-4 flex justify-end gap-2.5"}>
                    <button
                        type="button"
                        className="px-3 py-1.5 rounded-small bg-product-library-actionable-secondary-idle-fill flex justify-center items-center min-w-17"
                        onClick={onCloseDeleteSection}
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
                        onClick={handleDeleteMySection}
                    >
            <span className="text-sm font-medium text-product-library-actionable-primary-on-idle-tint">
              Delete
            </span>
                    </button>
                </footer>
        </CustomDialog>
    );
};

export default DeleteMyTaskSectionModalDialog;
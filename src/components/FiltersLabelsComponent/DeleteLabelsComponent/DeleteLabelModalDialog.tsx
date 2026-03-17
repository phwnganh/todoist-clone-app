import type {Label} from "@/types/label.type.ts";
import {useDeleteLabels} from "@/hooks/useQueryHook/useLabels.ts";
import {type MouseEvent} from "react";
import {useLabelStore} from "@/stores/label.store.ts";
import CustomDialog from "@/components/ui/CustomDialog.tsx";

type DeleteLabelModalDialogProps = {
    label: Label;
}
const DeleteLabelModalDialog = ({label}: DeleteLabelModalDialogProps) => {
    const {mutate} = useDeleteLabels()
    const {onCloseDeleteLabelModalDialog} = useLabelStore()
    const handleDeleteLabel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate({
            labelId: label.id
        })
        onCloseDeleteLabelModalDialog()
    }
    return (
        <CustomDialog role={"alertdialog"} labelTitle={"delete-labels"} className={"w-md px-4"}>
            <header className={"pt-4 pb-2"}>
                <h1 id={"delete-label-title"} className={
                    "font-medium text-product-library-display-primary-idle-tint"
                }>Delete label?</h1>
            </header>
            <main>
                <p className={"text-xs text-product-library-display-primary-idle-tint"}>
                    The <span className={"font-strong"}>{label.name}</span> label will be permanently deleted and removed from 1 task.
                </p>
            </main>
            <footer className={"pt-6 pb-4 flex justify-end gap-2.5"}>
                <button
                    type="button"
                    className="px-3 py-1.5 rounded-small bg-product-library-actionable-secondary-idle-fill flex justify-center items-center min-w-17"
                    onClick={onCloseDeleteLabelModalDialog}
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
                    onClick={handleDeleteLabel}
                >
            <span className="text-sm font-medium text-product-library-actionable-primary-on-idle-tint">
              Delete
            </span>
                </button>
            </footer>

        </CustomDialog>
    );
};

export default DeleteLabelModalDialog;
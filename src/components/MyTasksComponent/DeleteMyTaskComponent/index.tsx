import { createPortal } from "react-dom";
import { useTaskStore } from "@/stores/task.store.ts";
import { useDeleteMyTask } from "@/hooks/useQueryHook/useTasks.ts";
import { type MouseEvent } from "react";
import type { Task } from "@/types/task.type.ts";

const DeleteMyTaskModalDialog = ({ task }: { task: Task }) => {
  const { deleteTaskId, onCloseDeleteMyTask } = useTaskStore();
  const { mutate } = useDeleteMyTask();

  const handleDeleteMyTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!deleteTaskId) return;
    mutate({
      taskId: deleteTaskId,
    });
    onCloseDeleteMyTask();
  };
  return createPortal(
    <div
      role={"alertdialog"}
      aria-label={"delete-task"}
      className={"fixed inset-0 bg-product-library-background-overlay z-50 pt-[13vh]"}
    >
      <div className={"w-md max-w-full mx-auto rounded-large bg-product-library-background-base-primary px-4"}>
        <header className={"pt-4 pb-2"}>
          <h1
            id={"delete-task-title"}
            className={
              "font-medium text-product-library-display-primary-idle-tint"
            }
          >
            Delete task?
          </h1>
        </header>
        <main>
          <p className={"text-xs"}>
            The <span className={"font-strong"}>{task?.content}</span> task will
            be permanently deleted.
          </p>
        </main>
        <footer className={"pt-6 pb-4 flex justify-end gap-2.5"}>
          <button
            type="button"
            className="px-3 py-1.5 rounded-small bg-product-library-actionable-secondary-idle-fill flex justify-center items-center min-w-17"
            onClick={onCloseDeleteMyTask}
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
            onClick={handleDeleteMyTask}
          >
            <span className="text-sm font-medium text-product-library-actionable-primary-on-idle-tint">
              Delete
            </span>
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
};

export default DeleteMyTaskModalDialog;

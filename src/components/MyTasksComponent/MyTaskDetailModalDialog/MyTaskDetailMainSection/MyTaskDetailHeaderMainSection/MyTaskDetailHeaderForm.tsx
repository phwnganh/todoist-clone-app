import DescriptionIcon from "@/assets/description-icon.svg";
import type { Task } from "@/types/task.type.ts";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { useUpdateMyTask } from "@/hooks/useQueryHook/useTasks.ts";
import { updateMyTaskDetailHeader } from "@/helpers/updateMyTaskField.ts";

export type TaskDetailHeaderFormValues = {
  content: string;
  description: string;
};
const MyTaskDetailHeaderForm = ({
  onCancelForm,
  taskDetail,
}: {
  onCancelForm: () => void;
  taskDetail?: Task;
}) => {
  const [values, setValues] = useState<TaskDetailHeaderFormValues>({
    content: taskDetail?.content ?? "",
    description: taskDetail?.description ?? "",
  });
  const { mutate } = useUpdateMyTask();

  const handleUpdateTaskHeader = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskDetail) return;
    mutate({
      id: taskDetail.id,
      content: values.content.trim(),
      description: values.description.trim(),
    });
    onCancelForm();
  };

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues(updateMyTaskDetailHeader(values, "content", e.target.value));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues(updateMyTaskDetailHeader(values, "description", e.target.value));
  };
  return (
    <form className={"w-full"} onSubmit={handleUpdateTaskHeader}>
      <div
        className={
          "outline-product-library-border-hover-tint rounded-large outline flex flex-col pt-1 px-1.75"
        }
      >
        <input
          type={"text"}
          className={"outline-none font-medium text-header"}
          placeholder={"Content"}
          value={values?.content}
          onChange={handleContentChange}
        />
        <div className={"flex mt-small mb-xsmall ml-px"}>
          <div className={"flex justify-center items-center"}>
            <img src={DescriptionIcon} alt={"description-icon"} />
          </div>
          <input
            type={"text"}
            className={
              "outline-none text-sm text-product-library-display-secondary-idle-tint"
            }
            placeholder={"Description"}
            value={values?.description}
            onChange={handleDescriptionChange}
          />
        </div>
      </div>
      <div className={"flex justify-end mt-small pb-4 gap-2.5"}>
        <button
          type="button"
          className="px-3 py-1.5 rounded-small bg-product-library-actionable-secondary-idle-fill flex justify-center items-center min-w-17"
          onClick={onCancelForm}
        >
          <span className="text-sm font-medium text-product-library-actionable-secondary-on-idle-tint">
            Cancel
          </span>
        </button>
        <button
          type="submit"
          className={`px-3 py-1.5 rounded-small  flex justify-center items-center min-w-17 bg-product-library-actionable-primary-idle-fill hover:bg-product-library-actionable-primary-hover-fill`}
        >
          <span className="text-sm font-medium text-product-library-actionable-primary-on-idle-tint">
            Save
          </span>
        </button>
      </div>
    </form>
  );
};

export default MyTaskDetailHeaderForm;

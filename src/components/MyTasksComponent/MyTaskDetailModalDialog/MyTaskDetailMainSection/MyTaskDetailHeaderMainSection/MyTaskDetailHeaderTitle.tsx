import MyTaskContent from "../../../MyTaskContent.tsx";
import type { Task } from "@/types/task.type.ts";
import DescriptionIcon from "@/components/icons/DescriptionIcon.tsx";

type MyTaskDetailHeaderTitleProps = {
  taskDetail?: Task | null;
  onOpenMyTaskDetailForm: () => void;
};
const MyTaskDetailHeaderTitle = ({
  taskDetail,
  onOpenMyTaskDetailForm,
}: MyTaskDetailHeaderTitleProps) => {
  return (
    <div
      role={"button"}
      className={"flex flex-col"}
      onClick={onOpenMyTaskDetailForm}
    >
      <div className={"text-header font-medium text-product-library-display-primary-idle-tint"}>
        <MyTaskContent content={taskDetail?.content} />
      </div>
      <div className={"mt-small mb-xsmall ml-px flex"}>
        <div className={"flex justify-center items-center"}>
          <DescriptionIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
        </div>
        <p
          className={"text-sm text-product-library-display-tertiary-idle-tint"}
        >
          {taskDetail?.description || "Description"}
        </p>
      </div>
    </div>
  );
};

export default MyTaskDetailHeaderTitle;

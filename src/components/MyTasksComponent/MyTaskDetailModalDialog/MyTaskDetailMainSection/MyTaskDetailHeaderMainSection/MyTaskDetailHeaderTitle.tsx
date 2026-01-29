import MyTaskContent from "../../../MyTaskContent.tsx";
import DescriptionIcon from "../../../../../assets/description-icon.svg";
import type { Task } from "../../../../../types/task.type.ts";

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
      <div className={"text-header font-medium"}>
        <MyTaskContent content={taskDetail?.content} />
      </div>
      <div className={"mt-small mb-xsmall ml-px flex"}>
        <div className={"flex justify-center items-center"}>
          <img src={DescriptionIcon} alt={"description-icon"} />
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

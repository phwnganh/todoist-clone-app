import VerifiedIcon from "../../../../icons/VerifiedIcon.tsx";
import type { Task } from "../../../../../types/task.type.ts";
import { useState } from "react";
import MyTaskDetailHeaderForm from "./MyTaskDetailHeaderForm.tsx";
import MyTaskDetailHeaderTitle from "./MyTaskDetailHeaderTitle.tsx";
import {
  PRIORITY_BORDER_CLASS_MAPPING,
  PRIORITY_VERIFIED_CLASS_MAPPING
} from "../../../../../constants/priority.constants";

type MyTaskDetailHeaderMainSectionProps = {
  taskDetail?: Task;
};
const MyTaskDetailHeaderMainSection = ({
  taskDetail,
}: MyTaskDetailHeaderMainSectionProps) => {
  const [openMyTaskDetailForm, setOpenMyTaskDetailForm] = useState(false);
  const handleOpenMyTaskDetailForm = () => {
    setOpenMyTaskDetailForm(true);
  };
  const handleCloseMyTaskDetailForm = () => {
    setOpenMyTaskDetailForm(false);
  };

  return (
    <div className={"flex gap-1.5 items-start"}>
      <button
        type={"button"}
        aria-checked={"false"}
        aria-label={"Mark task as complete"}
        className={"mt-2 mr-1.5 -ml-0.75 relative group/check"}
      >
        <div
          className={
            `h-5 w-5 rounded-full border-2 ${PRIORITY_BORDER_CLASS_MAPPING[taskDetail?.priority as number]}`
          }
        ></div>
        <div
          className={
            "inset-0 absolute group-hover/check:flex justify-center items-center hidden"
          }
        >
          <VerifiedIcon
            className={`${PRIORITY_VERIFIED_CLASS_MAPPING[taskDetail?.priority as number]} opacity-50`}
          />
        </div>
      </button>
      {openMyTaskDetailForm ? (
        <MyTaskDetailHeaderForm onCancelForm={handleCloseMyTaskDetailForm} taskDetail={taskDetail} />
      ) : (
        <MyTaskDetailHeaderTitle
          taskDetail={taskDetail}
          onOpenMyTaskDetailForm={handleOpenMyTaskDetailForm}
        />
      )}
    </div>
  );
};

export default MyTaskDetailHeaderMainSection;

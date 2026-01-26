import VerifiedIcon from "../../../icons/VerifiedIcon.tsx";
import DescriptionIcon from '../../../../assets/description-icon.svg'
import type {Task} from "../../../../types/task.type.ts";
import {useState} from "react";
import MyTaskDetailHeaderForm from "./MyTaskDetailHeaderForm.tsx";
import MyTaskContent from "../../MyTaskContent.tsx";

type MyTaskDetailHeaderMainSectionProps = {
    taskDetail: Task | undefined
}
const MyTaskDetailHeaderMainSection = ({taskDetail}: MyTaskDetailHeaderMainSectionProps) => {
    const [openMyTaskDetailForm, setOpenMyTaskDetailForm] = useState(false)
    const handleOpenMyTaskDetailForm = () => {
        setOpenMyTaskDetailForm(true)
    }
    const handleCloseMyTaskDetailForm = () => {
        setOpenMyTaskDetailForm(false)
    }
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
                        "h-5 w-5 rounded-full border-2 border-product-library-priorities-p4-primary-idle-fill"
                    }
                ></div>
                <div
                    className={
                        "inset-0 absolute group-hover/check:flex justify-center items-center hidden"
                    }
                >
                    <VerifiedIcon
                        className={
                            "text-product-library-actionable-quaternary-idle-tint"
                        }
                    />
                </div>
            </button>
            {openMyTaskDetailForm ? <MyTaskDetailHeaderForm onCancelForm={handleCloseMyTaskDetailForm}/> : (
                <div role={"button"} className={"flex flex-col"} onClick={handleOpenMyTaskDetailForm}>
                    <div className={"text-header font-medium"}>
                        <MyTaskContent content={taskDetail?.content}/>
                    </div>
                    <div className={"mt-small mb-xsmall ml-px flex"}>
                        <div className={"flex justify-center items-center"}>
                            <img src={DescriptionIcon} alt={"description-icon"}/>
                        </div>
                        <p className={"text-sm text-product-library-display-tertiary-idle-tint"}>{taskDetail?.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTaskDetailHeaderMainSection;
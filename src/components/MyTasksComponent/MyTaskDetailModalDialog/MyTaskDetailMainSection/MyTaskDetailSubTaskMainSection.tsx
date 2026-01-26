import TaskSmallArrowDownIcon from "../../../icons/TaskSmallArrowDownIcon.tsx";
import VerifiedIcon from "../../../icons/VerifiedIcon.tsx";
import ChildrenIcon from "../../../../assets/children-icon.svg";
import AddMyTaskButtonSection from "../../AddMyTaskButtonSection.tsx";
import {useTaskStore} from "../../../../stores/task.store.ts";
import AddMyTaskModalDialog from "../../AddMyTaskComponent";

type MyTaskDetailSubTaskMainSectionProps = {
    taskId: string | null;
}
const MyTaskDetailSubTaskMainSection = ({taskId}: MyTaskDetailSubTaskMainSectionProps) => {
    const {onOpenAddMyTask, addingTaskId, onCloseAddMyTask} = useTaskStore()
    const isTaskAdding = addingTaskId === taskId

    return (
        <>
           <div className={"flex items-center gap-1.5 px-3"}>
               <div className={"flex justify-center items-center w-6 h-6"}>
                   <TaskSmallArrowDownIcon />
               </div>
               <p className={"text-sm font-medium"}>Sub-tasks</p>
               <p className={"text-sm text-product-library-display-secondary-idle-tint"}>0/1</p>
           </div>
            <hr className={"border-t border-product-library-divider-tertiary"}/>
            <div className={"flex items-start gap-1.5"}>
                <div className={"w-6 h-6 flex justify-center items-center"}></div>
                <button
                    type={"button"}
                    aria-checked={"false"}
                    aria-label={"Mark task as complete"}
                    className={"mr-1.5 -ml-0.75 relative group/check"}
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
                <div className={"flex flex-col gap-1.5"}>
                    <p className={"text-sm"}>test11</p>
                    <p className={"text-xs text-product-library-display-secondary-idle-tint"}>text 111</p>
                    <div
                        className={
                            "flex gap-0.5 text-xs text-product-library-display-secondary-idle-tint"
                        }
                    >
                        <img src={ChildrenIcon} alt={"children-icon"} />
                        <span>0/1</span>
                    </div>
                </div>
            </div>
            <hr className={"border-t border-product-library-divider-tertiary"}/>
            <div className={"px-2"}>
                {isTaskAdding ? (
                    <AddMyTaskModalDialog variant={"list"} onCloseAddMyTask={onCloseAddMyTask}/>)
                : (
                    <AddMyTaskButtonSection taskType={"sub-task"} onOpenAddMyTask={() => onOpenAddMyTask(taskId)}/>)}
            </div>
        </>
    );
};

export default MyTaskDetailSubTaskMainSection;
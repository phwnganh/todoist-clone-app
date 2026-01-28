import PlusAddIcon from '../../../../assets/add-icon.svg'
import {useTaskStore} from "../../../../stores/task.store.ts";
import AddMyTaskModalDialog from "../../AddMyTaskComponent";
const MyNoParentTaskDetailAddSubtaskButtonSection = ({taskId}: {taskId: string | null}) => {
    const {addingTaskId, onOpenAddMyTask, onCloseAddMyTask} = useTaskStore()
    const isAdding = addingTaskId === taskId
    return (
        <div className={"mt-3 ml-8"}>
            <button type={"button"} onClick={() => onOpenAddMyTask(taskId)} className={"flex items-center gap-1.5 text-xs text-product-library-actionable-quaternary-idle-tint font-medium rounded-sm hover:bg-product-library-selectable-secondary-hover-fill px-2"}>
                <div className={"flex justify-center items-center w-6 h-6"}>
                    <img src={PlusAddIcon} alt="plus-icon" />
                </div>
                <p>Add sub-task</p>
            </button>
            {isAdding && (<AddMyTaskModalDialog onCloseAddMyTask={onCloseAddMyTask} variant={"list"}/>)}
        </div>
    );
};

export default MyNoParentTaskDetailAddSubtaskButtonSection;
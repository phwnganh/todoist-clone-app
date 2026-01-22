import type {Task} from "../../types/task.type.ts";
import VerifiedIcon from "../icons/VerifiedIcon.tsx";
import MyTaskContent from "./MyTaskContent.tsx";
import ChildrenIcon from "../../assets/children-icon.svg";
import SmallCalendarIcon from "../../assets/small-calendar-icon.svg";

type MyTaskBoardItemProps = {
    task: Task
}
const MyTaskBoardItem = ({task}: MyTaskBoardItemProps) => {
    return (
        <div className={"flex items-start outline outline-border-idle hover:outline-border-hover shadow-sm rounded-large p-2.5"}>
            <button type={"button"} aria-checked={"false"} aria-label={"Mark task as complete"} className={"mt-2 mr-1.5 -ml-0.75 relative group/check"}>
                <div className={"h-5 w-5 rounded-full border-2 border-product-library-priorities-p4-primary-idle-fill"}></div>
                <div className={"inset-0 absolute group-hover/check:flex justify-center items-center hidden"}>
                    <VerifiedIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                </div>
            </button>

            <div className={"py-2 flex flex-col min-w-0"}>
                <div className={"mb-0.75 text-sm"}>
                    <MyTaskContent content={task.content}/>
                </div>
                <p className={"text-xs mb-0.5 text-product-library-display-secondary-idle-tint line-clamp-1"}>{task.description}</p>
                <div className={"flex gap-small items-center"}>
                    {/*{hasChildren &&*/}
                    {/*    <div className={"flex gap-0.5 text-xs text-product-library-display-secondary-idle-tint"}>*/}
                    {/*        <img src={ChildrenIcon} alt={"children-icon"}/>*/}
                    {/*        <span>0/{children.length}</span>*/}
                    {/*    </div>*/}
                    {/*}*/}

                    <button type={"button"} className={"flex gap-0.5 text-xs text-product-library-actionable-primary-idle-fill"}>
                        <img src={SmallCalendarIcon} alt={"small-calendar-icon"}/>
                        <span>Tomorrow</span>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default MyTaskBoardItem;
import {priorityFilterData} from "../../../data/myTaskFilter.data.ts";
import PriorityIcon from "../../icons/PriorityIcon.tsx";
import VerifiedIcon from "../../icons/VerifiedIcon.tsx";

const MyTaskPriorityDropdown = () => {
    return (
        <div id={"priority-listbox"} aria-labelledby={"priority-trigger"} role={"listbox"} className={"absolute top-full z-1000 border border-product-library-border-idle-tint rounded-small w-max bg-white"}>
            {priorityFilterData.map((priority) => {
                return (
                    <div key={priority.key} role={"option"} tabIndex={-1} className={"group flex flex-col py-1 px-1.5 flex-1 w-full hover:bg-product-library-selectable-secondary-hover-fill rounded-small cursor-pointer"}>
                        <div className={"flex items-center gap-1.5"}>
                            <div className="w-6 h-6 flex justify-center items-center shrink-0">
                                <PriorityIcon className={priority.color}/>
                            </div>
                            <div className={"flex items-center gap-1.5"}>
                                <div className="text-sm mx-2.5">{priority.label}</div>
                                <div className={"flex justify-center items-center"}>
                                    <VerifiedIcon className={"text-product-library-actionable-destructive-idle-tint"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default MyTaskPriorityDropdown;
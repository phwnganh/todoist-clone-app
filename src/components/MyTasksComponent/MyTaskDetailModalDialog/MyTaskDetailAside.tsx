import HashtagIcon from "../../icons/HashtagIcon.tsx";
import {getProjectColorClass} from "../../../helpers/getProjectColorClass.ts";
import type {Project} from "../../../types/project.type.ts";
import SmallPlusAddIcon from "../../icons/SmallPlusAddIcon.tsx";
import TaskFlagIcon from '../../../assets/task-flag-priority-icon.svg'
type MyTaskDetailAsideProps = {
    projectDetail: Project | undefined
}
const MyTaskDetailAside = ({projectDetail}: MyTaskDetailAsideProps) => {
    return (
        <aside className={"p-large bg-product-library-background-base-secondary flex flex-col gap-small max-w-65 w-full shrink-0"}>
            <div className={"flex flex-col gap-1.5"}>
                <p className={"text-product-library-display-secondary-idle-tint font-medium text-sm"}>Project</p>
                <div role={"listbox"} className={"px-2 flex items-center"}>
                    <div className={"flex justify-center items-center w-4 h-4 mr-0.5"}>
                        <HashtagIcon className={getProjectColorClass(projectDetail?.color)}/>
                    </div>
                    <span className={
                        "text-product-library-display-secondary-idle-tint font-medium text-sm"
                    }>{projectDetail?.name}</span>
                </div>
                <hr className="border-t border-t-product-library-divider-tertiary" />
                <div className={"flex justify-between items-center"}>
                    <p className={"text-product-library-display-secondary-idle-tint font-medium text-sm"}>Date</p>
                    <button type={"button"} className={"flex justify-center items-center"}>
                        <SmallPlusAddIcon/>
                    </button>
                </div>
                <hr className="border-t border-t-product-library-divider-tertiary" />
                <div className={"flex flex-col gap-1.5"}>
                    <p className={"text-product-library-display-secondary-idle-tint font-medium text-sm"}>Priority</p>
                    <div className={"flex items-center gap-1.5"}>
                        <div className={"flex justify-center items-center w-4 h-4"}>
                            <img src={TaskFlagIcon} alt={"flag-icon"}/>
                        </div>
                        <div className={"ml-xsmall text-sm pr-xsmall"}>
                            P4
                        </div>
                    </div>
                </div>
                <hr className="border-t border-t-product-library-divider-tertiary" />
                <div className={"flex justify-between items-center"}>
                    <p className={"text-product-library-display-secondary-idle-tint font-medium text-sm"}>Labels</p>
                    <button type={"button"} className={"flex justify-center items-center"}>
                        <SmallPlusAddIcon/>
                    </button>
                </div>
            </div>
        </aside>

    );
};

export default MyTaskDetailAside;
import type {Task} from "@/types/task.type.ts";

type MyTaskBoardLabelHeaderProps = {
    tasks?: Task[]
}
const MyTaskBoardLabelHeader = ({tasks}: MyTaskBoardLabelHeaderProps) => {
    return (
        <div className={"flex items-center"}>
            <p className={"font-bold text-sm pt-1.5 pr-1.5 pb-1.25"}>(No Section)</p>
            <span className={"text-sm text-product-library-display-secondary-idle-tint"}>{tasks?.length}</span>
        </div>
    );
};

export default MyTaskBoardLabelHeader;
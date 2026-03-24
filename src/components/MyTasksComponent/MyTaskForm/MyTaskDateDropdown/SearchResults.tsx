import {buildDue, formatFullDate} from "@/helpers/formateDate.ts";
import type {Due} from "@/types/task.type.ts";
import TaskSmallCalendarIcon from "@/components/icons/TaskSmallCalendarIcon.tsx";

type SearchResultsProps = {
    results: Date[]
    onSelectDueDate: (dueDate: Due) => void
}
const SearchResults = ({results, onSelectDueDate}: SearchResultsProps) => {
    return (
        <>
            {results.map((date, index) =>
                 (
                    <div onClick={() => onSelectDueDate(buildDue(date))} key={index} className={"flex items-center gap-small py-1 pr-4 pl-3 cursor-pointer"}>
                        <div className={"flex justify-center items-center w-6 h-6 shrink-0"}>
                            <TaskSmallCalendarIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                        </div>
                        <p className={"font-medium text-sm"}>{formatFullDate(date)}</p>
                    </div>
                )
            )}

        </>

    );
};

export default SearchResults;
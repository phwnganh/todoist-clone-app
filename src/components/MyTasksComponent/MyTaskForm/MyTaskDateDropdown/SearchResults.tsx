import TaskSmallCalendarIcon from '../../../../assets/task-small-calendar-icon.svg'
import {buildDue, formatFullDate} from "../../../../helpers/formateDate.ts";
import type {Due} from "../../../../types/task.type.ts";

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
                            <img src={TaskSmallCalendarIcon} alt={"small-calendar-icon"}/>
                        </div>
                        <p className={"font-medium text-sm"}>{formatFullDate(date)}</p>
                    </div>
                )
            )}

        </>

    );
};

export default SearchResults;
import {dateFilterData} from "../../../data/myTaskFilter.data.ts";
import VerifiedIcon from "../../../assets/verified-icon.svg";

const MyTaskFilterDateDropdown = () => {
    return (
        <div id={"date-listbox"} aria-labelledby={"date-trigger"} role={"listbox"} className={"absolute top-full right-0 z-50 border border-product-library-divider-primary rounded-large shadow-sm max-h-70 max-w-40 w-full bg-white p-1.5 cursor-pointer"}>
            {dateFilterData.map(date => {
                return (
                    <div key={date.key} role={"option"} tabIndex={-1} className={"group flex flex-col py-1 px-1.5 flex-1 w-full hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}>
                        <div className="flex items-center gap-1.5">
                            <div className="flex justify-center items-center invisible group-data-[selected=true]:visible">
                                <img src={VerifiedIcon} alt={"verified-icon"} />
                            </div>
                            <span className="flex items-center gap-small">
                <div className="w-4 h-4 flex justify-center items-center shrink-0"></div>
                <div className="flex gap-1.5 overflow-hidden">
                  <div className="text-sm">{date.label}</div>
                </div>
              </span>
                        </div>

                    </div>
                )
            })}
        </div>
    );
};

export default MyTaskFilterDateDropdown;
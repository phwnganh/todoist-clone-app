import QuestionIcon from '../../assets/question-icon.svg'
import {LAYOUT_ITEMS} from "../../data/menuNavData";
import {Fragment} from "react";
import CustomSwitch from "../ui/CustomSwitch";
import TaskSmallArrowDownIcon from "../icons/TaskSmallArrowDownIcon";

type MyTaskLayoutFiltersDropdownProps = {
    onSelectLayout: (layoutName: string) => void;
    layoutTitle: string;
}
const MyTaskLayoutFiltersDropdown = ({onSelectLayout, layoutTitle}: MyTaskLayoutFiltersDropdownProps) => {

    const layoutItemClass = (layoutName: string) => `
    pt-xsmall px-xsmall pb-small w-full cursor-pointer ${
        layoutTitle === layoutName
            ? "bg-white rounded-large text-product-library-display-primary-idle-tint"
            : "hover:text-product-library-display-primary-idle-tint"
    }`;
    return (
        <div className={"absolute top-full right-0 z-50 rounded-large w-75 shadow-product-library-shadow-raised-1 border border-product-library-divider-primary bg-white"}>
            <div className={"flex flex-col gap-1.5"}>
                <div className={"p-1.5 flex flex-col gap-1.5"}>
                    <div className={"px-1.5 flex justify-between items-center"}>
                        <p className={"text-sm font-medium"}>Layout</p>
                        <div className={"w-6 h-6 flex justify-center items-center"}>
                            <img src={QuestionIcon} alt={"question-icon"}/>
                        </div>
                    </div>

                    <div className={"p-1 flex gap-small"}>
                        <div className="w-full flex justify-center border-2 border-product-library-selectable-background gap-0.75 bg-product-library-selectable-background rounded-large text-product-library-display-secondary-idle-tint ">
                            {LAYOUT_ITEMS.map((layout) => {
                                return (
                                    <Fragment key={layout.key}>
                                        <label className={`${layoutItemClass(layout.key)}`}>
                                            <input
                                                type="radio"
                                                className="sr-only"
                                                value={layout.key}
                                                checked={layoutTitle === layout.key}
                                                onChange={() => onSelectLayout(layout.key)}
                                            />
                                            <span className="flex flex-col gap-xsmall items-center justify-center text-xs">
                          <img src={layout.icon} alt={layout.key} />
                                                {layout.label}
                        </span>
                                        </label>
                                    </Fragment>
                                );
                            })}
                        </div>

                    </div>

                    <div className={"pr-1 pl-1.5 flex justify-between"}>
                        <p className={"text-sm"}>Completed tasks</p>
                        <CustomSwitch/>
                    </div>
                </div>
                <hr className="border-t border-t-product-library-divider-tertiary overflow-hidden" />
                <div className={"px-1.5"}>
                    <div className={"px-1.5 flex items-center justify-between"}>
                        <p className={"text-sm font-medium"}>Sort</p>
                        <div className={"flex justify-center items-center w-7 h-7"}>
                            <TaskSmallArrowDownIcon/>
                        </div>
                    </div>

                    <div className={"py-0.5 px-1 flex items-center gap-small"}>
                        <p className={"text-sm w-full"}>Grouping</p>
                        <div className={"w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between"}>
                            <p className={"text-sm"}>None</p>
                            <div className={"flex justify-center items-center w-7 h-7"}>
                                <TaskSmallArrowDownIcon/>
                            </div>
                        </div>
                    </div>

                    <div className={"py-0.5 px-1 flex items-center gap-small"}>
                        <p className={"text-sm w-full"}>Sorting</p>
                        <div className={"w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between"}>
                            <p className={"text-sm"}>Manual</p>
                            <div className={"flex justify-center items-center w-7 h-7"}>
                                <TaskSmallArrowDownIcon/>
                            </div>
                        </div>

                    </div>

                    <div className={"px-1.5 flex items-center justify-between"}>
                        <p className={"text-sm font-medium"}>Filter</p>
                        <div className={"flex justify-center items-center w-7 h-7"}>
                            <TaskSmallArrowDownIcon/>
                        </div>
                    </div>

                    <div className={"py-0.5 px-1 flex items-center gap-small"}>
                        <p className={"text-sm w-full"}>Date</p>
                        <div className={"w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between"}>
                            <p className={"text-sm"}>All</p>
                            <div className={"flex justify-center items-center w-7 h-7"}>
                                <TaskSmallArrowDownIcon/>
                            </div>
                        </div>
                    </div>

                    <div className={"py-0.5 px-1 flex items-center gap-small"}>
                        <p className={"text-sm w-full"}>Priority</p>
                        <div className={"w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between"}>
                            <p className={"text-sm"}>All</p>
                            <div className={"flex justify-center items-center w-7 h-7"}>
                                <TaskSmallArrowDownIcon/>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


        </div>
    );
};

export default MyTaskLayoutFiltersDropdown;
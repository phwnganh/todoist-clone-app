import QuestionIcon from '../../../assets/question-icon.svg'
import {LAYOUT_ITEMS} from "../../../data/menuNav.data.ts";
import {Fragment, useRef, useState} from "react";
import CustomSwitch from "../../ui/CustomSwitch.tsx";
import TaskSmallArrowDownIcon from "../../icons/TaskSmallArrowDownIcon.tsx";
import type {OpenMyTaskFilterDropdown} from "../../../types/menu-nav.type.ts";
import {useClickOutside} from "../../../hooks/useClickOutside.ts";
import MyTaskFilterGroupingDropdown from "./MyTaskFilterGroupingDropdown.tsx";
import MyTaskFilterSortingDropdown from "./MyTaskFilterSortingDropdown.tsx";
import MyTaskFilterDateDropdown from "./MyTaskFilterDateDropdown.tsx";
import MyTaskFilterPriorityDropdown from "./MyTaskFilterPriorityDropdown.tsx";

type MyTaskLayoutFiltersDropdownProps = {
    onSelectLayout: (layoutName: string) => void;
    layoutTitle: string;
}
const MyTaskLayoutFiltersDropdown = ({onSelectLayout, layoutTitle}: MyTaskLayoutFiltersDropdownProps) => {
    const [openDropdown, setOpenDropdown] = useState<OpenMyTaskFilterDropdown>(null);
    const groupRef = useRef<HTMLDivElement | null>(null);
    const sortRef = useRef<HTMLDivElement | null>(null);
    const dateRef = useRef<HTMLDivElement | null>(null);
    const priorityRef = useRef<HTMLDivElement | null>(null);
    const dummyRef = useRef<HTMLDivElement | null>(null);

    const handleToggleDropdown = (openDropdown: OpenMyTaskFilterDropdown) => {
        setOpenDropdown((prev) => (prev === openDropdown ? null: openDropdown))
    }

    const handleSelectGrouping = () => {
        setOpenDropdown(null)
    }

    const handleSelectSorting = () => {
        setOpenDropdown(null)
    }

    const handleSelectDate = () => {
        setOpenDropdown(null)
    }

    const handleSelectPriority = () => {
        setOpenDropdown(null)
    }

    useClickOutside({
        ref: openDropdown === "grouping" ? groupRef : openDropdown === "sorting" ? sortRef : openDropdown === "date" ? dateRef : openDropdown === "priority" ? priorityRef : dummyRef,
        handler: () => setOpenDropdown(null),
        enabled: openDropdown !== null
    })
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

                    <div className={"pr-1 pl-1.5 flex justify-between items-center"}>
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
                    <div className={"relative"} ref={groupRef}>
                        <button className={"py-0.5 px-1 flex items-center justify-between gap-small w-full"} onClick={() => handleToggleDropdown("grouping")}>
                            <p className={"text-sm"}>Grouping</p>
                            <div className={"cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"}>
                                <p className={"text-sm"}>None</p>
                                <div className={"flex justify-center items-center w-7 h-7"}>
                                    <TaskSmallArrowDownIcon/>
                                </div>
                            </div>
                        </button>
                        {openDropdown === "grouping" && (
                            <MyTaskFilterGroupingDropdown/>
                        )}
                    </div>
                    <div className={"relative"} ref={sortRef}>
                        <button className={"py-0.5 px-1 flex items-center justify-between gap-small w-full"} onClick={() => handleToggleDropdown("sorting")}>
                            <p className={"text-sm"}>Sorting</p>
                            <div className={"cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"}>
                                <p className={"text-sm"}>Manual</p>
                                <div className={"flex justify-center items-center w-7 h-7"}>
                                    <TaskSmallArrowDownIcon/>
                                </div>
                            </div>
                        </button>
                        {openDropdown === "sorting" && (
                            <MyTaskFilterSortingDropdown/>
                        )}
                    </div>

                    <div className={"px-1.5 flex items-center justify-between"}>
                        <p className={"text-sm font-medium"}>Filter</p>
                        <div className={"flex justify-center items-center w-7 h-7"}>
                            <TaskSmallArrowDownIcon/>
                        </div>
                    </div>

                    <div className={"relative"} ref={dateRef}>
                        <button className={"py-0.5 px-1 flex items-center justify-between gap-small w-full"} onClick={() => handleToggleDropdown("date")}>
                            <p className={"text-sm"}>Date</p>
                            <div className={"cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"}>
                                <p className={"text-sm"}>All</p>
                                <div className={"flex justify-center items-center w-7 h-7"}>
                                    <TaskSmallArrowDownIcon/>
                                </div>
                            </div>
                        </button>
                        {openDropdown === "date" && (
                            <MyTaskFilterDateDropdown/>
                        )}
                    </div>

                    <div className={"relative"} ref={priorityRef}>
                        <button className={"py-0.5 px-1 flex items-center justify-between gap-small w-full"} onClick={() => handleToggleDropdown("priority")}>
                            <p className={"text-sm"}>Priority</p>
                            <div className={"cursor-pointer max-w-40 h-7 rounded-small border border-product-library-border-idle-tint pl-2.5 flex items-center justify-between hover:border-product-library-border-focus-tint w-full"}>
                                <p className={"text-sm"}>All</p>
                                <div className={"flex justify-center items-center w-7 h-7"}>
                                    <TaskSmallArrowDownIcon/>
                                </div>
                            </div>

                        </button>
                        {openDropdown === "priority" && (
                            <MyTaskFilterPriorityDropdown/>
                        )}
                    </div>
                </div>

            </div>


        </div>
    );
};

export default MyTaskLayoutFiltersDropdown;
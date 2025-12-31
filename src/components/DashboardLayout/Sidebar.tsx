
import UserAvatar from '../../assets/User-avatar.png'
import SearchIcon from "../icons/SearchIcon.tsx";
import InboxIcon from "../icons/InboxIcon.tsx";
import CalendarIcon from "../icons/CalendarIcon.tsx";
import UpcomingCalendarIcon from "../icons/UpcomingCalendarIcon.tsx";
import FilterIcon from "../icons/FilterIcon.tsx";
import CompletedIcon from "../icons/CompletedIcon.tsx";
import type {MenuNavItem} from "../../types/menu-nav.type.ts";
import AddIcon from "../icons/AddIcon.tsx";
import ArrowDownIcon from "../icons/ArrowDownIcon.tsx";
import HashtagIcon from "../icons/HashtagIcon.tsx";
const Sidebar = () => {
    const MENU_NAV_ITEMS: MenuNavItem[] = [
        {
            key: "search",
            label: "Search",
            icon: <SearchIcon/>
        },
        {
            key: "inbox",
            label: "Inbox",
            icon: <InboxIcon/>
        },
        {
            key: "today",
            label: "Today",
            icon: <CalendarIcon/>
        },
        {
            key: "upcoming",
            label: "Upcoming",
            icon: <UpcomingCalendarIcon/>
        },
        {
            key: "filters",
            label: "Filters & Labels",
            icon: <FilterIcon/>
        },
        {
            key: "completed",
            label: "Completed",
            icon: <CompletedIcon/>
        }
    ]
    return (
        <nav className="flex flex-col h-full bg-product-library-background-base-secondary max-w-70 w-full shrink-0">
            <div className="flex justify-between items-center m-medium pl-2">
                <button className="flex items-center -ml-0.75">
                    <div className="rounded-full w-6.5 h-6.5 bg-white -ml-1.5 mr-1.5">
                        <img src={UserAvatar} alt="User Avatar" className="" />
                    </div>
                    <span className="flex items-center">
                        <span
                            className="whitespace-nowrap text-product-library-display-primary-idle-tint overflow-hidden">Your Name</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                             aria-hidden="true" className="VE070Ri">
                            <path fill="currentColor"
d="M15.646 9.647a.5.5 0 0 1 .708.707l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.707L12 13.294z"></path>
                        </svg>
                    </span>
                </button>
                <button className="flex items-center gap-xsmall">
                        <div role="button" className="w-8 h-8 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="m6.585 15.388-.101.113c-.286.322-.484.584-.484 1h12c0-.416-.198-.678-.484-1l-.101-.113c-.21-.233-.455-.505-.7-.887-.213-.33-.355-.551-.458-.79-.209-.482-.256-1.035-.4-2.71-.214-3.5-1.357-5.5-3.857-5.5s-3.643 2-3.857 5.5c-.144 1.675-.191 2.227-.4 2.71-.103.239-.245.46-.457.79-.246.382-.491.654-.701.887m10.511-2.312c-.083-.341-.131-.862-.241-2.148-.113-1.811-.469-3.392-1.237-4.544C14.8 5.157 13.57 4.5 12 4.5s-2.8.656-3.618 1.883c-.768 1.152-1.124 2.733-1.237 4.544-.11 1.286-.158 1.807-.241 2.148-.062.253-.13.373-.46.884-.198.308-.373.504-.57.723q-.11.12-.232.261c-.293.342-.642.822-.642 1.557a1 1 0 0 0 1 1h3a3 3 0 0 0 6 0h3a1 1 0 0 0 1-1c0-.735-.35-1.215-.642-1.557q-.122-.141-.232-.261c-.197-.22-.372-.415-.57-.723-.33-.511-.398-.63-.46-.884M14 17.5h-4a2 2 0 1 0 4 0" clipRule="evenodd"></path></svg>
                        </div>
                    <div role="button" className="w-8 h-8 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M19 4.001H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2m-15 2a1 1 0 0 1 1-1h4v14H5a1 1 0 0 1-1-1zm6 13h9a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-9z" clipRule="evenodd"></path></svg>
                    </div>
                </button>
            </div>
            <div className="mx-medium mb-small"></div>
            <button className="flex items-center px-2.5 text-product-library-actionable-tertiary-idle-tint">
                <div className="flex justify-center items-center mr-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11m-.711-16.5a.75.75 0 1 1 1.5 0v4.789H17.5a.75.75 0 0 1 0 1.5h-4.711V17.5a.75.75 0 0 1-1.5 0V12.79H6.5a.75.75 0 1 1 0-1.5h4.789z" clipRule="evenodd"></path></svg>
                </div>
                <span className="text-center font-medium text-sm">Add task</span>
            </button>

                <div className="px-medium py-xsmall flex flex-col gap-large">
                    <ul className="flex flex-col list-none">
                        {MENU_NAV_ITEMS.map((item: MenuNavItem, index) => (
                            <li tabIndex={0} className="flex items-center p-1.25 pl-0" key={index}>
                                <div className="flex justify-center items-center">
                                    {item.icon}
                                </div>
                                <span className="text-sm wrap-break-word py-0.75 pl-1.25">{item.label}</span>
                                <div className="w-6 h-6 flex items-center justify-center ml-auto"></div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center">
                        <p className="font-medium text-product-library-display-secondary-idle-tint text-sm pl-xsmall py-xsmall">My Projects</p>
                        <div className="flex items-center ml-auto shrink-0">
                            <button className="w-7 h-7 flex justify-center items-center">
                                <AddIcon/>
                            </button>
                            <button className="w-7 h-7 flex justify-center items-center">
                                <ArrowDownIcon/>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="p-1.25 flex items-center">
                            <div className="flex justify-center items-center">
                                <HashtagIcon/>
                            </div>
                            <div className="py-0.75 pl-1.25 text-sm">
                                Getting Started
                            </div>
                        </div>
                        <div className="w-7 h-7 flex justify-center items-center ml-auto"></div>

                    </div>
                </div>
        </nav>
    );
};

export default Sidebar;
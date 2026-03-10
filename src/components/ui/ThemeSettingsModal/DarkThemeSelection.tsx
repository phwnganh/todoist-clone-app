import TodoistVerifiedIcon from "@/assets/todoist-verified-icon.svg";

const DarkThemeSelection = () => {
    return (
        <>
            <span className={"px-xsmall py-small flex flex-col gap-xsmall bg-theme-card-sidebar-color-dark"}>
                        <span className={"w-9 h-2 rounded-3xl bg-theme-card-accent-color-dark"}></span>
                        <span className={"w-9 h-2 rounded-3xl bg-theme-card-sidebar-selected-color-dark"}></span>
                        <span className={"w-9 h-2 rounded-3xl bg-theme-card-sidebar-hover-color-dark"}></span>
                        <span className={"w-9 h-2 rounded-3xl bg-theme-card-sidebar-hover-color-dark"}></span>
                    </span>
            <span className={"px-small pb-small flex flex-col gap-small bg-theme-card-background-color-dark"}>
                        <span className={"flex items-center justify-between"}>
                            <p className={"text-xs font-strong text-theme-card-accent-color-dark"}>Todoist</p>
                            <div className={"flex justify-center items-center w-6 h-6 shrink-0"}>
                                <img src={TodoistVerifiedIcon} alt={"verified"}/>
                            </div>
                        </span>
                        <span className={"grid items-center gap-small grid-rows-[min-content_min-content] grid-cols-[min-content_100px_auto_min-content]"}>
                            <span className={"border border-theme-card-priority-color-dark rounded-full w-2.5 h-2.5 row-[1/2] col-[1/2]"}></span>
                            <span className={"rounded-3xl h-2 bg-theme-card-content-color-dark row-[1/2] col-[2/5]"}></span>
                            <span className={"rounded-3xl h-2 bg-theme-card-content-color-dark row-[2/3] col-[2/3]"}></span>
                        </span>
                    </span>
        </>
    );
};

export default DarkThemeSelection;
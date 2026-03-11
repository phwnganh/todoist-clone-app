import TodoistVerifiedIcon from '@/assets/todoist-verified-icon.svg'

const LightThemeSelection = () => {
    return (
        <>
            <span className={"px-xsmall py-small flex flex-col gap-xsmall bg-theme-card-sidebar-color"}>
                        <span className={"w-9 h-2 rounded-3xl bg-theme-card-accent-color"}></span>
                        <span className={"w-9 h-2 rounded-3xl bg-theme-card-sidebar-selected-color"}></span>
                        <span className={"w-9 h-2 rounded-3xl bg-theme-card-sidebar-hover-color"}></span>
                        <span className={"w-9 h-2 rounded-3xl bg-theme-card-sidebar-hover-color"}></span>
                    </span>
            <span className={"px-small pb-small flex flex-col gap-small bg-white"}>
                        <span className={"flex items-center justify-between"}>
                            <p className={"text-xs font-strong text-theme-card-accent-color"}>Todoist</p>
                            <div className={"flex justify-center items-center w-6 h-6 shrink-0"}>
                                <img src={TodoistVerifiedIcon} alt={"verified"}/>
                            </div>
                        </span>
                        <span className={"grid items-center gap-small grid-rows-[min-content_min-content] grid-cols-[min-content_100px_auto_min-content]"}>
                            <span className={"border border-theme-card-priority-color rounded-full w-2.5 h-2.5 row-[1/2] col-[1/2]"}></span>
                            <span className={"rounded-3xl h-2 bg-theme-card-content-color row-[1/2] col-[2/5]"}></span>
                            <span className={"rounded-3xl h-2 bg-theme-card-content-color row-[2/3] col-[2/3]"}></span>
                        </span>
                    </span>
        </>
    );
};

export default LightThemeSelection;
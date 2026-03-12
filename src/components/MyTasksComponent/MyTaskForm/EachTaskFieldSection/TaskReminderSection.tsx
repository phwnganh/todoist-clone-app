import TaskClockReminderIcon from "@/components/icons/TaskClockReminderIcon.tsx";

type TaskReminderSectionProps = {
    variant?: string;

}
const TaskReminderSection = ({variant}: TaskReminderSectionProps) => {
    return (
        <div
            role={"button"}
            className={
                "px-1.5 flex justify-center items-center border border-product-library-border-idle-tint rounded-small h-7 hover:bg-product-library-selectable-secondary-hover-fill cursor-pointer"
            }
        >
            <div className={"flex items-center"}>
                <div className={"w-4 h-4 flex justify-center items-center"}>
                    <TaskClockReminderIcon className={"text-product-library-actionable-quaternary-idle-tint"}/>
                </div>
                {variant === "list" && (
                    <div
                        className={
                            "ml-xsmall text-sm text-product-library-display-secondary-idle-tint pr-xsmall"
                        }
                    >
                        Reminders
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskReminderSection;
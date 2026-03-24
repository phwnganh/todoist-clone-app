import DarkEmptyInboxTask from "@/assets/dark-empty-inbox-tasks.png";
import LightEmptyInboxTask from "@/assets/light-empty-inbox-tasks.png";
import SmallPlusIcon from "@/components/icons/SmallPlusIcon.tsx";
import { useThemeStore } from "@/stores/theme.store.ts";
import CustomButton from "@/components/ui/CustomButton.tsx";
const EmptyInboxTasks = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className={
        "flex flex-col justify-center items-center max-w-90 w-full mx-auto"
      }
    >
      <img
        src={theme === "dark" ? DarkEmptyInboxTask : LightEmptyInboxTask}
        alt={"empty-inbox-tasks"}
      />
      <p
        className={
          "my-small text-base text-product-library-display-primary-idle-tint font-medium"
        }
      >
        Capture now, plan later
      </p>
      <span
        className={
          "text-product-library-display-secondary-idle-tint px-xlarge text-center text-sm"
        }
      >
        Inbox is your go-to spot for quick task entry. Clear your mind now,
        organize when you’re ready.
      </span>

      <CustomButton
        type={"button"}
        className={`mt-large hover:bg-product-library-actionable-destructive-hover-fill bg-product-library-actionable-primary-idle-fill px-3 py-1.5`}
      >
        <div
          aria-hidden={"true"}
          className={"flex justify-center items-center mr-1.5 w-3 h-3 shrink-0"}
        >
          <SmallPlusIcon className={"text-white"} />
        </div>
        <span className={"text-white text-sm font-medium"}>Add task</span>
      </CustomButton>
    </div>
  );
};

export default EmptyInboxTasks;

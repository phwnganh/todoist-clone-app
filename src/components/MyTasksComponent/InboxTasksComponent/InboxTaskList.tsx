import type { Section } from "@/types/section.type.ts";
import type { Task } from "@/types/task.type.ts";
import MyTaskListGroupSection from "@/components/MyTasksComponent/TasksGroupComponent/MyTaskListGroupSection.tsx";
import MyTaskListSection from "@/components/MySectionComponent/MyTaskListSectionComponent/MyTaskListSection.tsx";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { TaskGroup } from "@/types/viewOptions.type.ts";
import EmptyInboxTasks from "@/components/ui/EmptyInboxTasks.tsx";
import LoadingSpin from "@/components/ui/LoadingSpin.tsx";

type InboxTaskListProps = {
  sections?: Section[];
  isGrouping: boolean;
  groupedTasks: TaskGroup[];
  noSection?: Section;
  tasks: Task[];
  isLoading: boolean;
};

const InboxTaskList = ({
  sections,
  isGrouping,
  groupedTasks,
  noSection,
  tasks,
  isLoading,
}: InboxTaskListProps) => {
  if (isLoading) {
    return <LoadingSpin />;
  }
  if (sections?.length === 0) {
    return <EmptyInboxTasks />;
  }
  return (
    <>
      {isGrouping ? (
        groupedTasks.map((group, index) => (
          <MyTaskListGroupSection
            key={index}
            title={group.title}
            tasks={group.tasks}
            sections={sections}
          />
        ))
      ) : (
        <>
          <MyTaskListSection
            section={noSection}
            tasks={tasks}
            isLoading={isLoading}
          />
          <SortableContext
            items={(sections ?? [])?.map((s) => s.id!)}
            strategy={verticalListSortingStrategy}
          >
            {sections?.map((section) => (
              <MyTaskListSection
                key={section.id}
                section={section}
                tasks={tasks}
                isLoading={isLoading}
              />
            ))}
          </SortableContext>
        </>
      )}
    </>
  );
};

export default InboxTaskList;

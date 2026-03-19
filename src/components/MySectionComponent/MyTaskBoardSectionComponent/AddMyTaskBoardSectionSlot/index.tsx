import { useSectionStore } from "@/stores/section.store.ts";
import AddMyTaskSection from "../../AddMySectionComponent/AddMySection.tsx";
import AddEachMyTaskBoardSectionButton from "./AddEachMyTaskBoardSectionButton.tsx";

type AddMyTaskBoardSectionSlotProps = {
  sectionId?: string | null;
};
const AddMyTaskBoardSectionSlot = ({sectionId,
}: AddMyTaskBoardSectionSlotProps) => {
  const { addSectionId, onOpenAddSectionForm } =
    useSectionStore();

  const isOpenAddMyTaskBoardSection = addSectionId === sectionId;
  return (
    <div className={"relative mr-2"}>
      {isOpenAddMyTaskBoardSection ? (
        <AddMyTaskSection />
      ) : (
        <AddEachMyTaskBoardSectionButton
          onAddMyTaskSectionForm={() => onOpenAddSectionForm(sectionId)}
        />
      )}
    </div>
  );
};

export default AddMyTaskBoardSectionSlot;

import {useSectionStore} from "../../../../stores/section.store.ts";
import AddMyTaskSection from "../../AddMyTaskSectionComponent";
import AddEachMyTaskBoardSectionButton from "./AddEachMyTaskBoardSectionButton.tsx";

type AddMyTaskBoardSectionSlotProps = {
    addedSectionId: string | null
}
const AddMyTaskBoardSectionSlot = ({addedSectionId}: AddMyTaskBoardSectionSlotProps) => {
    const {addSectionId, onOpenAddSectionForm, onCloseAddSectionForm} = useSectionStore()

    const isOpenAddMyTaskBoardSection = addSectionId === addedSectionId;
    return (
        <div className={"relative mr-2"}>
            {isOpenAddMyTaskBoardSection ? (
                <AddMyTaskSection onCancelAddMyTaskSection={onCloseAddSectionForm}/>
            ) : (
                <AddEachMyTaskBoardSectionButton onAddMyTaskSectionForm={() => onOpenAddSectionForm(addedSectionId)}/>
            )}
        </div>
    );
};

export default AddMyTaskBoardSectionSlot;
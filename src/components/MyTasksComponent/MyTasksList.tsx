import MyTaskListSection from "../MyTaskSectionComponent/MyTaskListSectionComponent/MyTaskListSection.tsx";
import {useProjectStore} from "../../stores/project.store.ts";
import type {Section} from "../../types/section.type.ts";

type MyTasksListProps = {
    filteredSectionsByProject: Section[] | undefined;
}
const MyTasksList = ({filteredSectionsByProject}: MyTasksListProps) => {
    const projectId = useProjectStore(state => state.projectId)

    const NO_SECTION = {
        id: null,
        name: "(No section)",
        project_id: projectId
    } as Section

    return (
        <>
            <MyTaskListSection section={NO_SECTION}/>
            {filteredSectionsByProject?.map(section =>
                <MyTaskListSection key={section.id} section={section}/>
            )
            }

        </>
    );
};

export default MyTasksList;
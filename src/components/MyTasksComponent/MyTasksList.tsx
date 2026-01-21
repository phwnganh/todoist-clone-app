import MyTaskSection from "../MyTaskSectionComponent/MyTaskSection.tsx";
import {useGetAllSections} from "../../hooks/useSections.ts";
import {useProjectStore} from "../../stores/project.store.ts";
import type {Section} from "../../types/section.type.ts";

const MyTasksList = () => {
    const {data: sections} = useGetAllSections()
    const projectId = useProjectStore(state => state.projectId)
    const filteredSectionsByProject = sections?.results?.filter(section => section.project_id === projectId)
    const NO_SECTION = {
        id: null,
        name: "(No section)",
        project_id: projectId
    } as Section

    return (
        <>
            <MyTaskSection section={NO_SECTION}/>
            {filteredSectionsByProject?.map(section =>
                <MyTaskSection key={section.id} section={section}/>
            )
            }

        </>
    );
};

export default MyTasksList;
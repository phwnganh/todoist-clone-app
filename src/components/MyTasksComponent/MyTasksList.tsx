import MyTaskSection from "../MyTaskSectionComponent/MyTaskSection.tsx";
import {useGetAllSections} from "../../hooks/useSections.ts";
import {useProjectStore} from "../../stores/project.store.ts";

const MyTasksList = () => {
    const {data: sections} = useGetAllSections()
    const projectId = useProjectStore(state => state.projectId)
    const filteredSectionsByProject = sections?.results?.filter(section => section.project_id === projectId)

    return (
        <>
            {filteredSectionsByProject?.map(section =>
                <MyTaskSection key={section.id} section={section}/>
            )
            }
        </>
    );
};

export default MyTasksList;
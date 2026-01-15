import {useGetAProject} from "../../hooks/useProjects.ts";
import LoadingSpin from "../ui/LoadingSpin.tsx";

const MyTaskTitle = ({projectId}: {projectId: string}) => {
    const {data: projectDetail, isLoading} = useGetAProject(projectId)

    if (isLoading) {
        return (
            <div className={"mt-medium"}>
                <LoadingSpin />
            </div>
        );
    }
    return (
        <h1 className={"p-1 font-strong text-product-library-display-primary-idle-tint text-header-large"}>{projectDetail?.name}</h1>

    );
};

export default MyTaskTitle;
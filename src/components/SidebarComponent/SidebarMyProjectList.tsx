import {Fragment} from "react";
import SidebarMyProjectsItem from "./SidebarMyProjectsItem.tsx";
import {useGetAllProjects} from "../../hooks/useProjects.ts";
import LoadingSpin from "../ui/LoadingSpin.tsx";
import ErrorDisplayed from "../ui/ErrorDisplayed.tsx";

const SidebarMyProjectList = () => {
    const {data: projects, isLoading, isError} = useGetAllProjects()
    if(isLoading){
        return (<div className={"mt-medium"}>
            <LoadingSpin/></div>)
    }

    if(isError){
        return <ErrorDisplayed/>
    }
    return (
        <>
            {projects?.results.map(project => (
                    <Fragment key={project.id}>
                        <SidebarMyProjectsItem project={project}/>
                    </Fragment>
                )
            )}
        </>
    );
};

export default SidebarMyProjectList;
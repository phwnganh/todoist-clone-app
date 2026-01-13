import MyProjectsItem from "./MyProjectsItem.tsx";
import {useGetAllProjects} from "../../hooks/useProjects.ts";
import LoadingSpin from "../ui/LoadingSpin.tsx";
import ErrorDisplayed from "../ui/ErrorDisplayed.tsx";
import {useMemo} from "react";

type MyProjectsListProps = {
    search: string;
}
const MyProjectsList = ({search}: MyProjectsListProps) => {
    const {data: projects, isLoading, isError} = useGetAllProjects()

    const filteredProjects = useMemo(() => {
        if(!projects?.results){
            return []
        }
        if(!search){
            return projects.results;
        }
        return projects?.results.filter(project => project.name.toLowerCase().includes(search.toLowerCase()))
    }, [projects?.results, search]);

    if(isLoading){
        return (<div className={"mt-medium"}>
            <LoadingSpin/>
        </div>)
    }

    if(isError){
        return <ErrorDisplayed/>
    }
  return (
    <>
      <div className="mt-medium flex flex-col gap-4">
        <div className="font-medium text-sm text-product-library-display-primary-idle-tint">
            {filteredProjects.length} projects
        </div>
        <hr className="border-t border-t-product-library-divider-tertiary" />
      </div>
        {filteredProjects.map(project => (
            <div role={"button"} key={project.id} className="group pt-3 flex justify-between pr-3 py-3 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
                <MyProjectsItem project={project} />
            </div>
        ))}

    </>
  );
};

export default MyProjectsList;

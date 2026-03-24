import { Fragment } from "react";
import SidebarMyProjectsItem from "./SidebarMyProjectsItem.tsx";
import { useGetAllProjects } from "@/hooks/useQueryHook/useProjects.ts";
import LoadingSpin from "@/components/ui/LoadingSpin.tsx";
import ErrorDisplayed from "@/components/ui/ErrorDisplayed.tsx";

const SidebarMyProjectList = () => {
  const { data: projects, isLoading, isError } = useGetAllProjects();
  const filterProjects = projects?.results?.filter(p => p.name !== "Inbox")
  if (isLoading) {
    return (
      <div className={"mt-medium"}>
        <LoadingSpin />
      </div>
    );
  }

  if (isError) {
    return <ErrorDisplayed />;
  }
  return (
    <>
      {filterProjects?.map((project) => (
        <Fragment key={project.id}>
          <SidebarMyProjectsItem project={project} />
        </Fragment>
      ))}
    </>
  );
};

export default SidebarMyProjectList;

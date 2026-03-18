import MyProjectsItem from "./MyProjectsItem.tsx";
import { useGetAllProjects } from "@/hooks/useQueryHook/useProjects.ts";
import LoadingSpin from "@/components/ui/LoadingSpin.tsx";
import ErrorDisplayed from "@/components/ui/ErrorDisplayed.tsx";
import { useMemo } from "react";
import EmptyList from "@/components/ui/EmptyList.tsx";
import EditProjectModalDialog from "./EditProjectModalDialog";
import DeleteProjectsModalDialog from "./DeleteProjectsModalDialog";
import {useProjectStore} from "@/stores/project.store.ts";

type MyProjectsListProps = {
  search: string;
};
const MyProjectsList = ({ search }: MyProjectsListProps) => {
  const { data: projects, isLoading, isError } = useGetAllProjects();
  const {editProjectDetail, deleteProjectDetail, onCloseEditProjectDetail, onCloseDeleteProjectDetail} = useProjectStore()
  const filteredProjects = useMemo(() => {
    if (!projects?.results) {
      return [];
    }

    const filteredProjects = projects.results.filter(p => p.name !== "Inbox")
    if (!search) {
      return filteredProjects;
    }
    return filteredProjects.filter((project) =>
      project.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [projects, search]);

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
      <div className="mt-medium flex flex-col gap-4">
        <div className="font-medium text-sm text-product-library-display-primary-idle-tint">
          {filteredProjects.length} projects
        </div>
        <hr className="border-t border-t-product-library-divider-tertiary" />
      </div>
      {filteredProjects?.length > 0 ? (
        filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group pt-3 flex justify-between pr-3 py-3 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"
          >
            <MyProjectsItem
              project={project}
            />
          </div>
        ))
      ) : (
        <EmptyList />
      )}
      {editProjectDetail && (
        <EditProjectModalDialog
          onClose={onCloseEditProjectDetail}
          project={editProjectDetail}
        />
      )}
      {deleteProjectDetail && (
        <DeleteProjectsModalDialog
          onClose={onCloseDeleteProjectDetail}
          project={deleteProjectDetail}
        />
      )}
    </>
  );
};

export default MyProjectsList;

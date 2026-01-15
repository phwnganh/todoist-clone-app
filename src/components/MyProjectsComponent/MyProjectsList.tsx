import MyProjectsItem from "./MyProjectsItem.tsx";
import { useGetAllProjects } from "../../hooks/useProjects.ts";
import LoadingSpin from "../ui/LoadingSpin.tsx";
import ErrorDisplayed from "../ui/ErrorDisplayed.tsx";
import { useMemo, useState } from "react";
import EmptyList from "../ui/EmptyList.tsx";
import EditProjectModalDialog from "./EditProjectModalDialog";
import { useNavigate } from "react-router-dom";
import { PROJECT_DETAILS } from "../../constants/routes.constants.ts";
import { type MouseEvent } from "react";
import DeleteProjectsModalDialog from "./DeleteProjectsModalDialog";

type MyProjectsListProps = {
  search: string;
};
const MyProjectsList = ({ search }: MyProjectsListProps) => {
  const { data: projects, isLoading, isError } = useGetAllProjects();
  const navigate = useNavigate();
  const [openProjectDetailToolbar, setOpenProjectDetailToolbar] = useState<
    string | null
  >(null);
  const [editProjectDetail, setEditProjectDetail] = useState<string | null>(
    null
  );
  const [deleteProjectDetail, setDeleteProjectDetail] = useState<string | null>(
    null
  );
  const handleOpenProjectDetailToolbar = (
    id: string,
    e: MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setOpenProjectDetailToolbar(id);
  };

  const handleCloseProjectDetailToolbar = () => {
    setOpenProjectDetailToolbar(null);
  };

  const handleEditProjectDetail = (id: string) => {
    setEditProjectDetail(id);
  };

  const handleCloseEditProjectDetail = () => {
    setEditProjectDetail(null);
  };

  const handleDeleteProjectDetail = (id: string) => {
    setDeleteProjectDetail(id);
  };

  const handleCloseDeleteProjectDetail = () => {
    setDeleteProjectDetail(null);
  };
  const filteredProjects = useMemo(() => {
    if (!projects?.results) {
      return [];
    }
    if (!search) {
      return projects.results;
    }
    return projects?.results.filter((project) =>
      project.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [projects?.results, search]);

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
            role={"button"}
            key={project.id}
            onClick={() => navigate(`${PROJECT_DETAILS}/${project.id}`)}
            className="group pt-3 flex justify-between pr-3 py-3 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"
          >
            <MyProjectsItem
              project={project}
              isOpenProjectDetailToolbar={
                openProjectDetailToolbar === project.id
              }
              onOpenProjectDetailToolbar={(e: MouseEvent<HTMLDivElement>) =>
                handleOpenProjectDetailToolbar(project.id, e)
              }
              onCloseProjectDetailToolbar={handleCloseProjectDetailToolbar}
              onEditProjectDetail={() => handleEditProjectDetail(project.id)}
              onDeleteProjectDetail={() =>
                handleDeleteProjectDetail(project.id)
              }
            />
          </div>
        ))
      ) : (
        <EmptyList />
      )}
      {editProjectDetail && (
        <EditProjectModalDialog
          onClose={handleCloseEditProjectDetail}
          projectId={editProjectDetail}
        />
      )}
      {deleteProjectDetail && (
        <DeleteProjectsModalDialog
          onClose={handleCloseDeleteProjectDetail}
          projectId={deleteProjectDetail}
        />
      )}
    </>
  );
};

export default MyProjectsList;

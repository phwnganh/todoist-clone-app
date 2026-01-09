import MyProjectsItem from "./MyProjectsItem.tsx";
import {useProjects} from "../../hooks/useProjects.ts";

const MyProjectsList = () => {
    const {data: projects, isLoading, isError} = useProjects()
  return (
    <>
      <div className="mt-medium flex flex-col gap-4">
        <div className="font-medium text-sm text-product-library-display-primary-idle-tint">
            {projects?.results.length} projects
        </div>
        <hr className="border-t border-t-product-library-divider-tertiary" />
      </div>
        {projects?.results.map(project => (
            <button key={project.id} className="group pt-3 flex justify-between pr-3 py-3 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
                <MyProjectsItem project={project} isLoading={isLoading} isError={isError} />
            </button>
        ))}

    </>
  );
};

export default MyProjectsList;

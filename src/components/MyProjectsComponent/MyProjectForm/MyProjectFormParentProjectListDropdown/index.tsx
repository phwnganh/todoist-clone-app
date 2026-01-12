import { useEffect, useMemo, useRef, useState } from "react";
import SearchInput from "./SearchInput.tsx";
import NoParentOption from "./NoParentOption.tsx";
import ParentProjectOptions from "./ParentProjectOptions.tsx";
import DropdownFooter from "./DropdownFooter.tsx";
import {useGetAllProjects} from "../../../../hooks/useProjects.ts";
import LoadingSpin from "../../../ui/LoadingSpin.tsx";
import ErrorDisplayed from "../../../ui/ErrorDisplayed.tsx";
import {useDebounce} from "../../../../hooks/useDebounce.ts";

type MyProjectFormParentProjectListProps = {
  selectedProject: string | null;
  onSelect: (parentProject: string) => void;
};
const MyProjectFormParentProjectListDropdown = ({
  selectedProject,
  onSelect,
}: MyProjectFormParentProjectListProps) => {
  const NO_PARENT = "No Parent";
  const [typedParentProject, setTypedParentProject] = useState<string>("");
  const keyword = typedParentProject.trim().toLowerCase();
  const debounceSearchKeyword = useDebounce(keyword, 500)

  const trimmedParentProjectValue = typedParentProject.trim();
  const hasKeyword = trimmedParentProjectValue.length > 0;
  const searchInputRef = useRef<HTMLInputElement>(null);

  const {data: parentProjects, isLoading, isError} = useGetAllProjects();

  const filteredProjects = useMemo(() => {
    if (!hasKeyword) return parentProjects?.results;
    return parentProjects?.results.filter((project) =>
      project.name.toLowerCase().includes(debounceSearchKeyword)
    );
  }, [debounceSearchKeyword, hasKeyword, parentProjects]);

  const isNoParentMatched =
    !hasKeyword || NO_PARENT.toLowerCase().includes(debounceSearchKeyword);
  const isNotProjectsFound =
    hasKeyword && !isNoParentMatched && filteredProjects?.length === 0;

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  if(isLoading){
    return <LoadingSpin/>
  }

  if(isError){
    return <ErrorDisplayed/>
  }

  return (
    <div
      id="parentProject-listbox"
      role="listbox"
      aria-labelledby="parentProject-trigger"
      className="absolute top-full z-1000 border border-product-library-divider-primary rounded-large shadow-sm overflow-y-auto scrollbar-thin scrollbar-custom max-h-70 w-full mt-1 bg-white"
    >
      <SearchInput
        parentProjectValue={typedParentProject}
        onParentProjectsSearched={setTypedParentProject}
        inputRef={searchInputRef}
      />
      <hr className="border-t border-t-product-library-divider-tertiary" />

      {/*parent project list*/}
      <div className="p-1.5 flex flex-col">
        {isNoParentMatched && (
          <NoParentOption
            isNoParentSelected={selectedProject === NO_PARENT}
            onNoParentSelected={() => onSelect(NO_PARENT)}
          />
        )}
        {typedParentProject.trim().length === 0 && (
          <div className="py-1.5 px-2.5 font-medium text-sm text-product-library-display-secondary-idle-tint">
            My Projects
          </div>
        )}
        {filteredProjects?.map((project) => (
          <ParentProjectOptions
            key={project.id}
            project={project}
            isParentProjectsSelected={selectedProject === project.name}
            onParentProjectsSelected={onSelect}
          />
        ))}

        <DropdownFooter
          hasKeyword={hasKeyword}
          keyword={trimmedParentProjectValue}
          showNotFound={isNotProjectsFound}
        />
      </div>
    </div>
  );
};

export default MyProjectFormParentProjectListDropdown;

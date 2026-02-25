import HashtagIcon from "../../icons/HashtagIcon.tsx";
import { getProjectColorClass } from "../../../helpers/getProjectColorClass.ts";
import type { Project } from "../../../types/project.type.ts";
import LargeCloseIcon from "../../../assets/large-close-icon.svg";
import type { Section } from "../../../types/section.type.ts";
import SectionIcon from "../../icons/SectionIcon.tsx";
type MyTaskDetailTitleSectionProps = {
  projectDetail: Project | undefined;
  sectionDetail?: Section | null;
  onCloseTaskDetail: () => void;
};
const MyTaskDetailTitleSection = ({
  sectionDetail,
  projectDetail,
  onCloseTaskDetail,
}: MyTaskDetailTitleSectionProps) => {
  return (
    <header
      className={
        "flex justify-between py-small px-medium border-b border-product-library-divider-tertiary"
      }
    >
      <div className={"px-2 flex items-center gap-1.5"}>
        <div className={"flex justify-center items-center w-4 h-4 mr-0.5"}>
          <HashtagIcon className={getProjectColorClass(projectDetail?.color)} />
        </div>
        <span
          className={
            "text-product-library-display-secondary-idle-tint font-medium text-sm"
          }
        >
          {projectDetail?.name}
        </span>
        {sectionDetail && (
          <>
            <div
              className={
                "text-sm text-product-library-display-secondary-idle-tint"
              }
            >
              /
            </div>
            <span className={"flex items-center"}>
              <div className={"flex justify-center items-center"}>
                <SectionIcon />
              </div>
              <p
                className={
                  "text-product-library-display-secondary-idle-tint font-medium text-sm"
                }
              >
                {sectionDetail?.name}
              </p>
            </span>
          </>
        )}
      </div>
      <button
        aria-label="Close dialog"
        className="flex justify-center items-center"
        onClick={onCloseTaskDetail}
      >
        <img src={LargeCloseIcon} alt={"large-close-icon"} />
      </button>
    </header>
  );
};

export default MyTaskDetailTitleSection;

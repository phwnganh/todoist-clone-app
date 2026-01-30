import VerifiedIcon from "../../../icons/VerifiedIcon.tsx";
import type {Section} from "../../../../types/section.type.ts";
import SectionIcon from "../../../icons/SectionIcon.tsx";
import type {Project} from "../../../../types/project.type.ts";

type SectionsOfProjectOptionsProps = {
    section: Section;
    project: Project;
    isSectionsSelected: boolean;
    onSelectedSection: (section: Section) =>void;
}
const SectionsOfProjectOptions = ({section, onSelectedSection, isSectionsSelected}: SectionsOfProjectOptionsProps) => {
    return (
        <div role={"option"}
             aria-selected={isSectionsSelected}
             tabIndex={-1}
             data-selected={isSectionsSelected}
        onClick={e => {
            e.preventDefault()
            onSelectedSection(section)
        }} className={"group/section flex items-center gap-1.5 pl-6 py-1 ml-small justify-between data-[selected=true]:bg-product-library-selectable-secondary-hover-fill hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}>
            <div className={"flex items-center gap-1.5"}>
                <div className={"flex justify-center items-center w-6 h-6"}>
                    <SectionIcon/>
                </div>
                <div className={"text-sm"}>{section.name}</div>
            </div>
            <div
                className={
                    "flex justify-center items-center invisible group-data-[selected=true]:visible"
                }
            >
                <VerifiedIcon
                    className={"text-product-library-display-accent-primary-tint"}
                />
            </div>
        </div>
    );
};

export default SectionsOfProjectOptions;
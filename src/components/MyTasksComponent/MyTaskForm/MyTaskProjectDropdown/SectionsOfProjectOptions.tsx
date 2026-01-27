import VerifiedIcon from "../../../icons/VerifiedIcon.tsx";
import type {Section} from "../../../../types/section.type.ts";
import SectionIcon from "../../../icons/SectionIcon.tsx";

type SectionsOfProjectOptionsProps = {
    section: Section;
}
const SectionsOfProjectOptions = ({section}: SectionsOfProjectOptionsProps) => {
    return (
        <div role={"option"}
             // aria-selected={}
             tabIndex={-1}
             // data-selected={}
        onMouseDown={e => {
            e.preventDefault()
        }} className={"group/section flex items-center gap-1.5 pl-6 py-1 mx-small justify-between data-[selected=true]:bg-product-library-selectable-secondary-hover-fill hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}>
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
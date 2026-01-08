import VerifiedIcon from "../../icons/VerifiedIcon.tsx";

type NoParentOptionProps = {
    isNoParentSelected: boolean;
    onNoParentSelected: () => void;
}

const NoParentOption = ({isNoParentSelected, onNoParentSelected}: NoParentOptionProps) => {
    return (
        <button data-selected={isNoParentSelected} onClick={onNoParentSelected} className="group flex items-center gap-small py-1 px-1.5 w-full hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
            <div className="flex justify-center items-center invisible group-data-[selected=true]:visible">
                <VerifiedIcon/>
            </div>
            <div className="text-sm">No Parent</div>

        </button>
    );
};

export default NoParentOption;
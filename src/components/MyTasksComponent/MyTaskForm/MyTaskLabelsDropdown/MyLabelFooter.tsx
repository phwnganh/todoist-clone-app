import PlusIcon from "../../../../assets/plus-icon.svg";

type MyLabelFooterProps = {
    hasKeyword: boolean
    keyword: string
    showNotFound: boolean
}
const MyLabelFooter = ({hasKeyword, keyword, showNotFound}: MyLabelFooterProps) => {
    if(!hasKeyword) return null;
    return (
        <>
            {showNotFound && (
                <p className="text-sm text-product-library-display-secondary-idle-tint px-2.5 py-1">Label not found</p>
            )}
            <button className={"flex items-center gap-1.5 py-1 px-2"}>
                <div className={"flex items-center justify-center"}>
                    <img src={PlusIcon} alt="plus-icon" />
                </div>
                <span className={"font-medium text-sm"}>Create "{keyword}"</span>
            </button>
        </>
    );
};

export default MyLabelFooter;
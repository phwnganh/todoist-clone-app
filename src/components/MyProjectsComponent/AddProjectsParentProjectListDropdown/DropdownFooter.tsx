type DropdownFooterProps = {
    hasKeyword: boolean;
    keyword: string;
    showNotFound: boolean;
}
const DropdownFooter = ({hasKeyword, keyword, showNotFound}: DropdownFooterProps) => {

    if(!hasKeyword) return null;
    return (
        <>
            {showNotFound && <p className="text-sm text-product-library-display-secondary-idle-tint px-2.5">Project not found</p>}
            <button className="text-center text-product-library-actionable-tertiary-idle-tint font-medium text-sm py-1 px-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">Create "{keyword}"</button>
        </>
    );
};

export default DropdownFooter;
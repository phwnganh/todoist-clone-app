type ResettingFiltersButtonProps = {
    onReset: () => void;
}
const ResettingFiltersButton = ({onReset}: ResettingFiltersButtonProps) => {
    return (
        <div className={"py-1 px-1"}>
            <button onClick={onReset} type={"reset"} className={"flex justify-center items-center p-2.5 rounded-small hover:bg-product-library-selectable-secondary-hover-fill w-full"} tabIndex={-1}>
                <span className={"text-sm font-medium text-product-library-actionable-destructive-idle-tint"}>Reset all</span>
            </button>
        </div>

    );
};

export default ResettingFiltersButton;
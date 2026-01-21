const MyTaskSectionFooter = () => {
    return (
        <button type={"button"} className={"flex items-center gap-2.5 pt-4.5 text-sm font-bold text-product-library-display-accent-primary-tint"}>
            <div className={"h-px bg-product-library-actionable-destructive-idle-tint w-87.5"}></div>
            <p>Add section</p>
            <div className={"h-px bg-product-library-actionable-destructive-idle-tint w-87.5"}></div>
        </button>
    );
};

export default MyTaskSectionFooter;

const MyTaskSectionForm = () => {
    return (
        <form className={"flex flex-col gap-small"}>
            <input autoComplete={"off"} type={"text"} placeholder={"Name this section"} className={"font-bold text-sm text-product-library-display-secondary-idle-tint outline outline-product-library-border-focus-tint hover:outline-product-library-border-hover-tint py-1.5 px-2"}/>
            <div className={"flex items-center gap-small"}>
                <button type={"submit"} className={"px-small text-xs bg-product-library-actionable-primary-idle-tint hover:bg-product-library-actionable-primary-hover-fill text-white font-medium rounded-small"}>Add section</button>
                <button type={"button"} className={"px-small text-xs text-product-library-actionable-secondary-on-idle-tint rounded-small"}>Cancel</button>
            </div>
        </form>
    );
};

export default MyTaskSectionForm;
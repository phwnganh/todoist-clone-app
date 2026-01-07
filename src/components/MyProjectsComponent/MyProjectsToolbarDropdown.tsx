
const MyProjectsToolbarDropdown = () => {
    return (
        <div className="border border-product-library-divider-primary rounded-large shadow-sm mt-1 min-w-70 py-1.5 bg-white overflow-hidden">
            <div className="flex flex-col gap-1">
                <button className="text-sm text-start px-3 py-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">Add project above</button>
                <button className="text-sm text-start px-3 py-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">Add project below</button>
                <hr className="border-t border-t-product-library-divider-tertiary"/>
                <button className="text-sm text-start px-3 py-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">Edit</button>
                <button className="text-sm text-start px-3 py-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">Add to favorites</button>
                <button className="text-sm text-start px-3 py-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">Duplicate</button>
                <hr className="border-t border-t-product-library-divider-tertiary"/>
                <button className="text-sm text-start px-3 py-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">Share</button>
                <hr className="border-t border-t-product-library-divider-tertiary"/>
                <button className="text-sm text-start px-3 py-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">Email tasks to this project</button>
                <button className="text-sm text-start px-3 py-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">Project calendar feed</button>
                <hr className="border-t border-t-product-library-divider-tertiary"/>
                <button className="text-sm text-start px-3 py-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">Add extension...</button>
                <hr className="border-t border-t-product-library-divider-tertiary"/>
                <button className="text-sm text-start px-3 py-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">Activity log</button>
                <hr className="border-t border-t-product-library-divider-tertiary"/>
                <button className="text-sm text-start px-3 py-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">Archive</button>
                <button className="text-sm text-start px-3 py-1.5 text-product-library-display-accent-primary-tint hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">Delete</button>
            </div>
        </div>
    );
};

export default MyProjectsToolbarDropdown;
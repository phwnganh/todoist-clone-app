import HashtagIcon from "../icons/HashtagIcon.tsx";
import TemplateIcon from "../icons/TemplateIcon.tsx";

const MyProjectsDropdown = () => {
    return (
        <div className="overflow-hidden absolute inline-flex border border-product-library-divider-primary rounded-large shadow-sm right-0 mt-1 py-1.5 px-1.5 flex-col gap-1">
            <button className="flex items-center min-h-8 w-full hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
                <div className="flex justify-center items-center mr-2.5">
                    <HashtagIcon/>
                </div>
                <div className="text-sm font-regular text-product-library-display-primary-idle-tint whitespace-nowrap">Add projects</div>
            </button>

            <button className="flex items-center min-h-8 w-full hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
                <div className="flex justify-center items-center mr-2.5">
                    <TemplateIcon/>
                </div>
                <div className="text-sm font-regular text-product-library-display-primary-idle-tint whitespace-nowrap">Browse templates</div>
            </button>
        </div>
    );
};

export default MyProjectsDropdown;
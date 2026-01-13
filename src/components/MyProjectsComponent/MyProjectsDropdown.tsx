import HashtagIcon from "../../assets/hashtag-icon.svg";
import TemplateIcon from "../../assets/template-icon.svg";

const MyProjectsDropdown = ({onOpenAddProjectModal}: {onOpenAddProjectModal: () => void}) => {

  return (
    <>
      <div className="absolute border border-product-library-divider-primary rounded-large shadow-sm right-0 mt-1 p-1.5 min-w-55 flex flex-col gap-1 z-50">
        <button
          className="flex items-center min-h-8 w-full hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"
          onClick={onOpenAddProjectModal}
        >
          <div className="flex justify-center items-center mr-2.5 shrink-0">
            <img src={HashtagIcon} alt={"hashtag-icon"}/>
          </div>
          <div className="text-sm font-regular text-product-library-display-primary-idle-tint whitespace-nowrap">
            Add projects
          </div>
        </button>

        <button className="flex items-center min-h-8 w-full hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
          <div className="flex justify-center items-center mr-2.5 shrink-0">
            <img src={TemplateIcon} alt={"template-icon"}/>
          </div>
          <div className="text-sm font-regular text-product-library-display-primary-idle-tint whitespace-nowrap">
            Browse templates
          </div>
        </button>
      </div>

    </>
  );
};

export default MyProjectsDropdown;

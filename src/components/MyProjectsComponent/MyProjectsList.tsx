import MyProjectsItem from "./MyProjectsItem.tsx";

const MyProjectsList = () => {
  return (
    <>
      <div className="mt-medium flex flex-col gap-4">
        <div className="font-medium text-sm text-product-library-display-primary-idle-tint">
          2 projects
        </div>
        <hr className="border-t border-t-product-library-divider-tertiary" />
      </div>
      <button className="group pt-3 flex justify-between pr-3 py-3 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
        <MyProjectsItem />
      </button>
    </>
  );
};

export default MyProjectsList;

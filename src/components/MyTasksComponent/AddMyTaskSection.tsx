import SmallPlusAddIcon from '../icons/SmallPlusAddIcon.tsx'
const AddMyTaskSection = () => {
    return (
        <li className={"pr-5 pl-px"}>
            <button type={"button"} className={"px-2 mt-2 flex items-center w-full"}>
                <div className={"flex justify-center items-center rounded-full text-product-library-display-accent-primary-tint mr-3"}>
                    <SmallPlusAddIcon/>
                </div>
                <p className={"text-sm text-gray-500"}>Add task</p>
            </button>
        </li>
    );
};

export default AddMyTaskSection;
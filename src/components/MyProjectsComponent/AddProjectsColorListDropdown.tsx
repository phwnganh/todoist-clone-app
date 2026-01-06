import {colorData} from "../../data/colorData.ts";

const AddProjectsColorListDropdown = () => {
    return (
        <div className="absolute top-full z-1000 border border-product-library-divider-primary rounded-large shadow-sm overflow-y-auto scrollbar-thin scrollbar-custom max-h-70 w-full mt-1 bg-white p-1.5">
            {colorData.map(color => (
                <button className="flex flex-col py-1 px-1.5 flex-1 w-full hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small" key={color.id}>
                <span className="flex items-center gap-small">
                    <div className="w-4 h-4 flex justify-center items-center shrink-0"></div>
                        <div className="flex gap-1.5 overflow-hidden">
                            <div className="flex justify-center items-center">
                                <div className={`rounded-xl w-3 h-3 ${color.hexadecimal}`}></div>
                            </div>
                            <div className="text-sm">{color.label}</div>
                        </div>

                </span>
                </button>

            ))}

        </div>
    );
};

export default AddProjectsColorListDropdown;
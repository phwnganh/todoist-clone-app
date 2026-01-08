import {MY_PROJECTS_MENU_TOOLBAR} from "../../data/menuNavData.ts";
import MyProjectsMenuButton from "../ui/MyProjectsMenuButton.tsx";

const MyProjectsToolbarDropdown = () => {
    return (
        <div className="border border-product-library-divider-primary rounded-large shadow-sm mt-1 min-w-70 py-1.5 bg-white overflow-hidden">
            <div className="flex flex-col gap-1">
                {MY_PROJECTS_MENU_TOOLBAR.map((item, index) => {
                    if(item === "divider"){
                        return (
                            <hr className="border-t border-t-product-library-divider-tertiary"/>
                        )
                    }

                    if(typeof item === "string"){
                        return <MyProjectsMenuButton key={index} label={item}/>
                    }
                    return (
                        <MyProjectsMenuButton key={item.label} label={item.label} danger={item.danger}/>
                    )
                })}
            </div>
        </div>
    );
};

export default MyProjectsToolbarDropdown;
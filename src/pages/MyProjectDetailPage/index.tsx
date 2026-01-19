import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import HeaderLayout from "../../layouts/HeaderLayout.tsx";
import UserAdded from '../../assets/user-added-icon.svg'
import SmallListIcon from '../../assets/small-list-icon.svg'
import CommentIcon from '../../assets/comment-icon.svg'
import ThreeDotsIcon from '../../assets/three-dots-icon.svg'
import type {HeaderLayoutType} from "../../types/headerLayout.type.ts";
import {PROJECTS} from "../../constants/routes.constants.ts";
import MyTasksList from "../../components/MyTasksComponent/MyTasksList.tsx";
import MyTaskTitle from "../../components/MyTasksComponent/MyTaskTitle.tsx";
import LoadingSpin from "../../components/ui/LoadingSpin.tsx";
import {useEffect, useState} from "react";
import MyTaskLayoutFiltersDropdown from "../../components/MyTasksComponent/MyTaskLayoutFiltersDropdown";
import MyTasksBoard from "../../components/MyTasksComponent/MyTasksBoard";
import {useProjectStore} from "../../stores/project.store.ts";

const MyProjectDetailPage = () => {
    const {projectId} = useParams<{projectId: string}>();
    const setProjectId = useProjectStore(state => state.setProjectId);

    useEffect(() => {
        if(projectId){
            setProjectId(projectId);
        }
    }, [projectId, setProjectId]);
    const [openLayoutDropdown, setOpenLayoutDropdown] = useState(false);
    const [layoutName, setLayoutName] = useState("list");
    const handleOpenLayoutDropdown = () => {
        setOpenLayoutDropdown(prev => !prev);
    }


    const handleSelectLayout = (layoutName: string) => {
            setLayoutName(layoutName);
    }
    const {showCollapse, onToggleSidebar} = useOutletContext<HeaderLayoutType>()
    const navigate = useNavigate()

    if(!projectId){
        return <LoadingSpin/>
    }

    return (
        <>
            <HeaderLayout showCollapse={showCollapse} onToggleSidebar={onToggleSidebar} right={
                <div className={"flex justify-end items-center"}>
                    <button type={"button"} className="flex items-center justify-center p-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
                        <div className={"mr-1.5"}>
                            <img src={UserAdded} alt={"user-added-icon"}/>
                        </div>
                        <span className="text-product-library-actionable-quaternary-idle-tint text-sm font-medium">Share</span>
                    </button>
                        <div className={"relative p-2.5"}>
                        <button type={"button"} className={"flex items-center px-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"} onClick={handleOpenLayoutDropdown}>
                            <div className={"flex items-center justify-center w-8 h-8"}>
                                <img src={SmallListIcon} alt={"small-list-icon"}/>
                            </div>
                            <span className="text-product-library-actionable-quaternary-idle-tint text-sm font-medium">Display</span>

                        </button>
                        {openLayoutDropdown && (<MyTaskLayoutFiltersDropdown onSelectLayout={handleSelectLayout} layoutTitle={layoutName}/>)}
                        </div>
                    <button type={"button"} className={"flex items-center justify-center w-8 h-8 p-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"}>
                        <img src={CommentIcon} alt={"comment-icon"}/>
                    </button>
                    <button type={"button"} className={"flex items-center justify-center w-8 h-8 p-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"}>
                        <img src={ThreeDotsIcon} alt={"three-dots-icon"}/>
                    </button>
                </div>
            } left={<div className={"flex items-center mr-auto"}>
                <button className={"px-1 text-product-library-actionable-quaternary-idle-tint text-sm font-medium hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small p-1.5"} onClick={() => navigate(PROJECTS)}>My Projects</button>
                <div className={"text-sm text-product-library-display-secondary-idle-tint"}>/</div>
            </div>}></HeaderLayout>
            <section className={"max-w-200 mx-auto w-full relative z-10"}>
                <div className={"flex flex-col gap-small"}>
                    <MyTaskTitle/>
                    {layoutName === "list" ? (
                        <MyTasksList/>
                    ) : (<MyTasksBoard/>)}
                </div>
            </section>
        </>
    );
};

export default MyProjectDetailPage;
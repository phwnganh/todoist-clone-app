import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import HeaderLayout from "../../layouts/HeaderLayout.tsx";
import UserAdded from '../../assets/user-added-icon.svg'
import SmallListIcon from '../../assets/small-list-icon.svg'
import CommentIcon from '../../assets/comment-icon.svg'
import ThreeDotsIcon from '../../assets/three-dots-icon.svg'
import type {HeaderLayoutType} from "../../types/headerLayout.type.ts";
import {PROJECTS} from "../../constants/routes.constants.ts";
import {useGetAProject} from "../../hooks/useProjects.ts";

const MyProjectDetailPage = () => {
    const {projectId} = useParams();

    const {showCollapse, onToggleSidebar} = useOutletContext<HeaderLayoutType>()
    const navigate = useNavigate()

    const {data: projectDetail, isLoading} = useGetAProject(projectId)

    return (
        <>
            <HeaderLayout showCollapse={showCollapse} onToggleSidebar={onToggleSidebar} right={
                <div className={"flex justify-end items-center"}>
                    <button className="flex items-center justify-center p-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
                        <div className={"mr-1.5"}>
                            <img src={UserAdded} alt={"user-added-icon"}/>
                        </div>
                        <span className="text-product-library-actionable-quaternary-idle-tint text-sm font-medium">Share</span>
                    </button>
                    <button className={"flex items-center justify-center w-8 h-8 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"}>
                        <img src={SmallListIcon} alt={"small-list-icon"}/>
                    </button>
                    <button className={"flex items-center justify-center w-8 h-8 p-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"}>
                        <img src={CommentIcon} alt={"comment-icon"}/>
                    </button>
                    <button className={"flex items-center justify-center w-8 h-8 p-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small"}>
                        <img src={ThreeDotsIcon} alt={"three-dots-icon"}/>
                    </button>
                </div>
            } left={<div className={"flex items-center mr-auto"}>
                <button className={"px-1 text-product-library-actionable-quaternary-idle-tint text-sm font-medium hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small p-1.5"} onClick={() => navigate(PROJECTS)}>My Projects</button>
                <div className={"text-sm text-product-library-display-secondary-idle-tint"}>/</div>
            </div>}></HeaderLayout>
        </>
    );
};

export default MyProjectDetailPage;
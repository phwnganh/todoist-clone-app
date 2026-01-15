import {useGetAProject} from "../../hooks/useProjects.ts";
import LoadingSpin from "../ui/LoadingSpin.tsx";
import {useEffect, useRef, useState} from "react";

const MyTaskTitle = ({projectId}: {projectId: string}) => {
    const {data: projectDetail, isLoading} = useGetAProject(projectId)
    const [isEditing, setEditing] = useState(false)
    const [title, setTitle] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const commonClass = `w-full p-1 font-strong text-product-library-display-primary-idle-tint text-header-large flex rounded-small
  min-h-[40px]`
    useEffect(() => {
        if(projectDetail?.name){
            setTitle(projectDetail.name);
        }
    }, [projectDetail]);

    useEffect(() => {
        if(isEditing){
            textareaRef.current?.focus()
        }
    }, [isEditing])

    const handleBlurTitle = () => {
        if(!title.trim()){
            setTitle(projectDetail?.name ?? "")
        }
        setEditing(false)
    }

    if (isLoading) {
        return (
            <div className={"mt-medium"}>
                <LoadingSpin />
            </div>
        );
    }

    return (
        <div className={"relative min-h-12"} >
            <h1 className={`absolute inset-0 hover:outline hover:outline-product-library-border-hover-tint ${commonClass} ${!isEditing ? "opacity-100" : "opacity-0"}`} onClick={() => setEditing(true)}>{title}</h1>
            <textarea ref={textareaRef} className={`absolute inset-0 ${commonClass} resize-none outline-product-library-border-focus-tint
    border-none bg-transparent ${isEditing ? "opacity-100" : "opacity-0 pointer-events-none"}`} spellCheck={false} value={title} maxLength={120} onChange={e => setTitle(e.target.value)} onBlur={handleBlurTitle}></textarea>
        </div>

    );
};

export default MyTaskTitle;
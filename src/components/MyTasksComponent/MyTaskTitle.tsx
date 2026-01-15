import {useGetAProject} from "../../hooks/useProjects.ts";
import LoadingSpin from "../ui/LoadingSpin.tsx";
import {useEffect, useRef, useState} from "react";

const MyTaskTitle = ({projectId}: {projectId: string}) => {
    const {data: projectDetail, isLoading} = useGetAProject(projectId)
    const [isEditing, setEditing] = useState(false)
    const [title, setTitle] = useState(projectDetail?.name ?? "")
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if(isEditing){
            textareaRef.current?.focus()
            textareaRef.current?.select()
        }
    }, [isEditing])
    if (isLoading) {
        return (
            <div className={"mt-medium"}>
                <LoadingSpin />
            </div>
        );
    }
    return (
        <div className={"w-full"}>
            {!isEditing && (            <h1 className={"p-1 font-strong text-product-library-display-primary-idle-tint text-header-large"} onClick={() => setEditing(true)}>{title}</h1>
            )}

            {isEditing && (
                <textarea ref={textareaRef} aria-label={"edit title"} maxLength={120} spellCheck={false} value={title} onChange={e => setTitle(e.target.value)} onBlur={() => setEditing(false)} onKeyDown={e => {
                    if(e.key === "Enter" && !e.shiftKey){
                        e.preventDefault()
                        setEditing(false)
                    }
                    if(e.key === "Escape"){
                        setEditing(false)
                    }
                }} className="w-full p-1 font-strong text-header-large resize-none border border-neutral-300 rounded-small focus:outline-none focus:ring-2 focus:ring-neutral-500"
                          rows={1}/>
            )}
        </div>

    );
};

export default MyTaskTitle;
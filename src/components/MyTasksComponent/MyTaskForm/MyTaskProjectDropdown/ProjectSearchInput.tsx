import {type RefObject} from 'react';

type ProjectSearchInputProps = {
    projectValue: string;
    onProjectsSearched: (value: string) => void;
    inputRef: RefObject<HTMLInputElement | null>;
}
const ProjectSearchInput = ({projectValue, onProjectsSearched, inputRef}: ProjectSearchInputProps) => {
    return (
        <div className={"p-2"}>
            <input ref={inputRef} type={"text"} placeholder={"Type a project name"} className={"text-sm border border-product-library-border-idle-tint rounded-small w-full py-1.5 px-2 outline-none focus:outline-none"}
            onChange={e => onProjectsSearched(e.target.value)}
            value={projectValue}/>
        </div>
    );
};

export default ProjectSearchInput;
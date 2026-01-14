import MyProjectForm, {type MyProjectFormValues} from "../MyProjectForm";
import {type FormEvent, useEffect, useState} from "react";
import {useGetAProject} from "../../../hooks/useProjects";
import {getValuesByMappingDataType} from "../../../helpers/updateMyProjectField";
import LoadingSpin from "../../ui/LoadingSpin";
const EditProjectModalDialog = ({ onClose, projectId }: { onClose: () => void, projectId: string }) => {
    const {data: projectDetail, isLoading} = useGetAProject(projectId)
    const [values, setValues] = useState<MyProjectFormValues>({
        name: "",
        color: null,
        parentProject: null,
        layout: "list"
    });

    useEffect(() => {
        if(!projectDetail) return;
            setValues(getValuesByMappingDataType(projectDetail));

    }, [projectDetail]);
    const handleEditMyProject = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
    }

    if(isLoading){
        return (<div className={"mt-medium"}>
            <LoadingSpin/>
        </div>)
    }
    return (
        <MyProjectForm title={"Edit"} onClose={onClose} onSubmit={handleEditMyProject}
                       submitLabel={"Save"}
                       submittingLabel={"Saving..."}
                       values={values}
                       onChange={setValues}
        />
    );
};

export default EditProjectModalDialog;
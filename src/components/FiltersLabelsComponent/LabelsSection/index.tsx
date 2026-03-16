import LabelsHeaderSection from "@/components/FiltersLabelsComponent/LabelsSection/LabelsHeaderSection.tsx";
import {useExpanded} from "@/hooks/useExpanded.ts";
import {useGetAllLabels} from "@/hooks/useQueryHook/useLabels.ts";
import LabelsItem from "@/components/FiltersLabelsComponent/LabelsSection/LabelsItem.tsx";
import LoadingSpin from "@/components/ui/LoadingSpin.tsx";

const LabelsSection = () => {
    const {isExpanded, handleExpanded} = useExpanded()
    const {data: labels, isLoading} = useGetAllLabels()
    if(isLoading){
        return <LoadingSpin/>
    }
    return (
        <div>
            <LabelsHeaderSection isExpanded={isExpanded} onExpanded={handleExpanded}/>
            {isExpanded && (
                <ul className={"mt-1.25 flex flex-col flex-wrap"}>
                    {labels?.results.map(label => (
                        <LabelsItem key={label.id} label={label}/>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LabelsSection;
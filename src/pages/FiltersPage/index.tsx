import HeaderLayout from "@/layouts/HeaderLayout.tsx";
import {useOutletContext} from "react-router-dom";
import type {HeaderLayoutType} from "@/types/headerLayout.type.ts";
import LabelsSection from "@/components/FiltersLabelsComponent/LabelsSection";

const FiltersPage = () => {
    const {showCollapse, onToggleSidebar} = useOutletContext<HeaderLayoutType>()
    return (
        <>
            <HeaderLayout showCollapse={showCollapse} onToggleSidebar={onToggleSidebar} right={<div className={"h-13.75"}></div>}/>
            <section className={"max-w-200 mx-auto w-full"}>
                   <div className={"flex flex-col gap-small"}>
                       <h1 className={"p-1 font-strong text-product-library-display-primary-idle-tint text-header-large"}>Filters & Labels</h1>
                        <LabelsSection/>
                   </div>
            </section>
        </>
    );
};

export default FiltersPage;
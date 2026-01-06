import HashtagIcon from "../icons/HashtagIcon.tsx";
import IndicatorDots from "../ui/IndicatorDots.tsx";

const MyProjectsItem = () => {
    return (
        <>
            <div className="flex items-center">
                <div className="mr-small flex justify-center items-center">
                    <HashtagIcon/>
                </div>
                <div className="text-sm font-regular whitespace-nowrap">Getting Started</div>
            </div>
            <div role="button" className="group-hover:flex items-center hidden gap-1">
                <IndicatorDots/>
            </div>
        </>
    );
};

export default MyProjectsItem;